import io from 'socket.io-client';

const socket = io.connect('http://localhost:8080');

function subscribeToNitification(cb) {
    socket.on('playing', notification => cb(notification));
}

function notify(notification) {
    socket.emit('notify', notification);
}
export { subscribeToNitification, notify };

