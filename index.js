const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
    console.log(new Date(),'a user connected');
    socket.on('disconnect', () => {
      console.log(new Date(),'user disconnected');
    });
  });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
    console.log(new Date(),'message: ' + msg);
});
});
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
server.listen(3000, () => {
  console.log('listening on *:3000');
});