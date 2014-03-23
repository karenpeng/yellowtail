/*!
 * yellowtail - sio_routes.js
 * Copyright(c) 2013
 * Author: karen <karenpenglabs@gmail.com>
 */

'use strict';

var laptopId = [];

module.exports = function (sio) {
  var pageOpen = 0;
  sio.sockets.on('connection', function (socket) {
    pageOpen++;

    socket.emit('init', pageOpen);

    socket.broadcast.emit('in', pageOpen);

    socket.on('disconnect', function () {
      pageOpen--;
      socket.broadcast.emit('leave', pageOpen);
    });

    socket.on('deviceData', function (data) {
      if (!data.device) {
        laptopId.push(socket.id);
      }
    });

    socket.on('mobileWorm', function (data) {
      laptopId.forEach(function (id) {
        sio.sockets.socket(id).emit('hisMobileWorm', data);
      });
    });

    socket.on('laptopWorm', function (data) {
      laptopId.forEach(function (id) {
        if (id !== socket.id) {
          sio.sockets.socket(id).emit('hisLaptopWorm', data);
        }
      });
    });

  });
};