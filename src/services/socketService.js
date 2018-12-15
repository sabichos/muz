import io from 'socket.io-client';

const socket = io('http://localhost:8080');

function subscribeToNitification(cb) {
    socket.on('playing', notification => cb(null, notification));
}

function notify(notification) {
    socket.emit('notify', notification);
}
export { subscribeToNitification, notify };

