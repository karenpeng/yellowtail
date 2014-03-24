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
      }, 1000
    );
    setTimeout(
      function () {
        $("#laptopIntro").fadeIn();
        $("#showQR").hide();
        $("#myCanvas").fadeIn();
        exports.begin = true;
      }, 1001
    );
  }

  $("#showQR").click(function () {
    $("#QR").slideDown('fast');
    $("#showQR").hide();
  });
})(this);