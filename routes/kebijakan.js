const express = require('express');
const router = express.Router();
const kebijakan = require('../controllers/kebijakan');
const catchAsync = require('../utils/catchAsync');

router.get('/', catchAsync(kebijakan.kebijakan));

module.exports = router;