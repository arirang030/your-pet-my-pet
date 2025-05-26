const express = require('express');
const { postMatchingRequest } = require('../controller/matchingController');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

// POST /matching/savereq
router.post('/savereq', isLoggedIn, postMatchingRequest);


module.exports = router;