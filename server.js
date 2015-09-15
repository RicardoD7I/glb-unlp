var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/config');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

// Connect to mongodb
var connect = function() {
  var options = {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  };
  mongoose.connect(config.db, options);
};
connect();

io.on('connection', function(socket) {
  socket.on('message', function(msg) {
    io.emit('broadcast', msg);
  });
});

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function(file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap application settings
require('./config/express')(app);

// Bootstrap routes
require('./config/routes')(app);

http.listen(port);
console.log('Express app started on port ' + port);