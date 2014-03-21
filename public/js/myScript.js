tool.minDistance = 10;
tool.maxDistance = 45;
var mouseRealse = false;
var path;
var gap = [];
var dis;
var newMiddle;

function onMouseDown(event) {
  path = new Path();
  path.fillColor = new Color({
    hue: Math.random() * 360,
    saturation: 1,
    brightness: 1
  });

  path.add(event.point);
  //path.prototype.mouseRealse = false;
  mouseRealse = false;
  path.fullySelected = true;
}

function onMouseDrag(event) {
  var step = event.delta / 2;
  gap.push(event.delta);
  step.angle += 90;

  var top = event.middlePoint + step;
  var bottom = event.middlePoint - step;

  path.add(top);
  path.insert(0, bottom);
  path.smooth();
  path.fullySelected = true;
}

function onMouseUp(event) {
  path.add(event.point);
  path.closed = true;
  path.smooth();
  path.fullySelected = true;
  //path.prototype.mouseRealse = true;
  mouseRealse = true;
  // for (var i = 0; i < path.segments.length; i++) {
  //   var textl = new PointText({
  //     point: path.segments[i].point,
  //     fontSize: 10,
  //     fillColor: 'black',
  //     content: i
  //   })
  // }
  //console.log(gap[0], gap[gap.length - 1]);
  dis = path.lastSegment.point - path.segments[path.segments.length /
    2 - 1].point;
}

function onFrame(event) {
  if (mouseRealse) {

    var newTop = path.segments[0].point - dis;
    var newBottom = path.segments[path.segments.length - 2].point - dis;

    path.insert(path.segments.length / 2 - 2, newTop);
    path.removeSegment(0);
    path.insert(path.segments.length / 2, newBottom);
    path.removeSegment(path.segments.length - 2);

    newMiddle = (path.segments[path.segments.length / 2].point + path.segments[
      path.segments.length / 2 - 2].point) / 2;
    //path.segments[path.segments.length / 2 - 1].point = newMiddle - gap[0];
    //console.log(path.segments[path.segments.length / 2 - 1].point, path.lastSegment
    //  .point);
    //console.log(path.segments[path.segments.length / 2 - 1].point);
    console.log(path.segments[path.segments.length / 2 - 1].point, path.segments[
      path.segments.length / 2 - 2].point);
    path.closed = true;
    path.smooth();
    for (var i = 0; i < path.segments.length; i++) {
      var textl = new PointText({
        point: path.segments[i].point,
        fontSize: 10,
        fillColor: 'black',
        content: i
      })
    }
  }
}