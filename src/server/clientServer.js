import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000/');

const registerNewUser = (login, room) => {
    socket.emit('newUser', {name: login, room: room});
    return new Promise((resolve, reject) => {
        socket.on('userExists', (err) => {
            reject(err);
        });
        socket.on('userSet', (userId) => {
            resolve(userId);
        });
    });
};

const sendMessage = (msg) => {
    socket.emit('createMessage', msg);
};

const getSocket = () => {
    return socket;
}

const inviteUser = (invite) => {
    socket.emit('inviteUser', invite);
};

const recieveInvite = () => {
    return new Promise((resolve, reject) => {
        socket.on('newInvite', (data) => {
            resolve(data);
        })
    })
};

export { registerNewUser, sendMessage, inviteUser, recieveInvite, getSocket }