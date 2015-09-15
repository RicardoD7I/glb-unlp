define(['App', 'marionette', 'views/MessageView', 'text!templates/chat.html', 'utils/cookies'],
  function(App, Marionette, messageView, template, cookiesUtils) {
    //ItemView provides some default rendering logic
    return Marionette.CompositeView.extend({
      //Template HTML string
      template: _.template(template),
      className: 'chat-view',
      childView: messageView,
      childViewContainer: '.list-group',

      ui: {
        'sendMessageButton': '.js-send-message-btn',
        'messageInput': '.js-message-input'
      },

      events: {
        'click @ui.sendMessageButton': 'clickedButton',
        'keyup @ui.messageInput': 'clickedButton'
      },

      clickedButton: function(ev) {
        if (ev.keyCode && ev.keyCode !== 13) return false;

        // Check if the user is logged
        if (!cookiesUtils.getCookie('logged')) {
          return App.appRouter.navigate('/', true)
        }

        // Send message to the server
        App.socket.emit('message', {
          username: cookiesUtils.getCookie('logged'),
          message: this.ui.messageInput.val()
        });

        this.ui.messageInput.val('');

        return false;
      }
    });
  });