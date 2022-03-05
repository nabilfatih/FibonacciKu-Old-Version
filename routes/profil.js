const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');
const Profil = require('../controllers/profil');
const Pengaturan = require('../controllers/pengaturan');

router.get('/:username', isLoggedIn, catchAsync(Profil.profil));

router.get('/', isLoggedIn, catchAsync(Profil.index));

module.exports = router;