// const User = require('../models/user');
const util = require('util');
const user = require('../models/user');

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
    const { username, email } = req.body
    if (username) user.username = username;
    if (email) user.email = email;
    await user.save();
    const login = util.promisify(req.login.bind(req));
    await login(user);
    req.flash('success', 'Profil Sudah Dirubah!')
    res.redirect(`/fibo/${user.username}`)
}