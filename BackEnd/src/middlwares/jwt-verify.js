const jwt = require('jsonwebtoken');
<<<<<<< HEAD

if (process.env.NODE_ENV !== 'PRODUCTION') {
=======
if (process.env.NODE !== 'PRODUCTION') {
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
  require('dotenv').config({
    path: './config/.env',
  });
}

const verifyUser = (req, res, next) => {
  const { token } = req.query;
<<<<<<< HEAD

  if (!token) {
    return res
      .status(401)
      .send({ message: 'Authentication required. Please send a token.', success: false });
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.UserId = data.id;
    req.userEmailAddress = data.email;
    next();
  } catch (err) {
    return res
      .status(403)
      .send({ message: 'Invalid or expired token.', success: false });
  }
=======
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
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
};

module.exports = verifyUser;