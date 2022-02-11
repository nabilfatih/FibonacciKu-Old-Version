const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const route = require('color-convert/route');
const { isLoggedIn } = require('../middleware');
const Pelajaran = require('../models/pelajaran');
const Bab = require('../models/bab');

router.get('/', isLoggedIn, async (req, res) => {
    const MTK = await Pelajaran.find({query: "matematika"});
    const Fisika = await Pelajaran.find({query: "fisika"});
    const Informatika = await Pelajaran.find({query: "informatika"});
    const Biologi = await Pelajaran.find({query: "biologi"});
    const Kimia = await Pelajaran.find({query: "kimia"});
    const AI = await Pelajaran.find({query: "kecerdasan-buatan"});
    const UTBK = await Pelajaran.find({query: "utbk-sbmptn"});
    const ANP = await Pelajaran.find({query: "aufnahmeprüfung"});
    res.render('pelajaran/index', {
        MTK,
        Fisika,
        Informatika,
        Biologi,
        Kimia,
        AI,
        UTBK,
        ANP
    });
});

router.get('/:query', isLoggedIn, async(req, res) => {
    const pelajaran = await Pelajaran.findOne({query: req.params.query});
    const babs = await Bab.find({query: req.params.query});
    res.render('pelajaran/show', {
        pelajaran,
        babs
    });
});

router.get('/:query/:querybab', isLoggedIn, async(req, res) => {
    res.render('pelajaran/belajar')
})

module.exports = router;