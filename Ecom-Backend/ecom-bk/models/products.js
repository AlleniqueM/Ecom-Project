const db = require("../database");

class Product {
  constructor({ product_id, name, description, price, imageUrl, category }) {
    this.product_id = product_id || null;
    this.name = name;
    this.description = description || null;
    this.price = parseFloat(price) || 0;
    this.imageUrl = imageUrl || null;
    this.category = category || "Uncategorized";
  }

  static async getAllProducts() {
    const query = `SELECT * FROM products`;
    try {
      const [results] = await db.execute(query);
      return results;
    } catch (error) {
      throw error;
    }
  }

  async addProduct() {
    const query = `INSERT INTO products (name, description, price, imageUrl, category ) VALUES (?, ?, ?, ?, ?)`;
    try {
      const [results] = await db.execute(query, [
        this.name,
        this.description,
        this.price,
        this.imageUrl,
        this.category,
      ]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getProductById() {
    const query = `SELECT * FROM products WHERE product_id = ?`;
    try {
      const [results] = await db.execute(query, [product_id]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct() {
    const query = `UPDATE products SET name = ?, description = ?, price = ?, imageUrl = ?,
        category = ? WHERE product_id = ?`;
    try {
      const [results] = await db.execute(query, [
        this.name,
        this.description,
        this.price,
        this.imageUrl,
        this.category,
        this.product_id,
      ]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProduct() {
    const query = `DELETE FROM products WHERE product_id = ?`;
    try {
      const [results] = await db.execute(query, [this.product_id]);
      return results;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
