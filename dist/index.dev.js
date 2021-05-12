"use strict";

var express = require('express');

var app = express();

var http = require('http');

var server = http.createServer(app);

var _require = require("socket.io"),
    Server = _require.Server;

var io = new Server(server, {
  cors: {
    origin: "*"
  }
});
app.get('/', function (req, res) {
  res.send('<h1>Você acessou o Servidor pelo navegador. Deseja acessar o app? (Apenas local) <a href="http://192.168.100.10:8080">Clique aqui.</a></h1>');
});
io.on('connection', function (socket) {
  socket.on('chat message', function (obj) {
    io.emit('chat message', obj);
  });
});
server.listen(7777, function () {
  console.log('Servidor aberto em *:7777');
});