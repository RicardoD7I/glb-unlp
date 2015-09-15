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

        // Set model attributes
        this.model.set({
          username: $.trim(this.ui.username.val()),
          email: $.trim(this.ui.email.val())
        });

        // Validate model
        if (!this.model.isValid()) {
          this.ui.errorMessage[0].querySelector('span').innerHTML = this.model.validationError;
          this.ui.errorMessage.removeClass('hidden');
        } else {
          this.model.save(this.model.attributes, {
            error: function(error) {
              this.ui.errorMessage[0].querySelector('span').innerHTML = 'Ups! There was an error trying to login. Please try again';
              this.ui.errorMessage.removeClass('hidden');
            },
            success: function() {
              self.trigger('login:success', self.model);
            }
          });
        }
      }
    });
  });