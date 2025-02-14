const express = require('express');
const router = express.Router();
const {
  getKeys,
  createOrder,
  PayOrders,
} = require('../controllers/Payment.controller.js');
const verifyUser = require('../middlewares/jwt-verify.js');
//routes post and get
// orderID
router.post('/create-order', createOrder);

// orderId--> make paymnent
router.post('/pay-order', verifyUser, PayOrders);

router.get('/get-razorpay-key', getKeys);

// router.get('/get-payment-list', );

module.exports = router;