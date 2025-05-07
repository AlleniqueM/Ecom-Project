const express = require('express');
const router = express.Router();
const cartdb = require('../models/carts');
// CART ROUTES UPON USER REQUEST

// get cart by user id
router.get('/cart/:cart_id', (req, res)=>{
    try {
            const userId = req.user.id
            const cartItems = cartdb.getCartItemsByUserId(userId);
            res.json(cartItems);
        
    } catch (error) {
        console.error('Error fetching cart:', error.message);
        res.status(404).send({ message: "Cart not found" });
        }
});

// add product to cart by cart id 
router.post('/cart/:cart_id/add', (req, res)=>{
    try {
        const { cart_id } = req.params;
        const { product_id } = req.body;
        const cart = cartdb.getCartById(cart_id);
        const quantity = req.body.quantity;

        if(!cart){ throw new error('Cart not found');}

        const newProduct = cartdb.addProductToCart(cart_id, product_id , quantity);
        res.json(newProduct);
    } catch (error) {
        console.error('Could not add product to cart:', error.message);
        res.status(404).send({ message: "Cart not found" });
    }
});

// remove product from cart by cart id
// update cart quantity
router.post('/cart/:cart_id', (req, res)=>{
    try {
        const { cart_id } = req.params;
        const { product_id } = req.body;
        const quantity = req.body.quantity;
        const cart = cartdb.getCartById(cart_id);
        if(!cart){ throw new error('Cart not found');}
        const updatedQuantity = cartdb.updateQuantityInCart(cart_id, product_id, quantity);
       res.json(updatedQuantity);
    } catch (error) {
        console.error('Could not update quantity in cart:', error.message);
        res.status(404).send({ message: "Cart not found" });
    }
});

// delete cart
router.delete('/cart/:cart_id', (req, res)=>{
    try {
        
        const userId = req.user.id;
        const cart_id = cartdb.getCartItemsById(userId);
        const cart = cartdb.getCartById(cart_id);
        if(!cart){ throw new error('Cart not found');}
        cartdb.deleteCart(cart_id);
        res.status(204).send({ message: "Cart deleted" });
        } catch (error) {
            console.error('Could not delete cart:', error.message);
            res.status(404).send({ message: "Cart not found" });
        }
});

module.exports = router;