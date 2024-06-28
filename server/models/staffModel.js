// const pool = require('../config/db');

// class StaffModel {
//     static async create({
//         email, password, number
//     }) {
//         // Validate the number input
//         const numberRegex = /^\d{4,5}/;
//         if (!numberRegex.test(number)) {
//             return res.status(400).json({
//                 message: 'Wrong number input. Must be 8 digits long.'
//             })
//         }

//         let connection;
//         try {
//             connection = await pool.getConnection();
//             const [rows] = await connection.execute(
//                 'INSERT INTO staff (email, password, number) VALUES (?,?,?)',
//                 [email, password, number,

//                 ]
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
//                 'SELECT * FROM staff WHERE email = ?',
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
//                 'SELECT * FROM staff WHERE number = ?',
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
//                 'SELECT * FROM staff WHERE id = ?',
//                 [id]
//             );
//             return rows.length > 0 ? rows[0] : null;
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }
// }

// module.exports = StaffModel;


const pool = require('../config/db');

class StaffModel {
    static async create({ email, password, number }) {
        // Validate the number input
        const numberRegex = /^\d{4,5}$/;
        if (!numberRegex.test(number)) {
            throw new Error('Wrong number input. Must be 4 or 5 digits long.');
        }

        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                'INSERT INTO staff (email, password, number) VALUES (?,?,?)',
                [email, password, number]
            );
            connection.release();
            
            return rows.insertId;
        } catch (error) {
            throw new Error(`Failed to create staff: ${error.message}`);
        }
    }

    static async findByEmail(email) {
        if (!email) {
            throw new Error('Email is required to find user.');
        }

        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                'SELECT * FROM staff WHERE email = ?',
                [email]
            );
            connection.release();
            
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Failed to find staff by email: ${error.message}`);
        }
    }

    static async findByNumber(number) {
        if (!number) {
            throw new Error('Number is required to find user');
        }

        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                'SELECT * FROM staff WHERE number = ?',
                [number]
            );
            connection.release();
            
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Failed to find staff by number: ${error.message}`);
        }
    }

    static async findById(id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(
                'SELECT * FROM staff WHERE id = ?',
                [id]
            );
            connection.release();
            
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Failed to find staff by ID: ${error.message}`);
        }
    }
}

module.exports = StaffModel;
