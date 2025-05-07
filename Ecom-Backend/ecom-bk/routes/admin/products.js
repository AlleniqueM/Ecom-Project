const express = require('express');
const router = express.Router();
const Product = require('../../models/products');



router.post('/add-products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.addProduct();
    res.send({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error adding product' });
  }
});
// Admin priviledges
router.put('/update-product/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await Product.getProductById(product_id);
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.category = req.body.category;
    await product.updateProduct();
    res.send({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: 'Product not found' });
  }
});
// Admin priviledges
router.delete('/remove-product/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await Product.getProductById(product_id);
    await product.deleteProduct();
    res.send({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: 'Product not found' });
  }
});

module.exports = router;