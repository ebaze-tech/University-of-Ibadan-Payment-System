// const bcrypt = require('bcryptjs');
// const StudentModel = require('../models/studentModel');
// const passport = require('../config/passport-config');

// class StudentController {
//     static async register(req, res) {
//         const { email, password, number } = req.body;
//         // Validate the number length
//         const numberRegex = /^\d{6}/;
//         if (!numberRegex.test(number)) {
//             return res.status(400).json({
//                 message: 'Wrong number input. Must be 6 digits long.'
//             })
//         }


//         try {
//             // Check if user already exists.
//             let user = await StudentModel.findByEmail(email);
//             if (user) {
//                 return res.status(400).json({
//                     message: 'User with this email already exists.'
//                 })
//             };
//             // Hash password
//             const hashedPassword = await bcrypt.hash(password, 10);

//             // Create user
//             const newStudent = await StudentModel.create({
//                 email,
//                 password: hashedPassword,
//                 number
//             });

//             res.status(201).json({
//                 newStudent,
//                 message: 'User registered successfully.'
//             });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({
//                 error: error.message
//             });
//         }
//     }

//     static async login(req, res, next) {
//         passport.authenticate('local', (err, user, info) => {
//             if (err) {
//                 return res.status(500).json({
//                     error: err.message
//                 })
//             }
//             if (!user) {
//                 return res.status(401).json({
//                     message: info.message
//                 });
//             }
//             req.login(user, (err) => {
//                 if (err) {
//                     return res.status(500).json({
//                         error: err.message
//                     });
//                 }
//                 return res.status(200).json({
//                     message: 'Login successful.',
//                     user: {
//                         id: user.id,
//                         email: user.email
//                     }
//                 });
//             });
//         })(req, res, next);
//     }

//     static logout(req, res) {
//         req.logout((err) => {
//             if (err) {
//                 return res.status(500).json({
//                     error: err.message
//                 });
//             }
//             res.status(200).json({
//                 message: 'Logout successful.'
//             });
//         });
//     }
// }

// module.exports = StudentController;



const bcrypt = require('bcryptjs');
const StudentModel = require('../models/studentModel');
const passport = require('../config/passport-config');

class StudentController {
    static async register(req, res) {
        const { email, password, number } = req.body;
        
        try {
            // Validate the number length
            const numberRegex = /^\d{6}$/;
            if (!numberRegex.test(number)) {
                return res.status(400).json({
                    message: 'Wrong number input. Must be 6 digits long.'
                });
            }

            // Check if user already exists.
            let user = await StudentModel.findByEmail(email);
            if (user) {
                return res.status(400).json({
                    message: 'User with this email already exists.'
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const newStudentId = await StudentModel.create({
                email,
                password: hashedPassword,
                number
            });

            res.status(201).json({
                newStudentId,
                message: 'User registered successfully.'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: error.message
            });
        }
    }

    static async login(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            if (!user) {
                return res.status(401).json({
                    message: info.message
                });
            }
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }
                return res.status(200).json({
                    message: 'Login successful.',
                    user: {
                        id: user.id,
                        email: user.email
                    }
                });
            });
        })(req, res, next);
    }

    static logout(req, res) {
        req.logout((err) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            res.status(200).json({
                message: 'Logout successful.'
            });
        });
    }
}

module.exports = StudentController;
