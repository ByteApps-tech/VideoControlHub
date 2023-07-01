// 暂停或播放视频
function pauseOrPlayVideo() {
  const video = document.querySelector('video')
  if (video.paused) {
    video.play()
    console.log('play')
  }
  else {
    video.pause()
    console.log('pause')
  }
}

pauseOrPlayVideo()
