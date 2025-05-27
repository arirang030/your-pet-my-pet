const express = require('express');
const { postMatchingRequest, startMatching } = require('../controller/matchingController');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

// POST /matching/savereq
router.post('/savereq', isLoggedIn, postMatchingRequest);

// GET /matching/match
router.post('/match', isLoggedIn, startMatching);
// GET /matching/reservation


module.exports = router;