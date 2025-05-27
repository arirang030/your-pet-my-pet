const express = require('express');
const { postMatchingRequest, startMatching, testMakeReservation } = require('../controller/matchingController');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

// POST /matching/savereq
router.post('/savereq', isLoggedIn, postMatchingRequest);

// GET /matching/match
router.get('/match', isLoggedIn, startMatching);
// GET /matching/testreservation
router.get('/testreservation', isLoggedIn, testMakeReservation)


module.exports = router;