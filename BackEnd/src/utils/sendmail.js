const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "joro2408@gmail.com",
    pass: "nohj yaja dlag evol",
  },
});
module.exports = transporter;