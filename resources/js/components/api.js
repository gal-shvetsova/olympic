import openSocket from 'socket.io-client';
const socket = openSocket('http://olympic.test:8000');

export function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
}

export function unsubscribeToTimer() {
    socket.off('timer');
}
