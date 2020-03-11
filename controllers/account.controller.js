const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports = {
  getAccount: (req, res) => {
    const { name, email, created } = res.locals.user;
    res.render('account', { title: 'Account Details', name, email, created });
  },
  updatePassword: (req, res) => {
    const email = req.user.email;
    const { updatePass, newPass } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('account', {
        errors: errors.array(),
        title: 'Account'
      });
    }

    User.findOne({ email }).then(curUser => {
      bcrypt
        .compare(updatePass, curUser.password)
        .then(isMatch => {
          if (isMatch) {
            return curUser;
          } else {
            throw err;
          }
        })
        .then(user => {
          // Hash the user password with salt of 12
          bcrypt.hash(newPass, 12).then(hash => {
            // Store updated hashed password in DB.
            user.password = hash;
            user.save();
            req.flash('success', 'Password updated successfully.');
            res.redirect('/account');
          });
        })
        .catch(() => {
          req.flash('error', 'Incorrect password, please try again.');
          res.redirect('/account');
        });
    });
  },
  deleteAccount: (req, res) => {
    const { id, email } = req.user;
    const deletePass = req.body.deletePass;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('account', {
        errors: errors.array(),
        title: 'Account'
      });
    }

    User.findOne({ email }).then(curUser => {
      bcrypt
        .compare(deletePass, curUser.password)
        .then(isMatch => {
          if (isMatch) {
            return curUser;
          } else {
            throw err;
          }
        })
        .then(user => {
          User.findByIdAndDelete(id).then(() => {
            req.flash('success', 'Account successfully deleted.');
            res.redirect('/');
          });
        })
        .catch(() => {
          req.flash('error', 'Incorrect password, please try again.');
          res.redirect('/account');
        });
    });
  }
};
