const User = require('../models/user');

module.exports.profil = async (req, res) => {
    res.render('profil/profil', {
        user: req.user
    });
}