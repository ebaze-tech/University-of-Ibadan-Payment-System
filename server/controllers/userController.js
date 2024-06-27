const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');

class UserController {
  static async register(req, res) {
    const { email, password, number } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    try {

      // Check if user already exists.
      let user = await UserModel.findByEmail((email));
      if (user) {
        return res.status(400).json({
          message: 'User with this email already exists.'
        })
      }

      // Validate the number length
      if (![4, 5, 6, 8].includes(number.length)) {
        return res.status(400).json({
          message: 'Invalid number length. Must be 4, 5, 6, or 8 characters.'
        });
      }

      // Create user
      const newUser = await UserModel.create({
        email,
        password: hashedPassword,
        number
      });

      res.status(201).json({
        newUser, message: 'User registered successfully.'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: err.message
      });
    }
  }
}

module.exports = UserController;