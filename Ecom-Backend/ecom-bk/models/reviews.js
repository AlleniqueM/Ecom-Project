const db = require("../database");

class Reviews {
  constructor({ review_id, user_id, first_name, product_id, rating, review }) {
    this.review_id = review_id;
    this.user_id = user_id;
    this.first_name = first_name;
    this.product_id = product_id;
    this.rating = rating;
    this.review = review;
  }

  // Create Review
  static async createReview() {
    const query = `INSERT INTO reviews (user_id, first_name, product_id, rating, review)`;
    try {
      const [results] = await db.query(query, [
        this.user_id,
        this.first_name,
        this.product_id,
        this.rating,
        this.review,
      ]);
      return results;
    } catch (error) {
      throw error;
    }
  }
  // Get All Reviews
  static async getAllReviews() {
    const query = `SELECT * FROM reviews`;
    try {
      const [results] = await db.query(query);
      return results;
    } catch (error) {
      throw error;
    }
  }
  // Get Review By Id
  static async getReviewById(review_id) {
    const query = `SELECT * FROM reviews WHERE review_id = ?`;
    try {
      const [results] = await db.query(query, [review_id]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // Update Review
  static async updateReview(review_id, user_id, first_name, product_id, rating, review) {
    const query = `UPDATE reviews SET user_id = ?, first_name = ?, product_id = ?,
                rating = ?, review = ? WHERE review_id = ?`;
    try {
      const [results] = await db.query(query, [user_id, first_name, product_id, rating, review, review_id,
      ]);
      return results;
    } catch (error) {
      throw error;
    }
  }
  // Delete Review
  static async deleteReview(review_id) {
    const query = `DELETE FROM reviews WHERE review_id = ?`;
    try {
      const [results] = await db.query(query, [review_id]);
      return results;
    } catch (error) {
      throw error;
    }
  }
}_

module.exports = Reviews;