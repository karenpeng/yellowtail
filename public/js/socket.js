var socket = io.connect('http://' + location.host);

socket.on('init', function (pageNum) {
  var deviceData = {
    device: mobile
  };
  socket.emit("deviceData", deviceData);
});

socket.on('in', function (pageNum) {

});
socket.on('leave', function (pageNum) {

});