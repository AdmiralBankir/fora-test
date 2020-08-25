const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const users = require('./src/server/users')();
const rooms = require('./src/server/rooms')();
let roomNumber = 0;

const port = 8000;

app.use(express.static(__dirname + '/build'));

const msgFromServer = (text, room) => {
  const date = new Date();
  const msg = {
    name: 'server',
    room: room,
    text: text,
    time: {
        hours: date.getHours(),
        minutes: date.getMinutes()
    }
  }

  return msg;
};


io.on('connection', socket => {

  // Добавляет новго пользователя, если такое имя уже есть, отправляет сообщение
  socket.on('newUser', data => {

    if (!data.name) {
      return;
    }
    
    if (users.getByName(data.name)) {
        socket.emit('userExists', data.name + ' username is taken! Try some other username.');
     } else {

      const user = {
        id: socket.id,
        name: data.name,
        rooms: [++roomNumber]
      }

      const room = {
        id: roomNumber,
        users: [user.name]
      }

      users.add(user);
      rooms.add(room);

      socket.join(roomNumber);
      socket.emit('userSet', {userId: socket.id, room});
     }  

  });

  // Отправка сообщений
  socket.on('createMessage', data => {
    io.to(data.room).emit('newMessage', data);
  });

  // Отправка приглашения в комнату
  socket.on('inviteUser', data => {
    const user = users.getByName(data.name);
    const room = rooms.get(data.room);

    if(!user) {
      socket.emit('userNotFound', {text: `Пользователя ${data.name} не существует`});
      return;
    }

    const isSender = (user.name === data.inviteFrom);
    const isExistInRoom = room.users.includes(user.name);

    if(!isSender && !isExistInRoom) {
      const room = rooms.get(data.room);
      const userSocket = io.sockets.connected[user.id];
      
      userSocket.join(data.room);
      user.rooms.push(data.room);
      room.users.push(user.name);

      userSocket.emit('newInvite', room);
      io.to(data.room).emit('userConnected', room);
      userSocket.broadcast.to(data.room).emit('newMessage', msgFromServer(`${user.name} присоединился`, data.room)); //Отправить сообщение о присоединении пользователя
      socket.emit('userNotFound', {text: ``});
    }
  });

  socket.on('disconnect', () => {
    const user = users.remove(socket.id);
    console.log('disconnect', user)
    if(user) {
      user.rooms.forEach((room) => {
        socket.broadcast.to(room).emit('userDisconnected', user.name);
        socket.broadcast.to(room).emit('newMessage', msgFromServer(`${user.name} вышел из комнаты`, room));
      });
    }
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});

