var socket = io();
socket.on('connect', function() {
    console.log('Connected to server');
});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});
socket.on('newEmail', function(email) {
    console.log('New Email', email);
});
socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}:  ${message.text}`);
    jQuery('#messages').append(li);
});
socket.emit('createMessage', {
    from: 'Frank',
    text: 'HI'
}, function(data) {
    console.log('Got it', data);
});
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});
var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
    }, function() {
        alert('Unable to fetch location');
    });
});
