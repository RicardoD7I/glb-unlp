define(['App', 'marionette', 'views/MessageView', 'text!templates/chat.html'],
    function(App, Marionette, messageView, template) {
        //ItemView provides some default rendering logic
        return Marionette.CompositeView.extend({
            //Template HTML string
            template: _.template(template),
            className: 'chat-view',
            childView: messageView,
            childViewContainer: '.list-group',

            ui: {
            },

            events: {
            },

            clickedButton: function(ev) {
               
            }
        });
    });