const express = require('express');
const router = express.Router();
const kontak = require('../controllers/kontak');
const catchAsync = require('../utils/catchAsync');
const route = require('color-convert/route');

router.get('/', catchAsync(kontak.kontak));

module.exports = router;