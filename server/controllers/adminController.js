const bcrypt = require('bcryptjs');
const AdminModel = require('../models/adminModel');

class AdminController {
  static async register(req, res) {
    const numberRegex = /^d{8}/;
    const {number, email, password} = req.body;
    // Validate input from request body
    if(!number || !email || !password) {
      return res.status(400).json({
        message: 'Input cannot be empty'
      });
    }

    if (![8].includes(number.length)) {
      return res.status(400).json({
        message: 'Invalid admin number length.'
      });
    }    

    if (numberRegex.test(number)) {
      return res.status(400).json({
        message: 'Wrong number length. Must be 8 digits.'
      })
    }

    try {
      // Check if user already exists
      let user = await AdminModel.findByNumber(number);
      if(user){
        return res.status(400).json({
          message: 'User with this admin number already exists.'
        })
      };

      let admin = await AdminModel.findByEmail(email);
      if(admin){
        return res.status(400).json({
          message: 'User with this email already exists.'
        })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new admin user
      const newAdmin = await AdminModel.create({
        number,
        email,
        password: hashedPassword
      });

      res.status(201).json({
        newStaffId,
        message: 'Admin registration successful.'
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = AdminController;