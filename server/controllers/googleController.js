const passport = require('passport');

class GoogleController {
  static googleLogin(req, res) {
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })(req, res);
  }

  static googleCallback (req, res) {
    passport.authenticate('google', {
      successRedirect: '/itemsPay', //Redirect on successful authentication.
      failureRedirect: '/' //Redirect on failure.
    })(req, res);
  }
}

module.exports = GoogleController;