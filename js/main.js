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

  console.log("event_id:", eventID);
  console.log("influencer_code:", influencerID);

  fetchImage(eventID, influencerID);

  function fetchImage(eventID, influencerID) {
    if (!eventID || !influencerID) {
      console.error("필수 파라미터 누락: eventID 또는 influencerID가 없습니다.");
      return;
    }

    axios
      .get(`${API_ENDPOINT}/event/event/?event_id=${eventID}&influencer_code=${influencerID}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("실패", error);
      });
  }
}); //문서 이벤트 종료
