const db = require("../database");

class User {
  constructor(
    user_id,
    email,
    password,
    first_name,
    last_name,
    created_at = null,
    updated_at = null,
    role = false
  ) {
    this.user_id = user_id;
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.role = role;
  }

  static async getAllUsers() {
    const query = "SELECT * FROM users";
    try {
      const [results] = await db.execute(query);
      return results;
    } catch (error) {
      throw error;
    }
  }

  async addUser() {
    const { email, password, first_name, last_name } = this;
    const query =
      "INSER into users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)";
    try {
      await db.execute(query, [email, password, first_name, last_name]);
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(user_id) {
    const query = "SELECT * FROM users WHERE user_id = ?";
    try {
      const [results] = await db.execute(query, [user_id]);
      if (results.length === 0) {
        throw "User not found";
      }
      return results[0];
    } catch (error) {
      throw error;
    }
  }

  async updateUser() {
    const { user_id, email, first_name, last_name } = this;
    const query =
      "UPDATE users SET email = ?, first_name = ?, last_name = ? WHERE user_id = ?";
    try {
      const [results] = await db.execute(query, [
        email,
        first_name,
        last_name,
        user_id,
      ]);
      if (results.affectedRows === 0) {
        throw "User  not found";
      }
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(user_id, currentPassword, newPassword) {
    const [rows] = await db.execute('SELECT password FROM users WHERE user_id = ?', [user_id]);
    if (rows.length === 0) throw new Error('User not found');
    
    const isMatch = await bcrypt.compare(currentPassword, rows[0].password);
    if (!isMatch) throw new Error('Current password is incorrect');
    if (newPassword.length < 8) throw new Error('Password must be at least 8 characters');
  
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await db.execute('UPDATE users SET password = ? WHERE user_id = ?', [hashedPassword, user_id]);
  }

  static async deleteUser(user_id) {
    const query = "DELETE FROM users WHERE user_id = ?";
    try {
      const [results] = await db.execute(query, [user_id]);
      if (results.affectedRows === 0) {
        throw "User not found";
      }
    } catch (error) {
      throw error;
    }
  }

  // Admin
}

module.exports = User;
