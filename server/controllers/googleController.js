const passport = require('passport');

class GoogleController {
  static googleLogin(req, res) {
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })(req, res);
  }

  static googleCallback (req, res) {
    passport.authenticate('google', {
      successRedirect: '/itemsPay',
      failureRedirect: '/'
    })(req, res);
  }
}

module.exports = GoogleController;