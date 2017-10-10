const path = require('path');
const http = require('http');
//need to use http with socket.io
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    socket.on('createMessage', (message,callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is a message from the server');
        // socket.broadcast.emit('newMessage', {
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        // });
        //sends to everyone but this socket
        });
    socket.on('disconnect', () => {
        console.log('User was Disconnected');
});
});



server.listen(port, () => {
    console.log(`You are up on port ${port}`);
});
