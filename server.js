const mysql      = require('mysql');

// Подключаемся к mysql
const db = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'homestead',
    password : 'secret',
    database : 'homestead',
});

db.connect(function(err){
    if (err) console.log(err)
})

let queue = [];

const io = require('socket.io')();

io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval, id) => {
        console.log('client is subscribing to timer with interval ', interval, ' id ', id);
        db.query('SELECT * FROM queue')
            .on('result', function (data) {
                queue.push(data);
            }).on('end', function(){
            setInterval(() => {
                client.emit('timer', queue );
            }, interval);
        })
    })

    });



const port = 8000;
io.listen(port);
console.log('listening on port ', port);