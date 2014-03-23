(function (exports) {
  function canvasSize() {
    var canvasW = window.innerWidth;
    var canvasH = window.innerHeight;
    var canvasWString = canvasW.toString();
    var canvasHString = canvasH.toString();
    $("#myCanvas").css("width", canvasWString + 'px');
    $("#myCanvas").css("height", canvasHString + 'px');
    // $("#mobileIntro").css("width", canvasWString + 'px');
    // $("#laptopIntro").css("width", canvasWString + 'px');
  }
  canvasSize();
  $(window).resize(function () {
    if (mobile) {
      canvasSize();
    }
  });

  $("#mobileIntro").hide();
  $("#laptopIntro").hide();

  // if (!mobile) {
  //   $("#laptopIntro").hide();
  //   $("#shake").hide();
  //   $(".once").click(function () {
  //     $("#draw").hide();
  //     $("#shake").fadeIn();
  //     $(".once").addClass("twice");
  //     $(".twice").removeClass("once");
  //   });
  //   $(".twice").click(function () {
  //     $("#shake").fadeOut();
  //     $(".twice").fadeOut();
  //     $("#myCanvas").removeClass("hideCanvas");
  //     $("#myCanvas").addClass("showCanvas");
  //   });
  // } else {
  //   $("#mobileIntro").hide();
  //   $("#myCanvas").removeClass("hideCanvas");
  //   $("#myCanvas").addClass("showCanvas");
  // }
})(this);