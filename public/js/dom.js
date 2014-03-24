(function (exports) {
  $("#myCanvas").hide();
  exports.begin = false;

  setTimeout(
    function () {
      //nothing
    }, 3000
  );
  setTimeout(
    function () {
      $("#welcome").hide();
    }, 3001
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
      } else {
        $("#laptopIntro").fadeIn();
        $("#showQR").hide();
        $("#myCanvas").fadeIn();
        exports.begin = true;
      }
    }, 3020
  );

  $("#showQR").click(function () {
    $("#QR").slideDown('fast');
    $("#showQR").hide();
  });
})(this);