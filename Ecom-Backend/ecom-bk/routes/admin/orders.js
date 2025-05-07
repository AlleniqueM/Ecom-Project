const express = require('express');
const router = express.Router();
const Order = require('../../models/orders');

// const paymentGateway = require('./')

// Order management but for admin. 

// See Orders 
router.get('/get-orders', async (req, res) => {
    try {
      const orders = await Order.getAllOrders();
      res.send(orders);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error fetching orders' });
    }
  });
// Find specific users order info
  router.get('/order/:order_id', async (req, res) => {
    try {
      const { order_id } = req.params;
      const order = await Order.getOrderById(order_id);
      res.send(order);
    } catch (error) {
      console.error(error);
      res.status(404).send({ message: 'Order not found' });
    }
  });

  // Cancel order from admin 
  router.delete('/order/:order_id/remove-order', async (req, res) => {
    try {
      const { order_id } = req.params;
      const order = await Order.getOrderById(order_id);
      await order.deleteOrder();
      res.send({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(404).send({ message: 'Order not found' });
    }
  });

  module.exports = router;