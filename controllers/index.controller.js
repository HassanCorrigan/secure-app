// Controllers
module.exports = {
  home: (req, res) => {
    res.render('home', { title: 'Home', name: res.locals.user.name });
  },
  about: (req, res) => {
    res.render('about', { title: 'About', name: res.locals.user.name });
  },
  security: (req, res) => {
    const { name, last_login } = res.locals.user;
    res.render('security', { title: 'Security Settings', name, last_login });
  },
  pageNotFound: (req, res) => {
    res.status(404).render('404', { title: '404' });
  }
};
