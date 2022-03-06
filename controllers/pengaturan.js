const User = require('../models/user');
const util = require('util');

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
    const { nama, username, email, bio, instagram, github, twitter } = req.body
    const existingUser = await User.findOne({ username: username })
    if(!nama) {
        req.flash('error', 'Masukkan Nama Kamu!')
        return res.redirect('/pengaturan/akun')
    }
    if (!username) {
        req.flash('error', 'Masukkan Username Kamu!')
        return res.redirect('/pengaturan/akun')
    }
    try {
        if (nama) user.nama = nama;
        if (username) user.username = username;
        if(email.match(emailformat) || (!email)) user.email = email;
        user.bio = bio;
        user.link.instagram = instagram;
        user.link.github = github;
        user.link.twitter = twitter;
        await user.save();
    } catch(e) {
        req.flash('error', 'Username atau email sudah ada yang punya!')
        return res.redirect('/pengaturan/akun')
    }
    const login = util.promisify(req.login.bind(req));
    await login(user);

    
    req.flash('success', 'Profil Sudah Dirubah!')
    res.redirect('/pengaturan/akun')
}