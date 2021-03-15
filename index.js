const express = require('express');
const app = express();
const socket = require('socket.io');

var port = process.env.PORT || 5000;

const server = app.listen(port, '0.0.0.0');
                          
//Static files
app.use(express.static('public'));

//Socket Setup
const io = socket(server);

io.on('connection', function(socket){

  console.log(socket.client.conn.server.clientsCount + " users connected");

  socket.on('username', function(data){
    io.sockets.emit('username', data)
  });

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data)
  });

});
