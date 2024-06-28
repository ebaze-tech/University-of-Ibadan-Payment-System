// const bcrypt = require('bcryptjs');
// const AdminModel = require('../models/adminModel');
// const passport = require('../config/passport-config');

// class AdminController {
//   static async register(req, res) {
//     const numberRegex = /^\d{8}/;
//     const { number, email, password } = req.body;
//     // Validate input from request body
//     if (!number || !email || !password) {
//       return res.status(400).json({
//         message: 'Input cannot be empty'
//       });
//     }

//     if (!numberRegex.test(number)) {
//       return res.status(400).json({
//         message: 'Wrong number length. Must be 8 digits.'
//       })
//     }

//     try {
//       // Check if user already exists
//       let user = await AdminModel.findByNumber(number);
//       if (user) {
//         return res.status(400).json({
//           message: 'User with this admin number already exists.'
//         })
//       };

//       let admin = await AdminModel.findByEmail(email);
//       if (admin) {
//         return res.status(400).json({
//           message: 'User with this email already exists.'
//         })
//       }

//       // Hash password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Create new admin user
//       const newAdmin = await AdminModel.create({
//         number,
//         email,
//         password: hashedPassword
//       });

//       res.status(201).json({
//         newAdmin,
//         message: 'Admin registration successful.'
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   static async login(req, res, next) {
//     passport.authenticate('local', (err, user, info) => {
//       if (err) {
//         return res.status(500).json({
//           error: err.message
//         })
//       }
//       if (!user) {
//         return res.status(401).json({
//           message: info.message
//         });
//       }
//       req.login(user, (err) => {
//         if (err) {
//           return res.status(500).json({
//             error: err.message
//           });
//         }
//         return res.status(200).json({
//           message: 'Login successful.',
//           user: {
//             id: user.id,
//             email: user.email
//           }
//         });
//       });
//     })(req, res, next);
//   }

//   static logout(req, res) {
//     req.logout((err) => {
//       if (err) {
//         return res.status(500).json({
//           error: err.message
//         });
//       }
//       res.status(200).json({
//         message: 'Logout successful.'
//       });
//     });
//   }
// }

// module.exports = AdminController;

const bcrypt = require('bcryptjs');
const AdminModel = require('../models/adminModel');
const passport = require('../config/passport-config');

class AdminController {
  static async register(req, res) {
    const { email, password, number } = req.body;

    try {
      // Validate input from request body
      if (!email || !password || !number) {
        return res.status(400).json({
          message: 'Email, password, and number are required.'
        });
      }

      const numberRegex = /^\d{8}$/;
      if (!numberRegex.test(number)) {
        return res.status(400).json({
          message: 'Wrong number length. Must be 8 digits.'
        });
      }

      // Check if user already exists
      let user = await AdminModel.findByNumber(number);
      if (user) {
        return res.status(400).json({
          message: 'User with this admin number already exists.'
        });
      }

      user = await AdminModel.findByEmail(email);
      if (user) {
        return res.status(400).json({
          message: 'User with this email already exists.'
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new admin user
      const newAdminId = await AdminModel.create({
        email,
        password: hashedPassword,
        number
      });

      res.status(201).json({
        newAdminId,
        message: 'Admin registration successful.'
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

module.exports = AdminController;
