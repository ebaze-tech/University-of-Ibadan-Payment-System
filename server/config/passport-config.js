const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const AdminModel = require('../models/adminModel');
const StudentModel = require('../models/studentModel');
const StaffModel = require('../models/staffModel');

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      // Attempt to find the user in Admin, Student, and Staff models
      let user = await AdminModel.findByEmail(email);
      if (!user) {
        user = await StudentModel.findByEmail(email);
      }
      if (!user) {
        user = await StaffModel.findByEmail(email);
      }

      // If user is not found in any model
      if (!user) {
        return done(null, false, {
          message: 'Incorrect email.'
        });
      }
      
      // Compare password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false, {
          message: 'Incorrect password.'
        })
      };

      // Authentication successful
      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error);
    }

  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await AdminModel.findById(id) || await StudentModel.findById(id) || await StaffModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
})

module.exports = passport;