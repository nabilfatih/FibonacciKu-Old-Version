const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const route = require('color-convert/route');
const { isLoggedOut } = require('../middleware');

router.get('/daftar', isLoggedOut, (req, res) => {
    res.render('registration/daftar');
});

router.post('/daftar', catchAsync(async(req, res) => {
    try {
        const { email, nama, username, password } = req.body;
        const user = new User({ email, nama, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('succes', 'Welcome to FibonacciKu');
            res.redirect('/beranda');
        })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('daftar');
    }
}));

router.get('/masuk', isLoggedOut, (req, res) => {
    res.render('registration/masuk');
});

router.post('/masuk', passport.authenticate('local', { failureFlash: true, failureRedirect: '/masuk'}), (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/beranda';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

router.get('/keluar', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/');
});

module.exports = router;