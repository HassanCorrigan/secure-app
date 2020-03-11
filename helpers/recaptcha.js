const Recaptcha = require('express-recaptcha').RecaptchaV2;

const recaptcha = new Recaptcha(
  process.env.RECAPTCHA_SITE_KEY,
  process.env.RECAPTCHA_SECRET_KEY
);

const checkRecaptcha = (req, res, next) => {
  if (req.recaptcha.error) {
    req.flash('error', 'Please complete the reCaptcha.');
    res.redirect(req.path);
  } else {
    next();
  }
};

module.exports = { recaptcha, checkRecaptcha };
