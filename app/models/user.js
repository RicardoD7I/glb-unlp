var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User schema
 */
var UserSchema = new Schema({
	username: {
		type: String,
		default: '',
		required: true
	},
	email: {
		type: String,
		default: '',
		required: true
	}
});

var User = mongoose.model('User', UserSchema);

User.schema.path('email').validate(function (value) {
	var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

  return emailRegex.test(value);
}, 'Invalid email');

module.exports = User;

