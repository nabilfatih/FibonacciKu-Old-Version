const ExpressError = require('./utils/ExpressError');
const User = require('./models/user');
const util = require('util');
const { cloudinary } = require('./cloudinary');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Kamu harus masuk dulu!');
        return res.redirect('/masuk');
    }
    next();
}

module.exports.isLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        // req.flash('error', 'You must be signed out first!');
        return res.redirect('/beranda');
    }
    next();
}

module.exports.isNotVerified = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user.isVerified) {
            return next();
        }
        req.flash('error', 'Akun kamu belum diverifikasi, tolong cek inbox dan spam email kamu');
        return res.redirect('/');
    } catch(e){
        // console.log(req.body)
        // req.flash('error', 'Muncul error! tolong kontak kita FibonacciKu untuk bantuan');
        // res.redirect('/')
        return next();
    }
}

module.exports.isValidPassword = async (req, res, next) => {
    const users = await User.findOne({ username: req.user.username })
    const { user } = await User.authenticate()(req.user.username, req.body.currentPassword);

    if(users.isPassword) {
        if(user) {
            res.locals.user = user;
            return next();
        }
        else if(!user) {
            req.flash('error', 'Password lama salah!')
            return res.redirect('/pengaturan/password')
        }
    }
    else {
        if(!req.body.currentPassword) {
            if(users) {
                res.locals.user = users;
                return next();
            }
            else {
                req.flash('error', 'Gagal ganti password!');
                return res.redirect('/pengaturan/password');
            }
        }
    }
}

module.exports.changePassword = async (req, res, next) => {
    const {
        newPassword,
        passwordConfirmation
    } = req.body;

    if (newPassword && passwordConfirmation) {
        const { user } = res.locals;
        if (newPassword === passwordConfirmation) {
            await user.setPassword(newPassword);
            user.isPassword = true;
            await user.save();
            const login = util.promisify(req.login.bind(req));
            await login(user)
        }
        else {
            req.flash('error', 'Password baru harus sama!');
            return res.redirect('/pengaturan/password');
        }
    }
    else {
        req.flash('Gagal ganti password!')
        return res.redirect('/pengaturan/password')
    }
    req.flash('success', 'Password sudah dirubah!');
    return res.redirect('/pengaturan/password')
}

module.exports.deleteProfileImage = async (req, res) => {
    if (req.file) await cloudinary.uploader.destroy(req.file.public_id);
}