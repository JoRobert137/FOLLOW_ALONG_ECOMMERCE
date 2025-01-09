const multer = require('multer');
const upload = multer({ dest: 'temp-uploads/' });
const express = require('express');
const {
  createProductController,
  getProductDataController,
  updateProductController,
  getSingleProductDocumentController,
} = require('../controllers/product.controller.js');
const router = express.Router();

router.post(
  '/create-product',
  upload.array('files', 5),
  createProductController
);

router.get('/get-products', getProductDataController);

router.put('/update-products/:id', upload.array('files', 5), updateProductController);

router.get('/get-single/:id', getSingleProductDocumentController);

module.exports = router;