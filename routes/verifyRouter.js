const express = require('express');
const { isLoggedIn } = require('../middlewares');
const { requestVerification, checkVerificationResult } = require('../controller/verifyController');
const upload = require('../middlewares/upload');
const router = express.Router();

// GET /verify
router.get('/', isLoggedIn, checkVerificationResult);
// POST /verify
router.post('/', isLoggedIn, upload.single('image'), requestVerification);

module.exports = router;