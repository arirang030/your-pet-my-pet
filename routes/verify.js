const express = require('express');
const { isLoggedIn } = require('../middlewares');
const { requestVerification, checkVerificationResult } = require('../controller/verify');
const router = express.Router();

// GET /badge
router.get('/', isLoggedIn, checkVerificationResult);
// POST /badge
router.post('/', isLoggedIn, requestVerification);

module.exports = router;