const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const route = require('color-convert/route');
const { isLoggedIn } = require('../middleware');
const Pelajaran = require('../models/pelajaran');
const Bab = require('../models/bab');
const SubBab = require('../models/subbab');
const Konten = require('../models/konten');

router.get('/', isLoggedIn, async (req, res) => {
    const pelajarans = await Pelajaran.find({jenis: "pelajaran"});
    const ujians = await Pelajaran.find({jenis: "ujian"});
    res.render('pelajaran/index', {
        pelajarans,
        ujians
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
    const pelajaran = await Pelajaran.findOne({query: req.params.query});
    const babs = await Bab.findOne({querybab: req.params.querybab});
    const subbabs = await SubBab.find({querybab: req.params.querybab});
    const kontens = await Konten.find({querybab: req.params.querybab});
    res.render('pelajaran/show-belajar', {
        pelajaran,
        babs,
        subbabs,
        kontens
    });
});

module.exports = router;