const passport = require('../config/passport-config');

class AuthController {
  static async login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }
      if (!user) {
        return res.status(401).json({
          message: info.message
        });
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({
            error: err.message
          });
        }
        return res.status(200).json({
          message: 'Login successful.',
          user: {
            id: user.id,
            email: user.email
          }
        });
      });
    })(req, res, next);
  }

  static logout(req, res) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }
      res.status(200).json({
        message: 'Logout successful.'
      });
    });
  }
}

module.exports = AuthController;