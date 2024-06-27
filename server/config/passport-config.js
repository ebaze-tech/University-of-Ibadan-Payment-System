const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      // Find user by email
      const user = await UserModel.findByEmail(email);

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
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
})

module.exports = passport;