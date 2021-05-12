const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

app.get('/', (req, res) => {
  res.send('<h1>Você acessou o Servidor pelo navegador. Deseja acessar o app? (Apenas local) <a href="http://192.168.100.10:8080">Clique aqui.</a></h1>');
});

io.on('connection', (socket) => {
  console.log('Alguém conectou.')
  socket.on('chat message', (obj) => {
    obj.time = new Date().getTime()
    io.emit('chat message', obj);
  });
  socket.on('delete message', (id) => {
    io.emit('delete message', id)
  })
});

server.listen(7777, () => {
  console.log('Servidor aberto em *:7777');
});