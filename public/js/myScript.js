tool.minDistance = 2;
tool.maxDistance = 60;
var worm;
var worms = [];
var done = false;

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
  this.clock = 0;
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
  move: function () {
    if (!mobile && this.mouseRelease && this.path.segments.length % 2 === 0) {
      this.clock++;
      if (this.clock > 30) {

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

        // this.path.segments.forEach(function (s) {
        //   console.log(s.point);
        //   if (s.point.x < 0) s.point.x += view.size.x;
        //   if (s.point.x > view.size.x) s.point.x -= view.size.x;
        //   if (s.point.y < 0) s.point.y += view.size.y;
        //   if (s.point.y > view.size.y) s.point.y -= view.size.y;
        // })
      }
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
  if (shake && worms.length > 0) {
    var myWorm = [];
    worms.forEach(function (w) {
      var myWormData = {
        p: w.path.toJSON()[1],
        m: w.mouseRelease,
        g: w.gap,
        d: w.dis
      };
      myWorm.push(myWormData);
      w.path.removeSegments();
      w = null;
    });
    socket.emit('myWorm', myWorm);
    worms = [];
  }
  worms.forEach(function (w) {
    w.move();
  });
  //document.getElementById("shakeShake").innerHTML = worms.length;
}

socket.on('hisWorm', function (data) {
  //console.log(data);
  data.forEach(function (obj) {
    console.log(obj);
    var newWorm = new Worm();
    // newWorm.path = new Path();
    newWorm.path = new Path(obj.p);
    newWorm.mouseRelease = obj.m;
    obj.g.forEach(function (item) {
      var gapPoint = new Point(item[1], item[2]);
      newWorm.gap.push(gapPoint);
    });
    newWorm.dis = new Point(obj.d[1], obj.d[2]);
    worms.push(newWorm);
  });
});

$(window).keydown(function (event) {
  if (event.which === 32) {
    event.preventDefault();
    worms.forEach(function (w) {
      console.log(w.path.segments);
      w.path.segments.forEach(function (s) {

        //console.log(s.point);
      });
    });
  }
});

// (function (exports) {
//   tool.minDistance = 1;
//   tool.maxDistance = 100;
//   var worm;
//   var worms = [];
//   var done = false;

//   function Worm() {
//     this.path = new Path();
//     this.path.fillColor = new Color({
//       hue: Math.random() * 360,
//       saturation: 1,
//       brightness: 1
//     });
//     this.mouseRelease = false;
//     this.gap = [];
//     this.dis = 0;
//   }

//   Worm.prototype = {
//     beginPoint: function (p) {
//       if (!this.mouseRelease) {
//         this.path.add(p);
//       }
//     },
//     pairPoint: function (d, m) {
//       if (!this.mouseRelease) {
//         this.gap.push(d);
//         var step = d / 2;
//         step.angle += 90;

//         var top = m + step;
//         var bottom = m - step;

//         this.path.add(top);
//         this.path.insert(0, bottom);
//         this.path.smooth();
//         //this.path.fullySelected = true;
//       }
//     },
//     endPoint: function (p) {
//       this.path.add(p);
//       this.path.closed = true;
//       this.path.smooth();
//       this.mouseRelease = true;
//       this.dis = this.path.lastSegment.point - this.path.segments[this.path.segments
//         .length / 2 - 1].point;
//       //this.path.fullySelected = true;
//     },
//     move: function () {
//       if (!check && this.mouseRelease) {
//         //this.path.fullySelected = true;

//         // var newTop = this.path.segments[0].point - this.dis;
//         // var newBottom = this.path.segments[this.path.segments.length - 2].point -
//         //   this.dis;

//         // this.path.insert(this.path.segments.length / 2 - 1, newTop);
//         // this.path.removeSegment(0);
//         // this.path.insert(this.path.segments.length / 2, newBottom);
//         // this.path.removeSegment(this.path.segments.length - 2);

//         // var newMiddleF = (this.path.segments[this.path.segments.length / 2]
//         //   .point + this.path.segments[this.path.segments.length / 2 - 2].point
//         // ) / 2;
//         // this.path.segments[this.path.segments.length / 2 - 1].point =
//         //   newMiddleF - this.gap[0];

//         // var newMiddleB = (this.path.segments[0].point + this.path.segments[
//         //   this.path.segments.length - 2].point) / 2;
//         // this.path.lastSegment.point = newMiddleB + this.gap[this.gap.length -
//         //   1];

//         var newTop = this.path.segments[this.path.segments.length / 2 - 2].point +
//           this.dis;
//         var newBottom = this.path.segments[this.path.segments.length / 2].point +
//           this.dis;

//         this.path.removeSegment(this.path.segments.length / 2 - 2);
//         this.path.insert(0, newTop);
//         this.path.removeSegment(this.path.segments.length / 2);
//         this.path.insert(this.path.segments.length - 1, newBottom);

//         var newMiddleB = (this.path.segments[0].point + this.path.segments[
//           this.path.segments.length - 2].point) / 2;
//         this.path.lastSegment.point = newMiddleB + this.gap[this.gap.length -
//           1];

//         var newMiddleF = (this.path.segments[this.path.segments.length / 2]
//           .point + this.path.segments[this.path.segments.length / 2 - 2].point
//         ) / 2;
//         this.path.segments[this.path.segments.length / 2 - 1].point =
//           newMiddleF - this.gap[0];

//         this.path.closed = true;
//         this.path.smooth();

//         // this.path.segments.forEach(function (s) {
//         //   console.log(s.point);
//         //   if (s.point.x < 0) s.point.x += view.size.x;
//         //   if (s.point.x > view.size.x) s.point.x -= view.size.x;
//         //   if (s.point.y < 0) s.point.y += view.size.y;
//         //   if (s.point.y > view.size.y) s.point.y -= view.size.y;
//         // })
//       }
//     }
//   };

//   //-----------------------------------------main--------------------------------------------
//   exports.onMouseDown = function (event) {
//     if (!done) {
//       worm = new Worm();
//       worm.beginPoint(event.point);
//     }
//   };

//   exports.onMouseDrag = function (event) {
//     if (!done) {
//       worm.pairPoint(event.delta, event.middlePoint);
//     }
//   };

//   exports.onMouseUp = function (event) {
//     if (!done) {
//       worm.endPoint(event.point);
//       worms.push(worm);
//       if (check) {
//         done = true;
//       }
//     }
//   };

//   exports.onFrame = function (event) {
//     if (shake) {
//       $("#shakeShake").html("Yeah!");
//     }
//     worms.forEach(function (w) {
//       w.move();
//     });
//   };

//   exports.Worm = Worm;
// })(this);