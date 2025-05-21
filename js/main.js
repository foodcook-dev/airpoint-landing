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
    $(".txt").stop().slideToggle();
  });

  function getDeviceType() {
    var ua = navigator.userAgent || "";

    var isAndroid = /android/i.test(ua);
    var isIOS = /iPhone|iPad|iPod/i.test(ua);

    if (isAndroid) return "android";
    if (isIOS) return "ios";
    return "desktop";
  }

  $(".backtest_button").click(function () {
    var device = getDeviceType();

    var appScheme = "airpoint://";
    var androidStoreURL = "https://play.google.com/store/apps/details?id=com.foodcook.airpoint";
    var iosStoreURL = "https://apps.apple.com/app/id6743425025";

    var storeURL = device === "android" ? androidStoreURL : device === "ios" ? iosStoreURL : "https://airpoint.kr"; // 데스크탑은 홈페이지로 이동 (스토어 링크 무의미하니까)

    if (device === "desktop") {
      alert("데스크탑에서는 앱을 사용할 수 없습니다.\n모바일에서 이용해 주세요.");
      return;
    }

    var now = Date.now();

    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = appScheme;
    document.body.appendChild(iframe);

    setTimeout(function () {
      var elapsed = Date.now() - now;
      if (elapsed < 2000) {
        window.location.href = storeURL;
      }
    }, 1500);
  });
}); /* end */
