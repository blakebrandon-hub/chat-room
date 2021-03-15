//Connect socket
//const socket = io.connect('http://0.0.0.0:5000');

var socket = io();
var el;

socket.on('time', function(timeString) {
  el = document.getElementById('server-time')
  el.innerHTML = 'Server time: ' + timeString;
});

//Get DOM elements
var message = document.getElementById('message');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var users = document.getElementById('users-online')

//Emit Events
if (name == ''){
  var name = prompt('What is your name?');
  socket.emit('username', {username: name});
};

btn.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    username: name
  });
});

message.addEventListener('keypress', function(){
  socket.emit('typing', {username: name})
});

//Listen for Events
socket.on('chat', function(data){;
  feedback.innerHTML = ''
  output.innerHTML += '<p><b>' + data.username + '</b>: ' + data.message + '</p>'
  message.value = '';
});

socket.on('username', function(data){
  output.innerHTML += '<p><b>' + data.username + '</b> entered the room</p>'
});

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data.username + ' is typing a message...</em></p>';
});
