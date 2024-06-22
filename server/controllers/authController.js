const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

class AuthController {
  static async login(req, res) {
    passport.authenticate('local', (err, user, info) => {
      if(err){
        return res.status(500).json({
          error: err.message
        });
        if(!user){
          return res.status(401).json({
            m
          })
        }
      }
    })
  }
}