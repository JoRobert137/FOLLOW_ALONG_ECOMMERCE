<<<<<<< HEAD
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: '../config/.env',
  });
}

const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log(
        `Database is connected Successfully: ${data.connection.host} `
      );
    })
    .catch((er) => {
      console.log(`Database connection failed... ${er.message}`);
=======
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "../config/.env",
  });
}
const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Database is connected Successfully: ${data.connection.host} `);
    })
    .catch((er) => {
        console.log(`Database connection failed... ${er.message}`)
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
    });
};

module.exports = connectDatabase;
