const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const route = require('color-convert/route');
const { isLoggedIn } = require('../middleware');
const Pelajaran = require('../models/pelajaran');

router.get('/', isLoggedIn, async (req, res) => {
    const MTK = await Pelajaran.find({query: "matematika"});
    const Fisika = await Pelajaran.find({query: "fisika"});
    const Informatika = await Pelajaran.find({query: "informatika"});
    const Biologi = await Pelajaran.find({query: "biologi"});
    const Kimia = await Pelajaran.find({query: "kimia"});
    const Astronomi = await Pelajaran.find({query: "astronomi"});
    const UTBK = await Pelajaran.find({query: "utbk-sbmptn"});
    const ANP = await Pelajaran.find({query: "aufnahmeprüfung"});
    res.render('pelajaran/index', {
        MTK,
        Fisika,
        Informatika,
        Biologi,
        Kimia,
        Astronomi,
        UTBK,
        ANP
    });
});

router.get('/:pelajaran', isLoggedIn, async(req, res) => {
    res.render('pelajaran/show');
})

module.exports = router;