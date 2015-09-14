define(["jquery", "backbone"],
  function($, Backbone) {

    var User = Backbone.Model.extend({

      // Default values for all of the Model attributes
      defaults: {
        username: '',
        message: ''
      },

      // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
      validate: function(attrs) {}
    });

    return User;
  }
);