tool.minDistance = 1;
tool.maxDistance = 100;
var worm;
var worms = [];

function Worm() {
  this.path = new Path();
  this.path.fillColor = new Color({
    hue: Math.random() * 360,
    saturation: 1,
    brightness: 1
  });
  this.mouseRelease = false;
  this.gap = [];
  this.dis = 0;
}

Worm.prototype = {
  beginPoint: function (p) {
    this.path.add(p);
  },
  pairPoint: function (d, m) {
    this.gap.push(d);
    var step = d / 2;
    step.angle += 90;

    var top = m + step;
    var bottom = m - step;

    this.path.add(top);
    this.path.insert(0, bottom);
    this.path.smooth();
    this.path.fullySelected = true;
  },
  endPoint: function (p) {
    this.path.add(p);
    this.path.closed = true;
    this.path.smooth();
    this.mouseRelease = true;
    this.dis = worm.path.lastSegment.point - worm.path.segments[worm.path.segments
      .length / 2 - 1].point;
    this.path.fullySelected = true;
  },
  move: function () {
    if (!check && this.mouseRelease) {
      this.path.fullySelected = true;

      var newTop = this.path.segments[0].point - this.dis;
      var newBottom = this.path.segments[this.path.segments.length - 2].point -
        this.dis;

      this.path.insert(this.path.segments.length / 2 - 1, newTop);
      this.path.removeSegment(0);
      this.path.insert(this.path.segments.length / 2, newBottom);
      this.path.removeSegment(this.path.segments.length - 2);

      var newMiddleF = (this.path.segments[this.path.segments.length / 2]
        .point + this.path.segments[this.path.segments.length / 2 - 2].point
      ) / 2;
      this.path.segments[this.path.segments.length / 2 - 1].point =
        newMiddleF - this.gap[0];

      var newMiddleB = (this.path.segments[0].point + this.path.segments[
        this.path.segments.length - 2].point) / 2;
      this.path.lastSegment.point = newMiddleB + this.gap[this.gap.length -
        1];

      this.path.closed = true;
      this.path.smooth();

      // this.path.segments.forEach(function (s) {
      //   console.log(s.point);
      //   if (s.point.x < 0) s.point.x += view.size.x;
      //   if (s.point.x > view.size.x) s.point.x -= view.size.x;
      //   if (s.point.y < 0) s.point.y += view.size.y;
      //   if (s.point.y > view.size.y) s.point.y -= view.size.y;
      // })
    }
  }
};

//-----------------------------------------main--------------------------------------------
function onMouseDown(event) {
  worm = new Worm();
  worm.beginPoint(event.point);
}

function onMouseDrag(event) {
  worm.pairPoint(event.delta, event.middlePoint);
}

function onMouseUp(event) {
  worm.endPoint(event.point);
  worms.push(worm);
}

function onFrame(event) {
  worms.forEach(function (w) {
    w.move();
  })
}