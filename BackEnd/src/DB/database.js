if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "../config/.env",
  });
}
const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://John_Robert:JoRo1137@cluster0.3ajk7.mongodb.net/")
    .then((data) => {
      console.log(`Database is connected Successfully: ${data.connection.host} `);
    })
    .catch((er) => {
        console.log(`Database connection failed... ${er.message}`)
    });
};

module.exports = connectDatabase;
