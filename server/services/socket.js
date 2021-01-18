const log = require('../helpers/log-messages');

const users = require('../services/users');

let rooms = ['Clarion'];

module.exports = function (io) {
    io.on('connection', (client) => {
        log.inform('socket connection open')

        client.on('addUser', function (name, cb) {

            try {
                client.name = name;
                users.add(name)

                client.room = 'Lobby';
                client.join('Lobby');
                client.broadcast.to('Lobby').emit('updateUsers', users);
                client.broadcast.to('Lobby').emit('join', name);

                log.success('Added new user: ' + name);
                cb(null, name);
            } catch (error) {
                log.error('Error adding new user: ' + name);
                cb('error', error);
            }

            //socket.emit('updatechat', 'SERVER', 'you have connected to Lobby');
            //socket.broadcast.to('Lobby').emit('updatechat', 'SERVER', username + ' has connected to this room');
            //socket.emit('updaterooms', rooms, 'Lobby');

        });

        client.on('disconnect', (reason) => {
            console.log(reason)
            console.log('just disconnected ' + client.name)

            // user has disconnected
            if (client.name) {
                const newUserList = users.filter((user) => user && user.username && user.username !== client.name);
                client.broadcast.to('Lobby').emit('updateUsers', newUserList);
                
            }

        });


    });

    var room = io.sockets.in('Lobby');

    room.on('join', function (name) {

        console.log('Someone joined the room. ' + name)
    });
    room.on('leave', function () {
        console.log("Someone left the room.");
    });
}
