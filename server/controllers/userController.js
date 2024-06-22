const bcrypt = require('bcryptjs');
const User = require('../models/user');

class UserController {
  static async register(req, res) {
    const {email, password, number, role} = req.body;

  try {
    // Validate number format and determine role
    let role;
    if (/^\d{6}$/.test(number)) {
      role = 'Student';
  } else if (/^\d{4,5}$/.test(number)) {
      role = 'Staff';
  } else if (/^\d{8}$/.test(number)) {
      role = 'Admin';
  } else {
      return res.status(400).json({ error: 'Invalid number format' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const userId = await User.create({
    email, password: hashedPassword, role, number
  });

  res.status(201).json({
    userId, message: 'User registered successfully.'
  });
  } catch(error){
    console.error(error);
  }
}
}

module.exports = UserController;