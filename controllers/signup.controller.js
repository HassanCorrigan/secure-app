const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports = {
  getSignup: (req, res) => {
    if (req.isAuthenticated()) {
      req.flash('error', 'You are already logged in.');
      res.redirect('/dashboard');
    } else {
      res.render('signup', { title: 'Signup', captcha: res.recaptcha });
    }
  },
  postSignup: (req, res, next) => {
    const { name, email, password, password_confirmation } = req.body;
    const errors = validationResult(req);

    User.findOne({ email }).then(user => {
      if (user) {
        return res.render('signup', {
          error_msg: 'Account with the email already exists.',
          title: 'Signup',
          name,
          email,
          password,
          password_confirmation
        });
      }
      if (!errors.isEmpty()) {
        return res.render('signup', {
          errors: errors.array(),
          title: 'Signup',
          name,
          email,
          password,
          password_confirmation
        });
      }

      const newUser = new User({
        name,
        email,
        password
      });

      // Hash the user password with salt of 12
      bcrypt.hash(newUser.password, 12).then(hash => {
        // Store hash in DB.
        newUser.password = hash;

        newUser.save(error => {
          if (error) throw error;
          // Log in user
          req.logIn(newUser, err => {
            if (err) {
              return next(err);
            } else {
              req.flash('success', 'Account successfully created.');
              res.redirect('dashboard');
            }
          });
        });
      });
    });
  }
};
