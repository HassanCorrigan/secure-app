const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./config/database');
const middleware = require('./middleware');

const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set View engine
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
  })
);
app.set('view engine', 'hbs');

// Include Middleware
app.use(middleware);

// Set local variables
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.error_msg = req.flash('error');
  res.locals.success_msg = req.flash('success');
  res.locals.errors = req.flash('errors');
  res.locals.user = req.user || 'undefined';
  next();
});

// Enable Router
app.use(require('./router'));

// Connect to Database
mongoose
  .connect(db.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: db.dbName
  })
  .then(() => console.log('Database connected...'))
  .catch(err => console.log(err));

// Set server port
const port = process.env.PORT || 8008;

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));
