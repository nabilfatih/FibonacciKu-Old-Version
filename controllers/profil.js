const User = require('../models/user');
const ExpressError = require('../utils/ExpressError');
const util = require('util');
const { cloudinary } = require('../cloudinary');

module.exports.profil = async (req, res, next) => {
    const username = await User.findOne({ username: req.params.username })
    if(!username){
        next(new ExpressError('Profil Tidak Ditemukan :(', 404))
    }
    res.render('profil/profil', {
        username,
        user: req.user
    });
}

module.exports.index = async (req, res) => {
    const username = req.user.username
    res.redirect(`/fibo/${username}`);
};

module.exports.gantiFoto = async (req, res) => {
    const user = req.user
    if (req.file) {
        if (user.avatar.public_id) await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        const { secure_url, public_id } = req.file;
        user.avatar = { secure_url, public_id };
    }
    await user.save();
    const login = util.promisify(req.login.bind(req));
    await login(user);
    req.flash('success', 'Foto profil sudah diganti!')
    return res.redirect(`/fibo/${user.username}`)
}