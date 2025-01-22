const express = require('express');
const router = express.Router();
const verifyUser = require('../middlwares/jwt-verify.js')
const { AddToCartController, GetProductsForUser } = require('../controllers/cart.controller.js')

router.post('/add-to-cart', verifyUser, AddToCartController);
router.get('/get-user-cart-data', verifyUser, GetProductsForUser);

module.exports = router;
