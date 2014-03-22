/*!
 * yellowtail - sio_routes.js
 * Copyright(c) 2013
 * Author: karen <karenpenglabs@gmail.com>
 */

'use strict';

var firstId;

//simple example
module.exports = function (sio) {
  var pageOpen = 0;
  sio.sockets.on('connection', function (socket) {
    pageOpen++;
    if (pageOpen === 1) {
      firstId = socket.id;
      console.log("first is", firstId);
    }
    socket.on('myWorm', function (data) {
      sio.sockets.socket(firstId).emit('hisWorm', data);
      console.log("received!");
    });
    socket.on('hisWorm', function (data) {
      console.log(data);
    });

    socket.emit('init', pageOpen);

    socket.broadcast.emit('in', pageOpen);

    socket.on('disconnect', function () {
      pageOpen--;
      if (pageOpen === 0) {
        firstId = null;
      }
      socket.broadcast.emit('leave', pageOpen);
    });
  });
};