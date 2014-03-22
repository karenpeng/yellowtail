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
    if (pageOpen === 0) {
      firstId = socket.id;
    }
    socket.on('myWorm', function (data) {
      sio.sockets.socket(firstId).emit('hisWorm', data);
      console.log("received!");
    });

    pageOpen++;
    socket.emit('init', pageOpen);

    socket.broadcast.emit('in', pageOpen);

    socket.on('disconnect', function () {
      firstId = null;
      pageOpen--;
      socket.broadcast.emit('leave', pageOpen);
    });
  });
};