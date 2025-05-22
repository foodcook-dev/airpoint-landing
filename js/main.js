$(document).ready(function () {
  // sitemap
  $(".sitemap").hide();

  $(".ham").click(function () {
    $(".sitemap").fadeIn();
    $(".sitemap_close").click(function () {
      $(".sitemap").fadeOut();
    });
  });

  //dropdown
  $(".txt").hide();

  $(".click").click(function () {
    const target = $(this).next(".txt");
    target.stop().slideToggle();

    // chevron 아이콘 회전
    $(this).find(".chevron").toggleClass("active");
  });

  var scheme = "airpoint://";
  var androidStoreUrl = "https://play.google.com/store/apps/details?id=com.foodcook.airpoint";
  var iosStoreUrl = "https://apps.apple.com/app/id6743425025";

  function getDeviceType() {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("android") > -1) {
      return "android";
    } else if (userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1) {
      return "ios";
    } else {
      return "desktop";
    }
  }

  // 앱 열기
  $(".app_open_button").click(function () {
    var deviceType = getDeviceType();

    if (deviceType === "desktop") {
      alert("모바일에서 이용해주세요.");
      return;
    }

    var clickedAt = Date.now();

    window.location.href = scheme;

    setTimeout(function () {
      var now = Date.now();
      if (now - clickedAt < 2000) {
        if (deviceType === "android") {
          window.location.href = androidStoreUrl;
        } else if (deviceType === "ios") {
          window.location.href = iosStoreUrl;
        }
      }
    }, 1500);
  });

  // 앱 다운로드 버튼
  $(".app_download_button").click(function () {
    var deviceType = getDeviceType();

    if (deviceType === "desktop") {
      alert("모바일에서 이용해주세요.");
      return;
    }

    if (deviceType === "android") {
      window.location.href = androidStoreUrl;
    } else if (deviceType === "ios") {
      window.location.href = iosStoreUrl;
    }
  });
}); /* end */
