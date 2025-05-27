const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/admin');
const { examineVerificationRequest, grantBadge } = require('../controller/adminController');
const { isLoggedIn } = require('../middlewares');

// GET /admin/examine
router.get('/examine', isLoggedIn, isAdmin, examineVerificationRequest);
// POST /admin/grant
router.post('/grant', isLoggedIn, isAdmin, grantBadge);

module.exports = router;