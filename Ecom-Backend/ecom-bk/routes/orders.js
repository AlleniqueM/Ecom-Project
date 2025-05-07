const express = require('express');
const router = express.Router();

const Order = require('../models/orders');
// See Orders
router.get('/order', async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching orders' });
  }
});
// AT USER CREATES ORDER
router.post('/order/new-order', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.createOrder();
    res.send({ message: 'Order created successfully' });
  } catch (error) {
    console.error(error);            
    res.status(500).send({ message: 'Error creating order' });
  }
});
// FINDING USER ORDER UPON USER REQUEST
router.get('/order/:order_id/find-order', async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await Order.getOrderById(order_id);
    res.send(order);
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: 'Order not found' });
  }
});

// UPDATE STATUS
router.put('/order/:order_id/order-update', async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await Order.getOrderById(order_id);
    order.orderStatus = req.body.orderStatus;
    await order.updateOrderStatus();
    res.send({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: 'Order not found' });
  }
});
// AT USER CANCELS ORDER
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