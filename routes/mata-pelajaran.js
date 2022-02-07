const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const route = require('color-convert/route');
const { isLoggedIn } = require('../middleware');
const Pelajaran = require('../models/pelajaran');

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    const pelajaran = await Pelajaran.find({});
    res.render('pelajaran/mata-pelajaran')
}));

router.get('/:pelajaran', async(req, res) => {
    res.render('pelajaran/pelajaran')
});

module.exports = router;