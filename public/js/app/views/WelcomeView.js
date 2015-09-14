define(['App', 'marionette', 'models/userModel', 'text!templates/welcome.html'],
    function(App, Marionette, User, template) {
        //ItemView provides some default rendering logic
        return Marionette.ItemView.extend({
            //Template HTML string
            template: _.template(template),
            model: new User(),

            ui: {
                'submitButton': '.submitButton',
                'username': '.username',
                'email': '.email',
                'errorMessage': '.errorMessage'
            },

            events: {
                'click @ui.submitButton': 'clickedButton'
            },

            clickedButton: function(ev) {
                var self = this;

                this.model.set({
                    username: this.ui.username.val(),
                    email: this.ui.email.val()
                });

                if (!this.model.isValid()) {
                    this.ui.errorMessage[0].querySelector('span').innerHTML = this.model.validationError;
                    this.ui.errorMessage.removeClass('hidden');
                } else {
                    this.model.save(this.model.attributes, {
                        error: function(error) {
                            console.log(error);
                        },
                        success: function() {
                            self.trigger('login:success', self.model);
                        }
                    });
                }
            }
        });
    });