var presence = new Presence({
    clientId: "639603634451120138"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

var browsingStamp = Math.floor(Date.now() / 1000);

var user: any;
var title: any;
var replace: any;
var search: any;

presence.on("UpdateData", async () => {
  let presenceData: presenceData = {
    largeImageKey: "run"
  };

  if (document.location.hostname == "www.speedrun.com") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname.includes("/games")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing all games";
    } else if (document.location.pathname.includes("/streams")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing all streams";
    } else if (document.location.pathname.includes("/thread/")) {
      title = document.querySelector(
        "#centerbar > div > div:nth-child(1) > span"
      );
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing forum post:";
      if (title.innerText.length > 128) {
        presenceData.state = title.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = title.innerText;
      }
    } else if (document.location.pathname.includes("/forum")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing the forums...";
    }
  }

  if (presenceData.details == null) {
    title = document.querySelector("head > title");
    presenceData.state = title.innerText.replace(" - speedrun.com", "");
    presenceData.details = "Viewing:";
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else {
    presence.setActivity(presenceData);
  }
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
