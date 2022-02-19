module.exports.index = async (req, res) => {
    res.render('beranda/home', {
        user: req.user
    })
}