const User = require('../models/User');

module.exports = {
  getDetails: (req, res) => {
    const email = req.user.email;
    User.findOne({ email })
      .then(user => {
        res.render('dashboard', {
          title: 'Dashboard',
          name: user.name,
          email: user.email
        });
      })
      .catch(err => console.log(err));
  }
};
