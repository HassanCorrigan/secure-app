module.exports = sessionOptions = {
  name: '__Secure-app',
  secret: process.env.COOKIE_SECRET,
  domain: 'localhost',
  proxy: true,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 2592000000,
    sameSite: true
  }
};

if (process.env.NODE_ENV === 'development') {
  sessionOptions.name = 'secure-app';
  sessionOptions.cookie.secure = false;
  sessionOptions.domain = 'localhost';
}
