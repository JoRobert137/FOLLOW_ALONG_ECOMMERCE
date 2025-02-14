const mongoose = require('mongoose');
const file = {
  amount: { type: Number, require: true },
  isPaid: { type: Boolean, require: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
  paidOrders: [{ type: mongoose.Types.ObjectId, ref: 'Order', require: true }],
  razorpay: {
    orderId: { type: String, require: true },
    paymentId: { type: String, require: true },
    signature: { type: String, require: true },
  },
};

const SchemaPayment = new mongoose.Schema(file, { versionKey: false });
const PaymentModel = mongoose.model('Payments', SchemaPayment);

module.exports = PaymentModel;