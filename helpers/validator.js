const { check } = require('express-validator');

module.exports = {
  validateSignup: () => {
    return [
      check('name')
        .isLength({ min: 3 })
        .withMessage('Please enter a longer name.')
        .trim()
        .escape(),
      check('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .normalizeEmail()
        .trim()
        .escape(),
      check('password')
        .isLength({ min: 12 })
        .withMessage('Password must be at least 12 characters.')
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/
        )
        .withMessage(
          'Passwords must be at least 12 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.'
        )
        .custom((value, { req }) => {
          if (value !== req.body.password_confirmation) {
            throw new Error('The passwords do not match.');
          } else {
            return true;
          }
        })
        .trim()
        .escape()
    ];
  },
  validateLogin: () => {
    return [
      check('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .normalizeEmail()
        .trim()
        .escape(),
      check('password')
        .isLength({ min: 8 })
        .withMessage('Longer password is required.')
        .trim()
        .escape()
    ];
  },
  validatePasswordUpdate: () => {
    return [
      check('updatePass')
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/
        )
        .withMessage('Please enter a valid password.')
        .trim()
        .escape(),
      check('newPass')
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/
        )
        .withMessage(
          'Passwords must be at least 12 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.'
        )
        .custom((value, { req }) => {
          if (value !== req.body.newPassConfirmation) {
            throw new Error('The passwords do not match.');
          } else {
            return true;
          }
        })
        .trim()
        .escape()
    ];
  },
  validateDeleteAccount: () => {
    return [
      check('deletePass')
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/
        )
        .withMessage('Please enter a valid password.')
        .trim()
        .escape()
    ];
  },
  validateAddTask: () => {
    return [
      check('taskName')
        .not()
        .isEmpty()
        .withMessage('Please enter a task name.')
        .isString()
        .withMessage('Please enter a valid task.')
        .trim()
        .escape(),
      check('taskDetails')
        .isString()
        .withMessage('Please enter valid task details.')
        .trim()
        .escape()
    ];
  }
};
