const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

app.get('/', (req, res) => {
  res.send('<h1>Você acessou o Servidor pelo navegador.</h1>');
});
app.get('/client', (req, res) => {
  res.sendFile('./cliente-interno/index.html');
})

io.on('connection', (socket) => {
  console.log('Alguém conectou:')
  console.log(socket.handshake.headers)
  socket.on('chat message', (obj) => {
    obj.time = new Date().getTime()
    console.log(obj);
    io.emit('chat message', obj);
  });
  socket.on('delete message', (id) => {
    io.emit('delete message', id)
  })
});

server.listen(80, () => {
  console.log('Servidor aberto em *:80');
});