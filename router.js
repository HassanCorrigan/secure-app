const express = require('express');
const router = express.Router();

const indexController = require('./controllers/index.controller');
const signupController = require('./controllers/signup.controller');
const authController = require('./controllers/auth.controller');
const accountController = require('./controllers/account.controller');
const dashboardController = require('./controllers/dashboard.controller');

const { authenticateUser, ensureAuthenticated } = require('./helpers/auth');
const { recaptcha, checkRecaptcha } = require('./helpers/recaptcha');
const {
  validateSignup,
  validateLogin,
  validatePasswordUpdate,
  validateDeleteAccount
} = require('./helpers/validator');

router.use(express.urlencoded({ extended: true }));

// Main URL enpoints
router.get('/', indexController.home);
router.get('/about', indexController.about);

// Signup enpdpoints
router.get('/signup', recaptcha.middleware.render, signupController.getSignup);
router.post(
  '/signup',
  validateSignup(),
  recaptcha.middleware.verify,
  // checkRecaptcha,
  signupController.postSignup
);

// Auth endpoints
router.get('/login', recaptcha.middleware.render, authController.getLogin);
router.post(
  '/login',
  validateLogin(),
  recaptcha.middleware.verify,
  // checkRecaptcha,
  authenticateUser,
  authController.postLogin
);
router.get('/logout', authController.logOut);

// Account endpoints
router.get('/account', ensureAuthenticated, accountController.getAccount);
router.post(
  '/account/update',
  validatePasswordUpdate(),
  ensureAuthenticated,
  accountController.updatePassword
);
router.post(
  '/account/delete',
  validateDeleteAccount(),
  ensureAuthenticated,
  accountController.deleteAccount
);
router.get('/security', ensureAuthenticated, indexController.security);

// Dashboard endpoints
router.get('/dashboard', ensureAuthenticated, dashboardController.getDetails);

// 404 Page
router.get('*', indexController.pageNotFound);

module.exports = router;
