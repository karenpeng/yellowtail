tool.minDistance = 10;
tool.maxDistance = 45;
var mouseRealse = false;
var path;
var gap = [];
var dis;
var newMiddleF, newMiddleB;
var countPoint = [];

function onMouseDown(event) {
  gap = [];
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
  countPoint.push(event.point);
}

function onMouseDrag(event) {
  if (gap.length < 1) {
    console.log("yeah!!!");
  }
  var step = event.delta / 2;
  gap.push(event.delta);
  countPoint.push(event.point);
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
  countPoint.push(event.point);
  //gap.push(event.delta);
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
  console.log(gap.length, countPoint.length);
}

function onFrame(event) {
  if (mouseRealse) {

    var newTop = path.segments[0].point - dis;
    var newBottom = path.segments[path.segments.length - 2].point - dis;

    path.insert(path.segments.length / 2 - 1, newTop);
    path.removeSegment(0);
    path.insert(path.segments.length / 2, newBottom);
    path.removeSegment(path.segments.length - 2);

    newMiddleF = (path.segments[path.segments.length / 2].point + path.segments[
      path.segments.length / 2 - 2].point) / 2;
    path.segments[path.segments.length / 2 - 1].point = newMiddleF - gap[0];

    newMiddleB = (path.segments[0].point + path.segments[path.segments.length -
      2].point) / 2;
    path.lastSegment.point = newMiddleB - gap[gap.length - 1];
    //console.log(path.segments[path.segments.length / 2 - 1].point, path.segments[
    //path.segments.length / 2 - 2].point);
    path.closed = true;
    path.smooth();
    // for (var i = 0; i < path.segments.length; i++) {
    //   var textl = new PointText({
    //     point: path.segments[i].point,
    //     fontSize: 10,
    //     fillColor: 'black',
    //     content: i
    //   })
    // }
  }
}