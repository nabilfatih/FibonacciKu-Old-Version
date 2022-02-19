module.exports.tentang = async (req, res) => {
    res.render('tentang/tentang', {
        user: req.user
    });
}