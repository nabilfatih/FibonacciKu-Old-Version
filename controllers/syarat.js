module.exports.syarat = async (req, res) => {
    res.render('syarat/syarat', {
        user: req.user
    })
}