const express = require('express');
const userRouter = require('./routes/user.route.js');
const productRouter = require('./routes/product.route.js');
const cors = require('cors');
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: './src/config/.env',
  });
}

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.send('Welcome to backend');
});

app.use('/user', userRouter);
app.use('/product', productRouter);

module.exports = app;