const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Pengaturan = require('../controllers/pengaturan');
const { isLoggedIn } = require('../middleware');

router.get('/akun', isLoggedIn, catchAsync(Pengaturan.akun));

router.get('/password', isLoggedIn, catchAsync(Pengaturan.password))

module.exports = router;