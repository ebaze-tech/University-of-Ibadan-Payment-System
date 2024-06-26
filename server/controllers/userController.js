const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

class UserController {
  static async register(req, res) {
    const {email, password, number, role} = req.body;

        // Validation for number length based on role
    if ((role === 'Student' && number.length !== 6) ||
      (role === 'Staff' && (number.length !== 4 && number.length !== 5)) ||
      (role === 'Admin' && number.length !== 8)) {
        return res.status(400).json({ message: 'Invalid number length for the given role.' });
    }

  try {
    // Validate number format and determine role
    let determinedRole;
    if (/^\d{6}$/.test(number)) {
      determinedRole = 'Student';
  } else if (/^\d{4,5}$/.test(number)) {
      determinedRole = 'Staff';
  } else if (/^\d{8}$/.test(number)) {
    determinedRole = 'Admin';
  } else {
      return res.status(400).json({ error: 'Invalid number format for the given role.' });
  }

  // Check if user already exists.
  let user = await User.findByEmail((email));
  if(user){
    return res.status(400).json({
      message: 'User with this email already exists.'
    })
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const userId = await User.create({
    email,
    password: hashedPassword,
    role: determinedRole,
    number
  });

  res.status(201).json({
    userId, message: 'User registered successfully.'
  });
  } catch(error){
    console.error(error);
    res.status(500).json({
      error: err.message
    });
  }
}

static async getUserById(req, res) {
  const userId = req.params.id;

  try{
    const user = await User.findById(userId);
    if(!user) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }
    res.status(200).json(user);
  } catch(error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
}
}

module.exports = UserController;