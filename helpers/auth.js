const passport = require('../config/passport');

module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error', 'Please login to view that page.');
    res.redirect('/login');
  },

  authenticateUser: passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  })
};
