(function (exports) {
  exports.shake = false;
  var preX, preY, preZ = 0;

  init();

  function init() {
    if ((window.DeviceMotionEvent) || ('listenForDeviceMovement' in window)) {
      window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
      document.getElementById("dmEvent").innerHTML =
        "Motion detection not supported, sorry.";
    }
  }

  function deviceMotionHandler(eventData) {
    var info, xyz = "[X, Y, Z]";

    // Grab the acceleration including gravity from the results
    var acceleration = eventData.acceleration;
    info = xyz.replace("X", round(acceleration.x));
    info = info.replace("Y", round(acceleration.y));
    info = info.replace("Z", round(acceleration.z));
    /*
    document.getElementById("moAccel").innerHTML = info;

    // Grab the acceleration including gravity from the results
    acceleration = eventData.accelerationIncludingGravity;
    info = xyz.replace("X", round(acceleration.x));
    info = info.replace("Y", round(acceleration.y));
    info = info.replace("Z", round(acceleration.z));
    document.getElementById("moAccelGrav").innerHTML = info;

    // Grab the acceleration including gravity from the results
    var rotation = eventData.rotationRate;
    info = xyz.replace("X", round(rotation.alpha));
    info = info.replace("Y", round(rotation.beta));
    info = info.replace("Z", round(rotation.gamma));
    document.getElementById("moRotation").innerHTML = info;

    info = eventData.interval;
    document.getElementById("moInterval").innerHTML = info;
    */

    ifShake(acceleration.x, acceleration.y, acceleration.z);
  }

  function round(val) {
    var amt = 10;
    return Math.round(val * amt) / amt;
  }

  function ifShake(x, y, z) {
    if (Math.abs(preX - x) > 10) {
      exports.shake = true;
      preX = x;
    } else if (Math.abs(preY - y) > 10) {
      exports.shake = true;
      preY = y;
    } else if (Math.abs(preZ - z) > 10) {
      exports.shake = true;
      preZ = z;
    } else {
      exports.shake = false;
    }
  }

})(this);