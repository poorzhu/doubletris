const path = require('path'); // new
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 2000; // new
const Game = require('./game');
const Player = require('./player');

const game = new Game();
const socketList = {}; // game.socketList?

// new
// if (process.env.NODE_ENV === 'production') {
//   app.use('/client', express.static(__dirname + '/client'));
//   app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/client/index.html');
//   });
// }

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));
server.listen(port);

io.on('connection', socket => {
  socket.id = Object.keys(game.players).length + 1;
  socketList[socket.id] = socket;

  game.players[socket.id] = new Player();

  socket.on('keyPress', data => {
    if (data.inputId === '1left') game.players[socket.id].pressingLeft = data.state;
    if (data.inputId === '1right') game.players[socket.id].pressingRight = data.state;
    if (data.inputId === '1up') game.players[socket.id].pressingUp = data.state;
    if (data.inputId === '1down') game.players[socket.id].pressingDown = data.state;
  });

  socket.on('disconnect', () => {
    delete socketList[socket.id];
    delete game.players[socket.id];
  });

});

setInterval(() => {
  game.update();
  const pack = { game };

  for (let i in socketList) {
    socketList[i].emit('pack', pack);
  }
}, 1000 / 20);
