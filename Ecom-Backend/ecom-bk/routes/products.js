const express = require('express');
const router = express.Router();
const Product = require('../models/products');
// Show all producton shop page
router.get('/shop', async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching products' });
  }
});
// Get product by id
router.get('/shop/products/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await Product.getProductById(product_id);
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: 'Product not found' });
  }
});
// sort function

module.exports = router;