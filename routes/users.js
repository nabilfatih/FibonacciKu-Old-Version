const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Users = require('../controllers/users');
const { isLoggedOut, isNotVerified } = require('../middleware');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const crypto = require('crypto');

router.get('/daftar', isLoggedOut, (req, res) => {
    res.render('registration/daftar', {
        user: req.user
    });
});

router.post('/daftar', catchAsync(async(req, res) => {
    const newUser = new User({
        email: req.body.email,
        nama: req.body.nama,
        username: req.body.username.toLowerCase(),
        emailToken: crypto.randomBytes(64).toString('hex'),
        isVerified: false,
        isPassword: true,
    });

    User.register(newUser, req.body.password, async(err, user) => {
        if(err) {
            req.flash('error', 'Email atau username sudah ada yang punya!');
            return res.redirect('/daftar');
        }
        const msg = {
            from: 'FibonacciKu <no-reply@fibonacciku.com>',
            to: user.email,
            subject: 'FibonacciKu - Verifikasi Email',
            text: `
                Hai sobat Fibo! Terima kasih sudah mendaftar di FibonacciKu.
                Tolong copy dan paste link di bawah ini untuk verifikasi akun kamu.
                https://www.fibonacciku.com/verify-email?token=${user.emailToken}
                `.replace(/                /g, ''),
            html: `
                <h1>Hai sobat Fibo!</h1>
                <p>Terima kasih sudah mendaftar di FibonacciKu.</p>
                <p>Tolong menklik link di bawah ini untuk verifikasi akun kamu.</p>
                <a href="https://www.fibonacciku.com/verify-email?token=${user.emailToken}">Verifikasi Akun</a>
                <p>Email verifikasi ini hanya dikirim 1 kali, jangan sampai hilang email ini. Jika hilang, maka kalian harus menunggu selama 3 hari untuk membuat ulang akun FibonacciKu dengan email yang sama.</p>
                <p>Terima Kasih, </p>
                <p>FibonacciKu</p>
                `
        }
        try {
            await sgMail.send(msg);
            req.flash('success', 'Terima kasih sudah mendaftar di FibonacciKu, tolong cek inbox dan spam email kamu untuk verifikasi');
            res.redirect('/');
        } catch(e) {
            req.flash('error', 'Muncul error! tolong hubungi kita dengan fitur kontak FibonacciKu');
            res.redirect('/');
        }
    });
}));

router.get('/verify-email', catchAsync(async(req, res) => {
    try {
        const user = await User.findOne({ emailToken: req.query.token });
        if(!user) {
            req.flash('error', 'Token tidak valid! tolong kontak FibonacciKu untuk bantuan')
            res.redirect('/');
        }
        user.emailToken = null,
        user.isVerified = true,
        await user.save();
        await req.login(user, async(err) => {
            if(err) return next(err);
            req.flash('success', `Welcome to FibonacciKu, ${user.nama}!`);
            const redirectUrl = req.session.returnTo || '/beranda';
            delete req.session.returnTo;
            res.redirect(redirectUrl);
        })
    } catch(e) {
        req.flash('error', 'Muncul error! Tolong kontak kita untuk bantuan');
        res.redirect('/');
    }
}));

router.get('/masuk', isLoggedOut, (req, res) => {
    res.render('registration/masuk', {
        user: req.user
    });
});

router.post('/masuk', isNotVerified, passport.authenticate('local', {
    failureFlash: 'Username atau password salah!',
    failureRedirect: '/masuk'
    }),
    (req, res) => {
        req.flash('success', 'Welcome to FibonacciKu!');
        const redirectUrl = req.session.returnTo || '/beranda';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
});

router.get('/auth/google', passport.authenticate('google', {
    scope: [
        'email',
        'profile'
    ]
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureFlash: 'Gagal masuk dengan Google', 
    failureRedirect: '/daftar',
    }),
    (req, res) => {
        req.flash('success', `Welcome to FibonacciKu, ${req.user.nama}!`);
        const redirectUrl = req.session.returnTo || '/beranda';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
});

router.get('/auth/github', passport.authenticate('github', { 
    scope: [ 'user:email' ],
}));

router.get('/auth/github/callback', passport.authenticate('github', {
    failureFlash: 'Gagal masuk dengan GitHub', 
    failureRedirect: '/daftar',
    }),
    (req, res) => {
        req.flash('success', `Welcome to FibonacciKu, ${req.user.nama}!`);
        const redirectUrl = req.session.returnTo || '/beranda';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
});


router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureFlash: 'Gagal masuk dengan Facebook', 
    failureRedirect: '/daftar',
    }),
    (req, res) => {
        req.flash('success', `Welcome to FibonacciKu, ${req.user.nama}!`);
        const redirectUrl = req.session.returnTo || '/beranda';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
});

router.get('/lupa-password', isLoggedOut, catchAsync(Users.getForgotPw));

router.put('/lupa-password', isLoggedOut, catchAsync(Users.putForgotPw));

router.get('/reset/:token', isLoggedOut, catchAsync(Users.getReset));

router.put('/reset/:token', isLoggedOut, catchAsync(Users.putReset));

router.get('/keluar', (req, res) => {
    req.logout();
    req.flash('success', "Sampai Jumpa lagi Sobat Fibo!");
    res.redirect('/masuk');
});

module.exports = router;