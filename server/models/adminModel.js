// const pool = require('../config/db');

// class AdminModel {
//     static async create({
//         email, password, number
//     }) {
//         // Validate the number input
//         const numberRegex = /^\d{8}/;
//         if (!numberRegex.test(number)) {
//             throw new Error('Wrong number input. Must be 8 digits long.');
//         }

//         let connection;
//         try {
//             connection = await pool.getConnection();
//             const [rows] = await connection.execute(
//                 'INSERT INTO admin (email, password, number) VALUES (?,?,?)',
//                 [email, password, number,]
//             );
//             return rows.insertId;
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }

//     static async findByEmail(email) {
//         if (!email) {
//             throw new Error('Email is required to find user.');
//         }

//         let connection;
//         try {
//             connection = await pool.getConnection();
//             const [rows] = await connection.execute(
//                 'SELECT * FROM admin WHERE email = ?',
//                 [email]
//             );
//             return rows.length > 0 ? rows[0] : null;
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }

//     static async findByNumber(number) {
//         if (!number) {
//             throw new Error('Number is required to find user');
//         }

//         let connection;
//         try {
//             connection = await pool.getConnection();
//             const [rows] = await connection.execute(
//                 'SELECT * FROM admin WHERE number = ?',
//                 [number]
//             );
//             return rows.length > 0 ? rows[0] : null;
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }

//     static async findById(id) {
//         let connection;
//         try {
//             connection = await pool.getConnection();
//             const [rows] = await connection.execute(
//                 'SELECT * FROM admin WHERE id = ?',
//                 [id]
//             );
//             return rows.length > 0 ? rows[0] : null;
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }
// }

// module.exports = AdminModel;


const pool = require('../config/db');

class AdminModel {
  static async create({ email, password, number }) {
    try {
      // Validate the number input
      const numberRegex = /^\d{8}$/;
      if (!numberRegex.test(number)) {
        throw new Error('Wrong number input. Must be 8 digits long.');
      }

      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        'INSERT INTO admin (email, password, number) VALUES (?, ?, ?)',
        [email, password, number]
      );
      connection.release();

      return rows.insertId;
    } catch (error) {
      throw new Error(`Failed to create admin: ${error.message}`);
    }
  }

  static async findByEmail(email) {
    try {
      if (!email) {
        throw new Error('Email is required to find user.');
      }

      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        'SELECT * FROM admin WHERE email = ?',
        [email]
      );
      connection.release();

      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(`Failed to find admin by email: ${error.message}`);
    }
  }

  static async findByNumber(number) {
    try {
      if (!number) {
        throw new Error('Number is required to find user');
      }

      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        'SELECT * FROM admin WHERE number = ?',
        [number]
      );
      connection.release();

      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(`Failed to find admin by number: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        'SELECT * FROM admin WHERE id = ?',
        [id]
      );
      connection.release();

      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(`Failed to find admin by ID: ${error.message}`);
    }
  }
}

module.exports = AdminModel;
