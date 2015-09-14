var User = require('../models/user');

exports.index = function (req, res) {
  res.render('home/index', {
    title: 'Node Express Mongoose Boilerplate'
  });
};

exports.login = function (req, res) {
	var user = new User(req.body);
	user.save(function(err) {
		console.log(err);
		if (err) {
			res.send(500);
		} else {
			res.send(200, {
				message: 'OK'
			});
		}
	});
};
