define(['App', 'marionette', 'text!templates/message.html'],
  function(App, Marionette, template) {
    //ItemView provides some default rendering logic
    return Marionette.ItemView.extend({
      //Template HTML string
      template: _.template(template)
    });
  });