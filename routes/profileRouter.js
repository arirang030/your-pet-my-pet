const express = require('express');
const { isLoggedIn } = require('../middlewares');
const { getProfile } = require('../controller/profileController');
const router = express.Router();

// GET /profile
router.get('/', isLoggedIn, getProfile);

module.exports = router;