const express = require('express');
const router = express.Router();
const syarat = require('../controllers/syarat');
const catchAsync = require('../utils/catchAsync');

router.get('/', catchAsync(syarat.syarat));

module.exports = router;