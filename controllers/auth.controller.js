const User = require('../models/User');
const { validationResult } = require('express-validator');

module.exports = {
  getLogin: (req, res) => {
    if (req.isAuthenticated()) {
      req.flash('error', 'You are already logged in.');
      res.redirect('/dashboard');
    } else {
      res.render('login', { title: 'Login', captcha: res.recaptcha });
    }
  },
  postLogin: (req, res) => {
    const email = req.body.email;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('login', {
        errors: errors.array(),
        title: 'Login',
        email
      });
    }
    // Set the last known login from this account
    User.findOne({ email }).then(user => {
      user.last_login = user.current_login;
      user.current_login = Date.now();
      user.save();
    });
    res.redirect('/dashboard');
  },
  logOut: (req, res) => {
    req.logout();
    res.redirect('/');
  }
};
