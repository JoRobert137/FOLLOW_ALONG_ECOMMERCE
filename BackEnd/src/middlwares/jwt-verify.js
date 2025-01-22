const jwt = require('jsonwebtoken');
if (process.env.NODE !== 'PRODUCTION') {
  require('dotenv').config({
    path: './config/.env',
  });
}

const verifyUser = (req, res, next) => {
  const { token } = req.query;
  console.log(req.query);
  if (!token) {
    return res.status(404).send({ message: 'Send token over rqeuest' });
  }

  const data = jwt.verify(token, process.env.SECRET_KEY);
  console.log(data);
  req.UserId = data.id; // Extract userId from token payload
  req.userEmailAddress = data.email;
  //   req.body.userEmailAddress
  next();
};

module.exports = verifyUser;