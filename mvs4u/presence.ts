var presence = new Presence({
    clientId: "663356502240788490"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  tv: any,
  video = {
    duration: 0,
    currentTime: 0,
    paused: true
  };

presence.on("iFrameData", data => {
  video = data;
});

presence.on("UpdateData", async () => {
  var data: presenceData = {
    largeImageKey: "m4"
  };

  if (video != null && !isNaN(video.duration) && video.duration > 0) {
    var timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    data.details = document.querySelector("#info .epih1")
      ? document.querySelector("#info .epih1").textContent
      : document.querySelector("#single h1").textContent;
    document.querySelector("#info .epih3")
      ? (data.state = document.querySelector("#info .epih3").textContent)
      : delete data.state;
    (data.smallImageKey = video.paused ? "pause" : "play"),
      (data.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play),
      (data.startTimestamp = timestamps[0]),
      (data.endTimestamp = timestamps[1]);

    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data, !video.paused);
  } else {
    data.details = (await strings).browsing;
    data.smallImageKey = "search";
    data.smallImageText = (await strings).browsing;
    presence.setActivity(data);
  }
});

function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
