const mysql = require('mysql');

// Подключаемся к mysql
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'homestead',
    password: 'secret',
    database: 'homestead',
});

db.connect(function (err) {
    if (err) console.log(err)
});

let queue = [];

const io = require('socket.io')();

io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
        setInterval(() => {
            client.emit('timer');
        }, interval);
    });

});


const port = 8000;
io.listen(port);
console.log('listening on port ', port);