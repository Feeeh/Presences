var presence = new Presence({
    clientId: "636654506607771680"
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
    largeImageKey: "rlinsider"
  };

  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the home page";
  } else if (document.location.pathname.includes("/search")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Searching an item";
  } else if (document.location.pathname.includes("/rocketpass")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the rocket pass";
  } else if (document.location.pathname.includes("/about")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the about page";
  } else if (document.querySelector("#itemNameSpan") !== null) {
    presenceData.startTimestamp = browsingStamp;
    title = document.querySelector("#itemNameSpan");
    presenceData.details = "Viewing item:";
    presenceData.state = title.innerText;
  } else {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the price changes";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
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
