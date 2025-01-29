const mongoose = require('mongoose');
const file = {
    productId:{ type:mongoose.Types.ObjectId, ref:"Product"},
    quantity : {type:Number, require:true, default: 1},
    userId : {type:mongoose.Types.ObjectId, ref:'User'},    
}

const cartSchema = new mongoose.Schema(file)
const CartModel = mongoose.model('Cart', cartSchema)


module.exports = CartModel;