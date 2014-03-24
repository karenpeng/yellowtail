(function (exports) {
  $("#myCanvas").hide();
  exports.begin = false;

  if (mobile) {
    setTimeout(
      function () {
        //nothing
      }, 2600
    );
    setTimeout(
      function () {
        $("#welcome").hide();
      }, 2601
    );

    setTimeout(
      function () {
        var couter = 0;
        if (mobile) {
          $("#mobileIntro").fadeIn();
          $("#shake").hide();
          $("#ok").click(function () {
            couter++;
            if (couter == 1) {
              $("#draw").hide();
              $("#shake").fadeIn();
              $("#ok").html("Start");
            } else if (couter == 2) {
              $("#mobileIntro").hide();
              $("#myCanvas").fadeIn();
              exports.begin = true;
            }
          });
        }
      }, 2602
    );
  } else {
    setTimeout(
      function () {
        //nothing
      }, 2000
    );
    setTimeout(
      function () {
        $("#init").hide();
      }, 2001
    );
    setTimeout(
      function () {
        $("#laptopIntro").fadeIn();
        $("#showQR").hide();
        $("#myCanvas").fadeIn();
        exports.begin = true;
      }, 2002
    );
  }

  var count = 0;
  $("#showQR").click(function () {
    count++;
    if (count % 2 === 1) {
      $("#QR").slideDown('fast');
      $("#showQR").html("▲");
    } else {
      $("#QR").slideUp('fast');
      $("#showQR").html("▼");
    }
  });
})(this);