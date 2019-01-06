var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var config = require('./config/init');
var routes = require('./routes/routes');
config.setup(app);
app.use(express.static('public'));
app.use('/', routes.index);
io.on('connection', function (socket) {
  socket.on('append-comment', function (route) {
    io.emit("append-comment", route);
  });
});
http.listen(3000, function () {
  console.log("Server started on port 3000");
});