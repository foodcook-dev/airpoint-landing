$(document).ready(function () {
  // sitemap
  $(".sitemap").hide();

  $(".ham").click(function () {
    $(".sitemap").fadeIn();
    $(".sitemap_close").click(function () {
      $(".sitemap").fadeOut();
    });
  });

  // popup
  const openBtns = document.querySelectorAll('.open-popup')
  const closeBtns = document.querySelectorAll('.popup-close')

function openPopup(popupEl) {
  popupEl.classList.add('active')
  document.body.classList.add('modal-open')
}

function closePopup(popupEl) {
  popupEl.classList.remove('active')
  // 열려있는 팝업이 하나도 없을 때만 스크롤 잠금 해제
  if (!document.querySelector('.popup.active')) {
    document.body.classList.remove('modal-open')
  }
}

// 열기: 버튼의 data-popup 값(id)으로 해당 팝업만 열기
openBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const popupId = btn.dataset.popup
    const popupEl = document.getElementById(popupId)
    if (!popupEl) return

    openPopup(popupEl)
  })
})

// 닫기: 닫기 버튼이 속한 팝업만 닫기
closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const popupEl = btn.closest('.popup')
    if (!popupEl) return

    closePopup(popupEl)
  })
})

  // slide
  const slide1 = new Swiper('.slide1', {
      // 옵션 (parameters) 추가
      slidesPerView: "auto",   // 카드가 여러 장 보이게
      spaceBetween: 16,        // 카드 간격
      speed: 450,
      grabCursor: true,
      watchSlidesProgress: true,

      navigation: {
        nextEl: ".swiper-button-next", //다음 버튼
        prevEl: ".swiper-button-prev", //이전 버튼
      },

      // 스크롤/터치로 살짝 넘길 때도 자연스럽게 "딱" 멈춤 느낌
    freeMode: {
    enabled: true,
    sticky: true,
  },
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
