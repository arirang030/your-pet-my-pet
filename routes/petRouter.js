const express = require('express');
const { isLoggedIn } = require('../middlewares');
const { getPet, postPet } = require('../controller/petController');
const router = express.Router();

// GET /pet
router.get('/', isLoggedIn, getPet);
// POST /pet
router.post('/', isLoggedIn, postPet);

module.exports = router;