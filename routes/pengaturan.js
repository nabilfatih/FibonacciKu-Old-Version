const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Pengaturan = require('../controllers/pengaturan');
const { isLoggedIn, isValidPassword, changePassword } = require('../middleware');

router.get('/akun', isLoggedIn, catchAsync(Pengaturan.akun));

router.put('/akun', isLoggedIn, catchAsync(Pengaturan.updateProfile));

router.get('/password', isLoggedIn, catchAsync(Pengaturan.password));

router.put('/password', isLoggedIn, 
    catchAsync(isValidPassword),
    catchAsync(changePassword),
);

module.exports = router;