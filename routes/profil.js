const express = require('express');
const router = express.Router();
const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');
const Profil = require('../controllers/profil');
const { storage } = require('../cloudinary');
const upload = multer({ storage: storage });
const Pengaturan = require('../controllers/pengaturan');

router.get('/:username', isLoggedIn, catchAsync(Profil.profil));

router.put('/:username', isLoggedIn, upload.single('avatar'), catchAsync(Profil.gantiFoto));

router.get('/', isLoggedIn, catchAsync(Profil.index));

module.exports = router;