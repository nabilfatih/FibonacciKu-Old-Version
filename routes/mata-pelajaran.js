const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');
const MataPelajaran = require('../controllers/mata-pelajaran');

router.get('/', isLoggedIn, catchAsync(MataPelajaran.index));

router.get('/:query', isLoggedIn, catchAsync(MataPelajaran.show));

router.get('/:query/:querybab', isLoggedIn, catchAsync(MataPelajaran.showBelajar));

router.get('/:query/:querybab/:queryjudul', isLoggedIn, catchAsync(MataPelajaran.modal));

module.exports = router;