module.exports.pengaturan = async (req, res) => {
    res.render('profil/pengaturan', {
        user: req.user
    });
}