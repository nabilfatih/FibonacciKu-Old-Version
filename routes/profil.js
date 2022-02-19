const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');
const Profil = require('../controllers/profil');

router.get('/:username', isLoggedIn, catchAsync(Profil.profil));

module.exports = router;