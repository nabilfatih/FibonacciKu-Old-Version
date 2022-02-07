const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/masuk');
    }
    next();
}

module.exports.isLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed out first!');
        return res.redirect('/beranda');
    }
    next();
}