const ExpressError = require('./utils/ExpressError');
const User = require('./models/user');

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

module.exports.isNotVerified = async (req, res, next) =>{
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