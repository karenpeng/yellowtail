var socket = io.connect('http://' + location.host);

socket.on('init', function (pageNum) {
  $('#pageOpen').html(pageNum.toString());
  $('#info').append('<div>I open this page at ' + new Date() + '</div>');
});

socket.on('in', function (pageNum) {
  $('#pageOpen').html(pageNum.toString());
  $('#info').append('<div>Someone open this page at ' + new Date() + '</div>');  
});
socket.on('leave', function (pageNum) {
  $('#pageOpen').html(pageNum.toString());
  $('#info').append('<div>Someone close this page at ' + new Date() + '</div>');  
});
