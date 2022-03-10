const User = require('../models/user');
const util = require('util');
const { cloudinary } = require('../cloudinary');
const { deleteProfileImage } = require('../middleware');

module.exports.akun = async (req, res) => {
    res.render('profil/akun', {
        user: req.user
    });
}

module.exports.password = async (req, res) => {
    res.render('profil/password', {
        user: req.user
    });
}

module.exports.updateProfile = async (req, res) => {
    const user = req.user
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const letterformat = /[a-zA-Z]/;
    const { nama, username, email, bio, web, instagram, github, twitter } = req.body
    if(!nama) {
        req.flash('error', 'Masukkan nama kamu!')
        return res.redirect('/pengaturan/akun')
    }
    if (!username) {
        req.flash('error', 'Masukkan username kamu!')
        return res.redirect('/pengaturan/akun')
    }
    if (!email) {
        req.flash('error', 'Masukkan email kamu!')
        return res.redirect('/pengaturan/akun')
    }
    try {
        if (nama.match(letterformat)) user.nama = nama;
        if (username) user.username = username;
        if (email.match(emailformat)) user.email = email;
        user.bio = bio;
        user.website = web;
        user.instagram = instagram;
        user.github = github;
        user.twitter = twitter;
        await user.save();
    } catch(e) {
        if(e.toString().includes('username')) {
            req.flash('error', 'Username sudah ada yang punya!')
        }
        if(e.toString().includes('email')) {
            req.flash('error', 'Email sudah ada yang punya!')
        }
        return res.redirect('/pengaturan/akun')
    }
    const login = util.promisify(req.login.bind(req));
    await login(user);
    req.flash('success', 'Profil Sudah Dirubah!')
    res.redirect('/pengaturan/akun')
}