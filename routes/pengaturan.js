const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Pengaturan = require('../controllers/pengaturan');
const { isLoggedIn } = require('../middleware');

router.get('/', isLoggedIn, catchAsync(Pengaturan.pengaturan));

module.exports = router;