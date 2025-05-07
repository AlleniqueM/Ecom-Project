const db = require('../database');

class Cart {
    constructor(cart_id, user_id, product_id, quantity) {
        this.cart_id = cart_id;
        this.user_id = user_id;
        this.product_id = product_id;
        this.quantity = quantity;
    }



    async addProductToCart(){
        const query = "INSERT INTO carts(user_id, product_id, quantity) VALUES (?, ?, ?)";
        try {
            const result = await db.query(query, [this.user_id, this.product_id, this.quantity]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getCartById(cart_id) {
        const query = "SELECT * FROM carts WHERE cart_id = ?";
        try {
            const result = await db.query(query, [cart_id]);
            return result;
            } catch (error) {
                throw error;
                }
    }

    static async removeProductFromCart(cart_id){
        const query = "DELETE FROM carts WHERE cart_id = ? AND product_id = ?";
        try {
            const result = await db.query(query, [cart_id, product_id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

  static async getCartforUser(user_id) {
        const query = "SELECT * FROM carts WHERE user_id = ?";
        const result = await db.query(query, [user_id]);
        return result;
      }
      
    async updateQuantity() {
        const query = "UPDATE carts SET quantity = ? WHERE cart_id = ? ";
        try {
            const result = await db.query(query, [this.quantity, this.cart_id]);
                return result;
                } catch (error) {
                    throw error;
                    }
                    }

    static async deleteCart(cart_id){
        const query = "DELETE FROM carts WHERE cart_id = ?";
        try {
            const result = await db.query(query, [cart_id]);
            return result;
            } catch (error) {
                throw error;
                }
    }




}

module.exports = Cart;