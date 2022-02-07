const express = require('express');
const router = express.Router();
const pelajaran = require('../controllers/mata-pelajaran');
const catchAsync = require('../utils/catchAsync');
const route = require('color-convert/route');
const { isLoggedIn } = require('../middleware');

router.get('/', isLoggedIn, catchAsync(pelajaran.pelajaran));

module.exports = router;