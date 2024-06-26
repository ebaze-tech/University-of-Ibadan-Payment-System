const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const {User} = require('../models/userModel');
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      const {number, role, email, password} = req.body;

      // Find user by email and role
      const user = await User.findOne({
        email, number, role
      });
      if(!user){
        return done(null, false, {
          message: 'Incorrect email, number or role.'
        });
      }

      // Compare password
      const passwordMatch = await bcrypt.compare(passport, user.password);
      if(!passwordMatch){
        return done(null, false, {
          message: 'Incorrect password.'
        })};
      
        return done(null,user);
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }));