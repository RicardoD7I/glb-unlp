define(['App', 'backbone', 'marionette', 'views/WelcomeView', 'views/ChatView', 'views/HeaderView', 'collections/MessageCollection', 'utils/cookies'],
  function(App, Backbone, Marionette, WelcomeView, ChatView, HeaderView, MessageCollection, cookiesUtils) {
    return Backbone.Marionette.Controller.extend({
      initialize: function(options) {
        App.rootLayout.headerRegion.show(new HeaderView());
      },

      index: function() {
        var welcomeView = new WelcomeView();
        App.rootLayout.mainRegion.show(welcomeView);
        this.listenTo(welcomeView, 'login:success', _.bind(function(params) {
          cookiesUtils.setCookie('logged', params.username);
          App.appRouter.navigate('/chat', true);
        }, this));
      },

      main: function() {

        if (cookiesUtils.getCookie('logged') === '') {
          return App.appRouter.navigate('/chat', true)
        }


        setTimeout(function() {
          messageCollection.add({
            username: 'Ricardo',
            message: 'Contestaaa!!!'
          });
        }, 1000);
        
        var messages = [{
          username: 'Ricardo',
          message: 'Buen día!'
        }, {
          username: 'Tomas',
          message: 'Buenas'
        }];

        var messageCollection = new MessageCollection(messages);
        App.rootLayout.mainRegion.show(new ChatView({
          collection: messageCollection
        }));
      }
    });
  });