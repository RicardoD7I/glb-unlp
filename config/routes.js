var mongoose = require('mongoose');
var home = require('../app/controllers/home');

module.exports = function (app) {

  app.get('/', home.index);

  app.post('/login', home.login);

  app.use(function (req, res, next) {
    res.redirect('/');
  });
};
