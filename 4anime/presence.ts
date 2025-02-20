var presence = new Presence({
    clientId: "640644330666852382"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", async () => {
  playback =
    document.querySelector(".vjs-current-time-display") !== null ? true : false;

  if (!playback) {
    presenceData: presenceData = {
      largeImageKey: "logo"
    };

    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }

  var video: HTMLVideoElement = document.querySelector("#video1_html5_api");

  if (video !== null && !isNaN(video.duration)) {
    var videoTitle: any;
    var seasonepisode;

    videoTitle = document.querySelector("a#titleleft");
    seasonepisode = document.querySelector("span#titleleft");

    var timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      presenceData: presenceData = {
        largeImageKey: "logo",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    presence.setTrayTitle(video.paused ? "" : videoTitle.innerText);

    presenceData.details = videoTitle.innerText;
    presenceData.state = seasonepisode.innerText;

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (videoTitle !== null) {
      presence.setActivity(presenceData, !video.paused);
    }
  }
});

function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
