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
    const { nama, username, email, bio, instagram, github, twitter } = req.body
    if (nama) user.nama = nama;
    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (instagram) user.link.instagram = instagram;
    if (github) user.link.github = github;
    if (twitter) user.link.twitter = twitter;
    await user.save();
    const login = util.promisify(req.login.bind(req));
    await login(user);
    req.flash('success', 'Profil Sudah Dirubah!')
    res.redirect('/pengaturan/akun')
}