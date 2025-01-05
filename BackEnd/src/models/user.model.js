const { version } = require("mongoose");
const mongoose = require ('mongoose');
const userSchema = new mongoose.Schema({
Name: {type: string, require: true ['please enter your name...']},
 email:{

    type: String,
    require: [true, 'Please enter your mail..'],
    unique: [true, 'Please enter your unique email'],
 },

 password: {type: String, require: [true, 'Please enter the password...']},
 address:[
    {city:String},
    {country:String},
    {add1:String},
    {add2:String},
    {zipCode:String},
    {addressType:String},
 ],
 
 role: {type: String, default: 'user'},
 avatar:{
    url:{type: String,require: true},
    public_id:{type:String,require:true},
 },
 resetPasswordToken: String,
 resetPasswordTime: Date,
},
 {versionKey: false}
);
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;