const router = require('express').Router();
const crypto = require('crypto');
const passport = require('passport');
const session = require('express-session');
const helmet = require('helmet');
const flash = require('connect-flash');
const morgan = require('morgan');

const helmetOptions = require('./config/helmet');
const sessionOptions = require('./config/session');
const winston = require('./config/winston');

router.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});

// Security headers middleware
router.use(helmet(helmetOptions));

// Passport middleware
router.use(session(sessionOptions));
router.use(passport.initialize());
router.use(passport.session());

// Flash message middleware
router.use(flash());

// Run logger if in production mode
if (process.env.NODE_ENV === 'production') {
  router.use(morgan('combined', { stream: winston.stream }));
}

module.exports = router;
