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