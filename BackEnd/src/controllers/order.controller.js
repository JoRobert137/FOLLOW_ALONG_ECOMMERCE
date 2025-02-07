const { default: mongoose } = require('mongoose');
const OrderModel = require('../models/Order.model');
const CartModel = require('../models/cart.model');
const UserModel = require('../models/user.model')

async function CreateOrderController(req, res) {
  const userId = req.UserId;
  const { Items, address, totalAmount } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .send({ message: 'Invalid User Id', success: false });
    }
    const checkUser = await UserModel.findOne({ _id: userId });
    if (!checkUser) {
      return res
        .status(400)
        .send({ message: 'User Not Present Please Signup', success: false });
    }
    if (!Items) {
      return res
        .status(400)
        .send({ message: 'Item Not Present', success: false });
    }
    const order = Items.map(async (ele) => {
      return await OrderModel.create({
        user: userId,
        orderItems: ele.productId._id,
        shippingAddress: address,
        totalAmount: totalAmount,
      });
    });
    await Promise.all(order);

    const ItemsMapped = Items.map(async (eachItem) => {
      return await CartModel.findByIdAndDelete({ _id: eachItem._id })
    });
    const checkDeletedItems = await Promise.all(ItemsMapped)

    return res
      .status(201)
      .send({ message: 'Data Successfully fetched', success: true, order });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
}

async function GetUserOrdersController(req, res) {
    const userId = req.UserId;
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res
          .status(400)
          .send({ message: 'In valid user id', success: false });
      }
      const checkUser = await UserModel.findOne({ _id: userId });
      if (!checkUser) {
        return res
          .status(400)
          .send({ message: 'Please sign up', success: false });
      }
      const orders = await OrderModel.find(
        {
          user: userId,
          orderStatus: { $ne: 'Cancelled' },
        },
        { orderStatus: 1, orderItems: 1 }
      ).populate('orderItems');

      return res
        .status(200)
        .send({ message: 'Data Successfully fetched', success: true, orders });
    } catch (er) {
      return res.status(500).send({ message: er.message, success: false });
    }
  }

  async function CancelOrder(req, res) {
    const userId = req.UserId;
    const orderId = req.query.orderId;
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res
          .status(400)
          .send({ message: 'InValid User Id', success: false });
      }
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res
          .status(400)
          .send({ message: 'InValid Order Id', success: false });
      }
      await OrderModel.findByIdAndUpdate(
        { _id: orderId },
        {
          orderStatus: 'Cancelled',
        },
        {
          new: true,
        }
      );
      return res
        .status(200)
        .send({ message: 'Order cancelled successfully..', success: true });
    } catch (er) {
      return res.status(500).send({ message: er.message, success: false });
    }
  }
  
  module.exports = {
    CreateOrderController,
    GetUserOrdersController,
    CancelOrder,
  };
