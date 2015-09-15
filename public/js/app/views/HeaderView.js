define([ 'marionette', 'text!templates/header.html', 'utils/cookies'],
    function (Marionette, template, cookiesUtils) {
        //ItemView provides some default rendering logic
        return Marionette.ItemView.extend({
            template: _.template(template),

            ui: {
              'logoutBtn': '.js-logout-btn',
            },

            events: {
              'click @ui.logoutBtn': 'logout',
            },

            logout: function() {
              cookiesUtils.deleteCookie('logged');
            }
        });
    });