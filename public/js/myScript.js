tool.minDistance = 10;
tool.maxDistance = 45;
var mouseRealse = false;
var path;
var gap = [];
var dis;
var newMiddleF, newMiddleB;
var paths = [];

function onMouseDown(event) {
  gap = [];
  path = new Path();
  path.fillColor = new Color({
    hue: Math.random() * 360,
    saturation: 1,
    brightness: 1
  });
  path.add(event.point);
  path.mouseRelease = false;
  path.fullySelected = true;
}

function onMouseDrag(event) {
  gap.push(event.delta);
  var step = event.delta / 2;
  step.angle += 90;

  var top = event.middlePoint + step;
  var bottom = event.middlePoint - step;

  path.add(top);
  path.insert(0, bottom);
  path.smooth();
  //path.fullySelected = true;
}

function onMouseUp(event) {
  path.add(event.point);
  path.closed = true;
  path.smooth();
  path.mouseRelease = true;
  dis = path.lastSegment.point - path.segments[path.segments.length /
    2 - 1].point;
}

function onFrame(event) {
  if (path.mouseRelease) {

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
    path.lastSegment.point = newMiddleB + gap[gap.length - 1];

    path.closed = true;
    path.smooth();
  }
}