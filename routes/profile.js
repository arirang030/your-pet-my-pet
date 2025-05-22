const express = require('express');
const { isLoggedIn } = require('../middlewares');
const { getProfile } = require('../controller/profile');
const router = express.Router();

// GET /profile
router.get('/', isLoggedIn, getProfile);

module.exports = router;