var presence = new Presence({
    clientId: "640266769218666502"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

var browsingStamp = Math.floor(Date.now() / 1000);

var title: any, views: any, air: any, air2: any;
var iFrameVideo: boolean, currentTime: any, duration: any, paused: any;

var video: HTMLVideoElement, videoDuration: any, videoCurrentTime: any;

var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);

var user: any;
var search: any;

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("iFrameData", data => {
  playback = data.iframe_video.duration !== null ? true : false;

  if (playback) {
    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }
});

presence.on("UpdateData", async () => {
  var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)),
    presenceData: presenceData = {
      largeImageKey: "cc"
    };

  if (document.location.pathname.includes("/watch/")) {
    if (iFrameVideo == true && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      title = document.querySelector("#episode > div.h1 > h1");
      if (title.textContent.includes(" – ")) {
        presenceData.details = title.textContent.split(" – ")[0];
        presenceData.state = title.textContent
          .split(" – ")[1]
          .replace("Online at cartooncrazy.tv", "");
      } else {
        presenceData.details = title.textContent.replace(
          "Online at cartooncrazy.tv",
          ""
        );
      }

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (iFrameVideo == null && isNaN(duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Looking at: ";
      title = document.querySelector("#episode > div.h1 > h1");

      presenceData.state = title.textContent;
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname == "/") {
    presenceData.details = "Viewing main page";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/cartoon-list")) {
    presenceData.details = "Viewing cartoonlist";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/anime-dubbed")) {
    presenceData.details = "Viewing animelist";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("?genre")) {
    presenceData.details = "Viewing genres";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/cartoon/")) {
    presenceData.details = "Viewing cartoon:";
    presenceData.state = document
      .querySelector("#anime > div.h1")
      .textContent.replace("Online at cartooncrazy.tv", "")
      .replace("at wcartooncrazy.tv", "");
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/anime/")) {
    presenceData.details = "Viewing cartoon:";
    presenceData.state = document
      .querySelector("#anime > div.h1")
      .textContent.replace("Online at cartooncrazy.tv", "")
      .replace("at wcartooncrazy.tv", "");
    presenceData.startTimestamp = browsingStamp;
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
