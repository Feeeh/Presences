let iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (document.querySelector("video") != null) {
    var video: HTMLVideoElement = document.querySelector("video");
    if (video != null && !isNaN(video.duration)) {
      iframe.send({
        duration: video.duration,
        currentTime: video.currentTime,
        paused: video.paused
      });
    }
  }
});
