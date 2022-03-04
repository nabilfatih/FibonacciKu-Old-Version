const User = require('../models/user');
const ExpressError = require('../utils/ExpressError');

module.exports.profil = async (req, res, next) => {
    const username = await User.findOne({ username: req.params.username })
    if(!username){
        next(new ExpressError('Profil tidak ditemukan :(', 404))
    }
    res.render('profil/profil', {
        username,
        user: req.user
    });
}

module.exports.index = async (req, res) => {
    const username = req.user.username
    res.redirect(`/profil/${username}`);
};