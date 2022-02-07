const express = require('express');
const router = express.Router();
const berandas = require('../controllers/berandas');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn} = require('../middleware');

router.get('/', isLoggedIn, catchAsync(berandas.index));

module.exports = router;