const MAIN_HOST = "app.appairpoint.com";
const TEST_HOST = "test.appairpoint.com";
const DEV_FLAG = true;
const API_ENDPOINT = DEV_FLAG ? `https://${TEST_HOST}` : `https://${MAIN_HOST}`;

$(document).ready(function () {
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const eventID = getQueryParam("event_id");
  const influencerID = getQueryParam("influencer_code");

  // console.log("event_id:", eventID);
  // console.log("influencer_code:", influencerID);

  fetchImage(eventID, influencerID);

  function fetchImage(eventID, influencerID) {
    if (!eventID || !influencerID) {
      console.error("필수 파라미터 누락: eventID 또는 influencerID가 없습니다.");
      return;
    }

    axios
      .get(`${API_ENDPOINT}/event/event/?event_id=${eventID}&influencer_code=${influencerID}`)
      .then((response) => {
        // console.log(response.data);
        const data = response.data;
        const influencer_name = data?.influencer?.nickname;
        const influencer_image = data?.influencer?.profile_image_url;

        $(".collabo_info .name_2").text(influencer_name);
        $(".collabo_info .collabo_profile_image").attr("src", influencer_image);
        $(".collabo_info").css("display", "block");
        $(".collabo_X").css("display", "block");
      })
      .catch((error) => {
        console.error("실패", error);
      });
  }

  // 신청하기 버튼 클릭 시 실행되는 함수
  window.SubmitConfirm1 = function () {
    const name = $("#q_NAME").val().trim();
    const phone = $("#hp").val().trim();
    const isAgreed = $("#chk").prop("checked");

    if (!name) {
      alert("이름을 입력하세요.");
      return;
    }

    if (!phone) {
      alert("전화번호를 입력하세요.");
      return;
    }
    if (phone.includes("-")) {
      alert("전화번호에 '-'를 제외하고 입력하세요.");
      return;
    }

    if (phone.length !== 11 || !/^\d+$/.test(phone)) {
      alert("전화번호는 11자리 숫자로 입력하세요.");
      return;
    }

    if (!isAgreed) {
      alert("개인정보 수집 및 마케팅 동의가 필요합니다.");
      return;
    }

    if (!influencerID || !eventID) {
      alert("이벤트 ID 또는 인플루언서 코드가 없습니다.");
      return;
    }

    const requestData = {
      event_id: eventID,
      influencer_code: influencerID,
      name: name,
      phone_number: phone,
    };

    // console.log("전송 데이터:", requestData);

    axios
      .post(`${API_ENDPOINT}/event/participate/`, requestData)
      .then((response) => {
        // console.log("신청 완료:", response.data);
        alert("신청이 완료되었습니다!");
        location.reload();
      })
      .catch((error) => {
        // console.error("신청 실패:", error);
        if (error?.response?.status === 404) {
          alert("이벤트 정보를 찾을 수 없습니다.");
          return;
        } else if (error?.response?.status === 400) {
          alert("이미 신청한 번호입니다.");
          return;
        }
        alert("신청에 실패했습니다. 다시 시도해 주세요.");
      });
  };

  //join
  function setScrollAnimate() {
    var $join = $(".join");
    var $historyTable = $(".history_table");
    var joinHeight = $join.outerHeight();
    var joinOriginalTop = $join.offset().top; // 원래 위치 저장

    $(window).scroll(function () {
      if ($historyTable.length) {
        var historyTableTop = $historyTable.offset().top - 800;
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();
        var stopPosition = documentHeight - windowHeight - joinHeight; // 화면 끝 도달 지점

        if (scrollTop >= historyTableTop && scrollTop < stopPosition) {
          $join.css({
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            opacity: 1,
          });
        } else if (scrollTop >= stopPosition) {
          $join.css({
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
          });
        } else {
          $join.css({
            position: "relative",
            top: "auto",
            opacity: 1,
          });
        }
      }
    });
  }

  setScrollAnimate();
});
