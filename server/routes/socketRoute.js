const express = require('express');
const router  = express.Router();

module.exports = function (io) {
    //Socket.IO
    io.on('connection', function (socket) {
        console.log('User has connected to Index');
        //ON Events

        //End ON Events
    });
    return router;
};