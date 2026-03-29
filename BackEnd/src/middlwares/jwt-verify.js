const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: './config/.env',
  });
}

const verifyUser = (req, res, next) => {
  const { token } = req.query;

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
};

module.exports = verifyUser;