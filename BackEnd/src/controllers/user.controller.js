const UserModel = require('../models/user.model.js');
const ErrorHandler = require('../utils/ErrorHandler.js');
const transporter = require('../utils/sendmail.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary.js');
const fs = require('fs');
const { default: mongoose } = require('mongoose');

require('dotenv').config({
  path: '../config/.env',
});

async function CreateUSer(req, res) {
  const { Name, email, password } = req.body;

  const CheckUserPresent = await UserModel.findOne({
    email: email,
  });

  if (CheckUserPresent) {
    const error = new ErrorHandler('Already Present in DB', 400);
    return res.status(404).send({
      message: error.message,
      status: error.statusCode,
      success: false,
    });
  }

  const newUser = new UserModel({
    Name: Name,
    email: email,
    password: password,
  });
  const data = {
    Name,
    email,
    password,
  };
  const token = generateToken(data);
  await transporter.sendMail({
<<<<<<< HEAD
    to: email,
    from: 'kodagian1137@gmail.com',
    subject: 'Verification email from ShopSphere',
    text: 'Verify your account',
    html: `<h1>Hello ${Name}! Click <a href="http://localhost:5173/activation/${token}">here</a> to verify your email.</h1>`,
=======
    to: 'kodagian1137@gmail.com',
    from: 'kodagian1137@gmail.com',
    subject: 'Verification email from Follow-Along project',
    text: 'Text',
    html: `<h1>Hello world   http://localhost:5173/activation/${token} </h1>`,
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
  });

  await newUser.save();

  return res.send('User Created Successfully');
}

const generateToken = (data) => {
  const token = jwt.sign(
<<<<<<< HEAD
    { name: data.name || data.Name, email: data.email, id: data.id },
    process.env.SECRET_KEY,
    { expiresIn: '7d' }
  );
  return token;
};

const verifyUser = (token) => {
  try {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    return verify;
  } catch (err) {
=======
    { name: data.name, email: data.email, id: data.id },
    process.env.SECRET_KEY
  );
  return token;
};
const verifyUser = (token) => {
  const verify = jwt.verify(token, process.env.SECRET_KEY);
  if (verify) {
    return verify;
  } else {
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
    return false;
  }
};

async function verifyUserController(req, res) {
  const { token } = req.params;
  try {
    if (verifyUser(token)) {
      return res
        .status(200)
        .cookie('token', token)
        .json({ token, success: true });
    }
    return res.status(403).send({ message: 'token expired' });
  } catch (er) {
    return res.status(403).send({ message: er.message });
  }
}

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const checkUserPresentinDB = await UserModel.findOne({ email: email });
    if (checkUserPresentinDB) {
      return res.status(403).send({ message: 'User already present' });
    }
<<<<<<< HEAD

=======
    console.log(req.file, process.env.cloud_name);
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
    const ImageAddress = await cloudinary.uploader
      .upload(req.file.path, {
        folder: 'uploads',
      })
      .then((result) => {
        fs.unlinkSync(req.file.path);
        return result.url;
      });

<<<<<<< HEAD
=======
    console.log('url', ImageAddress);

>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
    bcrypt.hash(password, 10, async function (err, hashedPassword) {
      try {
        if (err) {
          return res.status(403).send({ message: err.message });
        }
        await UserModel.create({
          Name: name,
          email,
          password: hashedPassword,
          avatar: {
            url: ImageAddress,
            public_id: `${email}_public_id`,
          },
        });

        return res.status(201).send({ message: 'User created successfully..' });
      } catch (er) {
        return res.status(500).send({ message: er.message });
      }
    });
<<<<<<< HEAD
=======

    //
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
  } catch (er) {
    console.log(er);
    return res.status(500).send({ message: er.message });
  }
};
<<<<<<< HEAD

=======
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUserPresentinDB = await UserModel.findOne({ email: email });

<<<<<<< HEAD
    if (!checkUserPresentinDB) {
      return res
        .status(404)
        .send({ message: 'User not found. Please sign up.', success: false });
    }

=======
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
    bcrypt.compare(
      password,
      checkUserPresentinDB.password,
      function (err, result) {
        if (err) {
<<<<<<< HEAD
          return res.status(403).send({ message: err.message, success: false });
        }
        if (!result) {
          return res
            .status(401)
            .send({ message: 'Invalid credentials.', success: false });
=======
          return res.status(403).send({ message: er.message, success: false });
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
        }
        let data = {
          id: checkUserPresentinDB._id,
          email,
          password: checkUserPresentinDB.password,
        };
        const token = generateToken(data);

        return res
          .status(200)
          .cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
          })
          .send({
            message: 'User logged in successfully..',
            success: true,
            token,
          });
      }
    );
  } catch (er) {
    return res.status(403).send({ message: er.message, success: false });
  }
};

<<<<<<< HEAD
=======

>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
const getUserData = async (req, res) => {
  const userId = req.UserId;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).send({ message: 'Send Valid User Id' });
    }
    const checkUserPresentinDB = await UserModel.findOne({ _id: userId });
    if (!checkUserPresentinDB) {
      return res
        .status(401)
        .send({ message: 'Please Signup, user not present' });
    }
    return res.status(200).send({ data: checkUserPresentinDB });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
};

<<<<<<< HEAD
const AddAddressController = async (req, res) => {
  const userId = req.UserId;
  const { city, country, address1, address2, zipCode, addressType } = req.body;
  try {
    const userFindOne = await UserModel.findOne({ _id: userId });
    if (!userFindOne) {
      return res
        .status(404)
        .send({ message: 'User not found', success: false });
=======
const AddAddressController = async(req, res) => {
  const userId = req.UserId;
  const {city, country, address1, address2, zipCode, addressType} = req.body;
  try {
    const userFindOne = await UserModel.findOne({_id: userId});
    if(!userFindOne){
      return res
        .status(404)
        .send({message: "User not found", success: false});
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
    }

    const userAddress = {
      city,
      country,
      address1,
      address2,
      zipCode,
      addressType,
    };

    userFindOne.address.push(userAddress);
    const response = await userFindOne.save();

    return res
      .status(201)
<<<<<<< HEAD
      .send({ message: 'User Address Added', success: true, response });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
};

const GetAddressController = async (req, res) => {
  const userId = req.UserId;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).send({ message: 'Please login, un-authorised' });
    }

    const checkUser = await UserModel.findOne({ _id: userId }, { address: 1 });
    if (!checkUser) {
      return res.status(401).send({ message: 'Please signup, un-authorised' });
=======
      .send({message: "User Address Added", success: true, response})
  } catch(er){
    return res.status(500).send({ message: er.message });
  }
}

const GetAddressController = async (req, res) => {
  const userId = req.UserId
  try {
    if(!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).send({message: "Please login, un-authorised"})
    }

    const checkUser = await UserModel.findOne({_id: userId}, {address: 1});
    if(!checkUser){
      return res.status(401).send({message: 'Please signup, un-authorised'})
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
    }

    return res.status(200).send({
      userInfo: checkUser,
<<<<<<< HEAD
      message: 'Success',
      success: true,
    });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
};

const DeleteAddressController = async (req, res) => {
  const userId = req.UserId;
  const addressId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).send({ message: 'Please login, un-authorised' });
    }

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .send({ message: 'User not found', success: false });
    }

    user.address = user.address.filter(
      (addr) => addr._id.toString() !== addressId
    );
    await user.save();

    return res.status(200).send({
      message: 'Address deleted successfully',
      success: true,
      address: user.address,
    });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
};

module.exports = {
  CreateUSer,
  verifyUserController,
  signup,
  login,
  getUserData,
  AddAddressController,
  GetAddressController,
  DeleteAddressController,
=======
      message: "Success",
      success: true,
    })
  } catch (er) {
    return res.status(500). send({message: er.message})
  }
}

module.exports = { 
  CreateUSer,
  verifyUserController, 
  signup, 
  login, 
  getUserData, 
  AddAddressController, 
  GetAddressController
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
};