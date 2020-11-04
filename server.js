const express = require('express');
const path = require('path');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

var messages = [];

io.on('connection', socket => {
   console.log(`Socket Conectado: ${socket.id}`);

    socket.on('sendMessage', data => {
        messages.push(data);
    });
});

io.on('disconnected', socket => {
    console.log(`Socket Conexão encerrada ${socket.id}`)

    socket.on('sendMessage', data => {
        messages.push(data);
    })
})

server.listen(3000);

