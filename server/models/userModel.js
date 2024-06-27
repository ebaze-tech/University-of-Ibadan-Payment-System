const db = require('../config/db');

class User {
  static async create({
    email, password, number
  }) {
    // Validate the number length
    if (![4, 5, 6, 8].includes(number.length)) {
      throw new Error('Invalid number length. Must be 4, 5, 6, or 8 characters.');
    }

    // Determine the user role based on the number length
    const role = this.getUserType(number);

    try {
      const connection = await db.getConnection();
      const [rows] = await connection.execute(
        'INSERT INTO users (email, password, number, role) VALUES (?,?,?,?)',
        [email, password, number, role]
      );
      return rows.insertId;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      if(connection){
        connection.release();
      }
    }
  }

  static async findByEmail(email) {
    if (!email) {
      throw new Error('Email is required to find user.');
    }
    try {
      const connection = await db.getConnection();
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      if(connection) {
        connection.release();
      }
    }
  }

  static async findByNumber(number){
    if(!number){
      throw new Error('Number is required to find user');
    }
    try{
      const connection = await db.getConnection();
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE number = ?',
        [number]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error){
      throw new Error(error.message);
    } finally{
      if(connection) connection.release();
    }
  }

  static async findById(id) {
    try {
      const connection = await db.getConnection();
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(error.message);
    } finally{
      if(connection){
        connection.release();
      }
    }
  }

  static getUserType(number) {
    switch (number.length) {
      case 6:
        return 'Student';
      case 4:
      case 5:
        return 'Staff';
      case 8:
        return 'Admin';
      default:
        throw new Error('Invalid number length.');
    }
  }
}

module.exports = User;