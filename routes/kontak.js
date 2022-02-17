const express = require('express');
const router = express.Router();
const kontak = require('../controllers/kontak');
const catchAsync = require('../utils/catchAsync');

router.get('/', catchAsync(kontak.kontak));

module.exports = router;