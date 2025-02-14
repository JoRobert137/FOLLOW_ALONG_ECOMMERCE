const Razorpay = require('razorpay');
const PaymentModel = require('../models/Payment.model');
const { default: mongoose } = require('mongoose');
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: './src/config/.env',
  });
}
console.log({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
async function createOrder(req, res) {
  const { amount, currency } = req.body;
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const orders = await instance.orders.create({
      amount: amount * 100,
      currency: currency,
    });
    if (!orders) {
      return res.status(500).send({ message: 'Order Creation un-successfull' });
    }
    return res
      .status(201)
      .send({ message: 'Order Creation Successfull', orders });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
}
async function PayOrders(req, res) {
  const userId = req.UserId;
  const {
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    amount,
    orderIds,
  } = req.body;
  console.log(orderIds);
  // ['787bsmvd9098u']; //mongodb ObjectID
  console.log(razorpayPaymentId, razorpayOrderId, razorpaySignature);
  const mappedIds = orderIds.map((ele) => new mongoose.Types.ObjectId(ele._id));
  try {
    await PaymentModel.create({
      isPaid: true,
      user: userId,
      amount,
      paidOrders: mappedIds,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    return res.status(201).send({ message: 'Payment Successfull. green' });
    // [{}]
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
}
async function getKeys(req, res) {
  try {
    return res.status(200).send({ key: process.env.RAZORPAY_KEY_ID });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
}
module.exports = { getKeys, createOrder, PayOrders };