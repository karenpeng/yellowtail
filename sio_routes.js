/*!
 * yellowtail - sio_routes.js
 * Copyright(c) 2013
 * Author: karen <karenpenglabs@gmail.com>
 */

'use strict';

//simple example
module.exports = function (sio) {
  var pageOpen = 0;
  sio.sockets.on('connection', function (socket) {
    if (pageOpen === 0) {
      var firstId = socket.id;
    }
    console.log('SOCKET ID ' + socket.id);
    socket.on('myWorm', function (data) {
      sio.sockets.socket(firstId).emit('hisWorm', data);
      console.log("yeah!");
    });

    pageOpen++;
    socket.emit('init', pageOpen);

    socket.broadcast.emit('in', pageOpen);

    socket.on('disconnect', function () {
      pageOpen--;
      socket.broadcast.emit('leave', pageOpen);
    });
  });
};