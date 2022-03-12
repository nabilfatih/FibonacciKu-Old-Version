const User = require('../models/user');
const util = require('util');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const crypto = require('crypto');

module.exports.getForgotPw = async(req, res, next) => {
    res.render('registration/forgot')
};

module.exports.putForgotPw = async(req, res, next) => {
    const token = await crypto.randomBytes(20).toString('hex');
    const { email } = req.body;
    const user = await User.findOne({ email })
    if(!user) {
        req.flash('error', 'Email tidak ditemukan');
        // req.session.error = 'Email tidak ditemukan';
        return res.redirect('/lupa-password');
    }
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 1800000;
    await user.save();

    const msg = {
        from: 'FibonacciKu <reset-password@fibonacciku.com>',
        to: email,
        subject: 'FibonacciKu - Reset Password',
        text: `
            Hai sobat Fibo!
            Kamu mendapatkan email ini karena kamu (atau orang lain) ingin mereset/merubah password kamu.
            Tolong klik link di bawah atau copy paste di browser kamu untuk mereset password:
            https://www.fibonacciku.com/reset/${token}
            Jika kamu permintaan reset password bukan dari kamu, tolong abaikan email ini dan password kamu tidak akan berubah.
        `.replace(/            /g, ''),
        html: `
            <h1>Hai sobat Fibo!</h1>
            <p>Kamu mendapatkan email ini karena kamu (atau orang lain) ingin mereset/merubah password kamu.</p>
            <p>Tolong klik link di bawah atau copy paste di browser kamu untuk mereset password:</p>
            <a href="https://www.fibonacciku.com/reset/${token}">Reset Password</a>
            <p>Jika kamu permintaan reset password bukan dari kamu, tolong abaikan email ini dan password kamu tidak akan berubah.</p>
            <p>Terima Kasih, </p>
            <p>FibonacciKu</p>
        `
    }
    await sgMail.send(msg);
    req.flash('success', `Email sudah dikirim ke ${email}`);
    // req.session.success = `Email sudah dikirim ke ${email}`;
    res.redirect('/lupa-password');
};

module.exports.getReset = async(req, res, next) => {
    const { token } = req.params;
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });
    if(!user){
        req.flash('error', 'Token reset password tidak valid atau sudah expire');
        // req.session.error = 'Token reset password tidak valid atau sudah expire';
        res.redirect('/lupa-password');
    };
    res.render('registration/reset', { token });
};

module.exports.putReset = async(req, res, next) => {
    const { token } = req.params;
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });
    if(!user){
        req.flash('error', 'Token reset password tidak valid atau sudah tidak berlaku');
        // req.session.error = 'Token reset password tidak valid atau sudah tidak berlaku';
        res.redirect('/lupa-password');
    };
    if(req.body.password === req.body.confirm){
        await user.setPassword(req.body.password);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        user.isPassword = true;
        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
    } else {
        req.flash('error', 'Password tidak cocok');
        // req.session.error = 'Password tidak cocok';
        return res.redirect(`/reset/${token}`);
    }

    const msg = {
        from: 'FibonacciKu <reset-password@fibonacciku.com>',
        to: user.email,
        subject: 'FibonacciKu - Password Berubah',
        text: `
            Hai sobat Fibo!
            Email ini utuk menkonfirmasi bahwa password akun kamu sudah berubah.
            Jika kamu tidak merubah password kamu, tolong kontak kita dengan fitur kontak di FibonacciKu.
        `.replace(/            /g, ''),
        html: `
            <h1>Hai sobat Fibo!</h1>
            <p>Email ini utuk menkonfirmasi bahwa password akun kamu sudah berubah.</p>
            <p>Jika kamu tidak merubah password kamu, tolong kontak kita dengan fitur kontak di FibonacciKu.</p>
            <p>Terima Kasih, </p>
            <p>FibonacciKu</p>
        `
    };
    await sgMail.send(msg);
    // req.session.success = 'Password sudah dirubah!';
    req.flash('success', 'Password sudah dirubah!');
    res.redirect('/beranda')
};