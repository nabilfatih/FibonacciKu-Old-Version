module.exports.kebijakan = async (req, res) => {
    res.render('kebijakan/kebijakan', {
        user: req.user
    })
}