const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: {
        type: String, 
        require: [true, "Please Enter the Name"]},
    email: {
        type: String, 
        require: [true, "Please Enter the Email"], 
        unique: [true, "Please Enter Unique Email Address"]},
    password: {
        type: String, 
        require: [true, "Please enter the Password"]},
    address: [
        {city: String},
        {country: String},
        {add1: String},
        {add2: String},
        {zipCode: String},
        {addressType: String},
    ],
    role: {
        type: String, 
        default: "user"},
    avatar: {
        url: {}, 
        public_id: {type : String, require: true}
    },
    resetPasswordToken: String,
    resetPassswordTime: Date,
   },
   { versionKey: false}
   
);
const model = mongoose.model("User", userSchema);
 
module.exports = UserModel;