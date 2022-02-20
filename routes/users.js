const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { isLoggedOut } = require('../middleware');

router.get('/daftar', isLoggedOut, (req, res) => {
    res.render('registration/daftar', {
        user: req.user
    });
});

router.post('/daftar', catchAsync(async(req, res) => {
    try {
        const { email, nama, username, password } = req.body;
        const user = new User({ email, nama, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('succes', 'Welcome to FibonacciKu');
            res.redirect('/beranda', {
                user: req.user
            });
        })
    } catch(e) {
        req.flash('error', 'A user with the given email or username is already registered');
        res.redirect('daftar', {
            user: req.user
        });
    }
}));

router.get('/masuk', isLoggedOut, (req, res) => {
    res.render('registration/masuk', {
        user: req.user
    });
});

router.post('/masuk', passport.authenticate('local', { failureFlash: 'Password or username is incorrect', failureRedirect: '/masuk'}), (req, res) => {
    req.flash('success', 'Welcome to FibonacciKu!');
    const redirectUrl = req.session.returnTo || '/beranda';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

router.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureFlash: 'Gagal masuk dengan Google', 
    failureRedirect: '/daftar',
    }),
    (req, res) => {
    req.flash('success', 'Welcome to FibonacciKu!');
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
    req.flash('success', 'Welcome to FibonacciKu!');
    const redirectUrl = req.session.returnTo || '/beranda';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});


router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['profile']
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureFlash: 'Gagal masuk dengan Facebook', 
    failureRedirect: '/daftar',
    }),
    (req, res) => {
    req.flash('success', 'Welcome to FibonacciKu!');
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