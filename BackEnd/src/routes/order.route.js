const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const verifyUser = require('../middlwares/jwt-verify.js');

const {
  GetUserOrdersController,
  CreateOrderController,
  CancelOrder,
} = require('../controllers/order.controller.js');

router.get('/user-orders-data', verifyUser, GetUserOrdersController);
router.post('/confirm-order', verifyUser, CreateOrderController);
router.patch('/cancel-order', verifyUser, CancelOrder);
=======
const verifyUser  = require('../middlwares/jwt-verify.js');

const {
    GetUserOrdersController,
    CreateOrderController,
    CancelOrder,
  } = require('../controllers/order.controller.js');

router.get('/user-orders-data', verifyUser, GetUserOrdersController);
router.post('/confirm-order', verifyUser, CreateOrderController);
router.patch('cancel-order', verifyUser, CancelOrder);
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3

module.exports = router;