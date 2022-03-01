const User = require('../models/user');

module.exports.profil = async (req, res) => {
    res.render('profil/profil', {
        user: req.user
    });
}

module.exports.index = async (req, res) => {
    const username = req.user.username
    res.redirect(`/profil/${username}`);
};