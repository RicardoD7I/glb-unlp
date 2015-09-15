define(['App', 'backbone', 'marionette', 'views/WelcomeView', 'views/ChatView', 'views/HeaderView', 'collections/MessageCollection', 'utils/cookies', 'socket.io'],
  function(App, Backbone, Marionette, WelcomeView, ChatView, HeaderView, MessageCollection, cookiesUtils, io) {
    return Backbone.Marionette.Controller.extend({
      initialize: function(options) {
        // Show the navBarView
        App.rootLayout.headerRegion.show(new HeaderView());

        // Initialize messages collection
        this.messageCollection = new MessageCollection();
      },

      setupSocket: function() {
        var that = this;

        //Set new socket.io connection
        App.socket = io();

        // Send login message
        App.socket.emit('message', {
          username: cookiesUtils.getCookie('logged'),
          isLogin: true
        });

        // Listen to broadcast channel
        App.socket.on('broadcast', function(msg) {
          that.messageCollection.add(msg);
        });
      },

      index: function() {
        // Show the login view
        var welcomeView = new WelcomeView();
        App.rootLayout.mainRegion.show(welcomeView);

        // Listen to the event of login:success
        this.listenTo(welcomeView, 'login:success', _.bind(function(params) {

          // Set new cookie and redirect to the chat view
          cookiesUtils.setCookie('logged', params.get('username'));
          App.appRouter.navigate('/chat', true);

          this.setupSocket();

        }, this));
      },

      main: function() {
        // Check if the user is logged
        if (!cookiesUtils.getCookie('logged')) {
          return App.appRouter.navigate('/', true)
        }

        if (!App.socket) this.setupSocket();

        // Show the chat view
        App.rootLayout.mainRegion.show(new ChatView({
          collection: this.messageCollection
        }));
      }
    });
  });