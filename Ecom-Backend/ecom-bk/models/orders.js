const db = require("../database.js");

class Order {
  constructor(
    order_id,
    user_id,
    address_id,
    amount,
    orderStatus,
    paymentMethod,
    created_at,
    updated_at
  ) {
    this.order_id = order_id;
    this.user_id = user_id;
    this.address_id = address_id;
    this.amount = amount;
    this.orderStatus = orderStatus;
    this.paymentMethod = paymentMethod;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
  // Create order
  async createOrder(
    user_id,
    address_id,
    amount,
    orderStatus,
    paymentMethod,
    created_at,
    updated_at
  ) {
    const query = `INSERT INTO orders (user_id, address_id, totalAmount, orderStatus, paymentMethod, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      user_id,
      address_id,
      amount,
      orderStatus,
      paymentMethod,
      created_at,
      updated_at,
    ];
    try {
      const result = await db.query(query, params);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Get all orders for current user
  async getAllOrders() {
    const query = `SELECT * FROM orders WHERE user_id = ?`;
    const params = [user_id];
    try {
      const result = await db.query(query, params);
      return result;
    } catch (error) {
      throw error;
    }
  }
  // Get order details
  async getOrderById(order_id) {
    const query = `SELECT * FROM orders WHERE order_id = ?`;
    const params = [order_id];
    try {
      const result = await db.query(query, params);
      return result;
    } catch (error) {
      throw error;
    }
  }
  // Update order status
  async updateOrderStatus(order_id, orderStatus) {
    const query = `UPDATE orders SET orderStatus = ? WHERE order_id = ?`;
    const params = [orderStatus, order_id];
    try {
      const result = await db.query(query, params);
      return result;
    } catch (error) {
      throw error;
    }
  }
  // Delete order
  async deleteOrder() {
    const query = `DELETE FROM orders WHERE order_id = ?`;
    const params = [this.order_id];
    try {
      const result = await db.query(query, params);
      return result;
    } catch (error) {
      throw error;
    }
  }
}



module.exports = Order;
