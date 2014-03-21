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
  //path.fullySelected = true;
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
  paths.push(path);
}

function onFrame(event) {
  paths.forEach(function (key) {

    if (key.mouseRelease) {

      var newTop = key.segments[0].point - dis;
      var newBottom = key.segments[key.segments.length - 2].point - dis;

      key.insert(key.segments.length / 2 - 1, newTop);
      key.removeSegment(0);
      key.insert(key.segments.length / 2, newBottom);
      key.removeSegment(key.segments.length - 2);

      newMiddleF = (key.segments[key.segments.length / 2].point + key.segments[
        key.segments.length / 2 - 2].point) / 2;
      key.segments[key.segments.length / 2 - 1].point = newMiddleF - gap[0];

      newMiddleB = (key.segments[0].point + key.segments[key.segments.length -
        2].point) / 2;
      key.lastSegment.point = newMiddleB + gap[gap.length - 1];

      key.closed = true;
      key.smooth();
    }
  })
}