const db = require('../config/db');

class User {
  static async create({
    email, password, number, role, googleId
  }) {
    try {
      const connection = await db.getConnection();
      const [rows] = await connection.execute(
        'INSERT INTO users (email, password, number,google_id, role) VALUES (?,?,?,?,?)',
        [email, password, number, googleId, role]
      );
      connection.release();
      return rows.insertId;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findByEmail(email){
    try {
      const connection = await db.getConnection();
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      connection.release();
      return rows.length > 0 ? rows [0] : null;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findByGoogleId(googleId){
    try{
      const connection = await db.getConnection();
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE google_id = ?',
        [googleId]
      );
      connection.release();
      return rows.length > 0 ? rows[0] : null;
    } catch(error) {
      throw new Error(error.message);
    }
  }

  static async findById(id) {
    try{
      const connection = await db.getConnection();
      const [rows] = await connection.execute(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );
      connection.release();
      return rows.length > 0 ? rows[0] : null;
    } catch(error) {
      throw new Error(error.message);
    }
  }
}

module.exports = User;