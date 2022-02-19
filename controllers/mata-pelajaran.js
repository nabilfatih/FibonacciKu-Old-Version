const Pelajaran = require('../models/pelajaran');
const Bab = require('../models/bab');
const SubBab = require('../models/subbab');
const Konten = require('../models/konten');

module.exports.index = async (req, res) => {
    const pelajarans = await Pelajaran.find({jenis: "pelajaran"});
    const ujians = await Pelajaran.find({jenis: "ujian"});
    res.render('pelajaran/index', {
        pelajarans,
        ujians,
        user: req.user
    });
}

module.exports.show = async(req, res) => {
    const pelajaran = await Pelajaran.findOne({query: req.params.query});
    const babs = await Bab.find({query: req.params.query});
    res.render('pelajaran/show', {
        pelajaran,
        babs,
        user: req.user
    });
}

module.exports.showBelajar = async(req, res) => {
    const babs = await Bab.findOne({querybab: req.params.querybab});
    const subbabs = await SubBab.find({querybab: req.params.querybab});
    const kontens = await Konten.find({querybab: req.params.querybab});
    res.render('pelajaran/show-belajar', {
        babs,
        subbabs,
        kontens,
        user: req.user
    });
}

module.exports.modal = async(req, res) => {
    const video = await Konten.findOne({queryjudul: req.params.queryjudul});
    res.render('pelajaran/modal', {
        video,
        user: req.user
    });
}