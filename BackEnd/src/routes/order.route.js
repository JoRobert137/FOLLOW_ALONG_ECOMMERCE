const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/jwt-verify');

router.post('/confirm-order', verifyToken /* controller */);

module.exports = router;