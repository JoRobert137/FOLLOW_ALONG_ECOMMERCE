const UserModel = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");

export async function CreateUser(){
    const { Name, email, password} = req.body;
     const CheckUserPresent = await UserModel.findOne({
        email: email,
     });

     if(CheckUserPresent) {
        return res.send("User already exists", 400);
     }
     const newUser = new UserModel({
        Name: Name,
        email: email,
        password: password,
     });

     await newUser.save();
     return res.send("User Created Successfully.")
}

module.exports = CreateUser;