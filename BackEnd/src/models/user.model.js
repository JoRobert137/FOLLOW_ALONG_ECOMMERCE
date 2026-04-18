<<<<<<< HEAD
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, 'Please enter your name...'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your mail..'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter the password...'],
    },
    address: [
      {
        city: { type: String },
        country: { type: String },
        address1: { type: String },
        address2: { type: String },
        zipCode: { type: Number },
        addressType: { type: String },
      },
    ],
    role: { type: String, default: 'User' },
    avatar: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { versionKey: false }
);

=======
const { version } = require("mongoose");
const mongoose = require ('mongoose');
const userSchema = new mongoose.Schema({
Name: {type: String, require: true ['please enter your name...']},
 email:{

    type: String,
    require: [true, 'Please enter your mail..'],
    unique: [true, 'Please enter your unique email'],
 },

 password: {type: String, require: [true, 'Please enter the password...']},
 address: [
   {
     city: {
       type: String,
     },
     country: {
       type: String,
     },
     address1: {
       type: String,
     },
     address2: {
       type: String,
     },
     zipCode: {
       type: Number,
     },
     addressType: {
       type: String,
     },
   },
 ],
 
 role: {type: String, default: 'User'},
 avatar:{
    url:{type: String,require: true},
    public_id:{type:String,require:true},
 },
 resetPasswordToken: String,
 resetPasswordTime: Date,
},
 {versionKey: false}
);
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;