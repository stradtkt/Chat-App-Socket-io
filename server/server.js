const path = require('path');
const http = require('http');
//need to use http with socket.io
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('newMessage', {
        from: 'Kevin',
        text: 'See you then',
        createdAt: 123123
    });
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        });
    socket.on('disconnect', () => {
        console.log('User was Disconnected');
});
});



server.listen(port, () => {
    console.log(`You are up on port ${port}`);
});
