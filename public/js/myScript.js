var socket = io.connect('http://' + location.host);

socket.on('init', function (pageNum) {
  var deviceData = {
    device: mobile
  };
  socket.emit("deviceData", deviceData);
});

tool.minDistance = 2;
tool.maxDistance = 60;
var worm;
var worms = [];
var done = false;
var frameCount = 0;

function Worm(life) {
  this.path = new Path();
  this.path.fillColor = new Color({
    hue: Math.random() * 360,
    saturation: 1,
    brightness: 1
  });
  this.mouseRelease = false;
  this.gap = [];
  this.dis = 0;
  this.clock = 0;
  this.life = life;
}

Worm.prototype = {
  beginPoint: function (p) {
    if (!this.mouseRelease) {
      this.path.add(p);
    }
  },
  pairPoint: function (d, m) {
    if (!this.mouseRelease) {
      this.gap.push(d);
      var step = d / 2;
      step.angle += 90;

      var top = m + step;
      var bottom = m - step;

      this.path.add(top);
      this.path.insert(0, bottom);
      this.path.smooth();
      //this.path.fullySelected = true;
    }
  },
  endPoint: function (p) {
    if (!this.mouseRelease) {
      this.path.add(p);
      this.path.closed = true;
      this.path.smooth();
      this.mouseRelease = true;
      this.dis = this.path.lastSegment.point - this.path.segments[this.path.segments
        .length / 2 - 1].point;
      //this.path.fullySelected = true;
    }
  },
  check: function () {
    if (this.life === 0) {
      return true;
    } else {
      var outCount = 0;
      this.path.segments.forEach(function (s) {
        if (s.point.x < 0 || s.point.x > view.size.width || s.point.y < 0 ||
          s.point
          .y > view.size.height) {
          outCount++;
        }
      });
      return outCount === this.path.segments.length;
    }
  },
  move: function () {
    if (!mobile && this.mouseRelease && this.path.segments.length % 2 === 0 &&
      this.path.segments.length > 3) {
      this.clock++;
      if (this.clock > 10) {

        this.life--;

        var newTop = this.path.segments[this.path.segments.length / 2 - 2].point +
          this.dis;
        var newBottom = this.path.segments[this.path.segments.length / 2].point +
          this.dis;

        this.path.removeSegment(this.path.segments.length / 2 - 2);
        this.path.insert(0, newTop);
        this.path.removeSegment(this.path.segments.length / 2);
        this.path.insert(this.path.segments.length - 1, newBottom);

        var newMiddleB = (this.path.segments[0].point + this.path.segments[
          this.path.segments.length - 2].point) / 2;
        this.path.lastSegment.point = newMiddleB + this.gap[this.gap.length - 1];

        var newMiddleF = (this.path.segments[this.path.segments.length / 2]
          .point + this.path.segments[this.path.segments.length / 2 - 2].point
        ) / 2;
        this.path.segments[this.path.segments.length / 2 - 1].point =
          newMiddleF - this.gap[0];

        this.path.closed = true;
        this.path.smooth();
      }
    }
  }
};

//-----------------------------------------main--------------------------------------------
function onMouseDown(event) {
  if (begin) {
    worm = new Worm(100000000);
    worm.beginPoint(event.point);
  }
}

function onMouseDrag(event) {
  if (begin) {
    worm.pairPoint(event.delta, event.middlePoint);
  }
}

function onMouseUp(event) {
  if (begin) {
    worm.endPoint(event.point);
    if (!mobile) {
      var laptopWorm = {
        p: worm.path.toJSON()[1],
        m: worm.mouseRelease,
        g: worm.gap,
        d: worm.dis
      };
      socket.emit('laptopWorm', laptopWorm);
    }
    worms.push(worm);
  }
}

function onFrame(event) {
  frameCount++;
  if (begin) {
    if (shake && worms.length > 0) {
      var mobileWorm = [];
      worms.forEach(function (w) {
        var myWorm = {
          p: w.path.toJSON()[1],
          m: w.mouseRelease,
          g: w.gap,
          d: w.dis
        };
        mobileWorm.push(myWorm);
        w.path.removeSegments();
        w = null;
      });
      socket.emit('mobileWorm', mobileWorm);
      worms = [];
    }

    for (var i = 0; i < worms.length; i++) {
      if (worms[i].check()) {
        worms.splice(i, 1);
      } else if (frameCount % 2 === 0) {
        worms[i].move();
      }
    }
    //document.getElementById("check").innerHTML = worms.length;
  }
}

var init = 0;

socket.on('hisMobileWorm', function (data) {

  if (init === 0) {
    $("#QR").slideUp('fast');
    $("#showQR").fadeIn();
    init++;
  }

  var ranX = Math.random() * view.size.width * 5 / 8;
  var ranY = Math.random() * view.size.height * 5 / 8;

  data.forEach(function (obj) {
    var newWorm = new Worm(10000000);
    newWorm.path = new Path(obj.p);
    newWorm.mouseRelease = obj.m;
    obj.g.forEach(function (item) {
      var gapPoint = new Point(item[1], item[2]);
      newWorm.gap.push(gapPoint);
    });
    newWorm.dis = new Point(obj.d[1], obj.d[2]);

    newWorm.path.segments.forEach(function (item) {
      item.point.x += ranX;
      item.point.y += ranY;
    });
    worms.push(newWorm);
  });
});

socket.on('hisLaptopWorm', function (obj) {

  var newWorm = new Worm();
  newWorm.path = new Path(obj.p);
  newWorm.mouseRelease = obj.m;
  obj.g.forEach(function (item) {
    var gapPoint = new Point(item[1], item[2]);
    newWorm.gap.push(gapPoint);
  });
  newWorm.dis = new Point(obj.d[1], obj.d[2]);

  worms.push(newWorm);
});