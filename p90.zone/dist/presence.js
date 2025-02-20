let presence = new Presence({
  clientId: "633714339999645737"
});
presence.on("UpdateData", async () => {
  let ts = document.querySelector("body > div.menu.main > div > h2")
    .textContent;
  const video = document.querySelector("video");
  const strings = await presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });
  function getTimestamps(curr, dura) {
    const startTime = Math.floor(Date.now() / 1000),
      duration = Math.floor(startTime - curr + dura);
    return [startTime, duration];
  }
  const timestamps = getTimestamps(video.currentTime, video.duration);
  let presenceData = {
    state: document.querySelector("body > div.menu.main > div > h2")
      .textContent,
    largeImageKey: "logo",
    startTimestamp: timestamps[0],
    endTimestamp: timestamps[1],
    smallImageKey: video.paused ? "pause" : "play",
    smallImageText: video.paused
      ? (await strings).paused
      : (await strings).playing
  };
  if (video && video.paused) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  presence.setActivity(presenceData);
});
