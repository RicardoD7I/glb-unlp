define(["jquery", "backbone"],
    function($, Backbone) {

        var User = Backbone.Model.extend({

            // Default values for all of the Model attributes
            defaults: {
                username: '',
                email: ''
            },

            url: '/login',

            // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {
                var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
                if (!attrs.username) {
                    return 'Username can not be empty';
                }
                if (!attrs.email) {
                    return 'Email can not be empty';
                }
                if (!emailRegex.test(attrs.email)) {
                    return 'Invalid email format';
                }
            }
        });

        return User;
    }
);