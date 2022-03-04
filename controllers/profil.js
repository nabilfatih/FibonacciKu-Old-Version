const User = require('../models/user');

module.exports.profil = async (req, res) => {
    const username = await User.findOne({ username: req.params.username })
    res.render('profil/profil', {
        username,
        user: req.user
    });
}

module.exports.index = async (req, res) => {
    const username = req.user.username
    res.redirect(`/profil/${username}`);
};