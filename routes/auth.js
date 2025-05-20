const express = require('express');
const { join, login } = require('../controller/auth');
const { isNotLoggedIn } = require('../middlewares');
const router = express.Router();

// POST /auth/join
router.post('/join', isNotLoggedIn, join);
// POST /auth/login
router.post('/login', isNotLoggedIn, login);

module.exports = router;