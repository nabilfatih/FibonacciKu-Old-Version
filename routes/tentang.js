const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Tentang = require('../controllers/tentang');

router.get('/', catchAsync(Tentang.tentang));

module.exports = router;