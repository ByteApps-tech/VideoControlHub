(() => {
  console.log('hello')

  let hadListened = false

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('message', message)
    console.log('sender', sender)
    console.log('sendResponse', sendResponse)

    if (hadListened) return

    const flag = handleListen()
    if (flag) {
      hadListened = true
    }
  })


})()

let isDebug = true

function handleListen() {
  let video = null
  const videos = document.querySelectorAll('video');
  const bilibiliMovieVideo = document.querySelector('.bpx-player-video-wrap')?.childNodes?.[0]

  if (!videos.length && !bilibiliMovieVideo) return false;

  video = bilibiliMovieVideo || videos[0];

  document.addEventListener('keydown', (e) => {
    console.log('e', e.key)

    switch (e.key) {
      case 'ArrowRight':
        video.currentTime += 5;
        showMessage('快进：5s');
        break;
      case 'ArrowLeft':
        video.currentTime -= 5;
        showMessage('快退：5s');
        break;
      case 'z':
        const rate1 = Math.max(+(video.playbackRate - 0.1).toFixed(1), 0.1);
        video.playbackRate = rate1;
        showMessage(`调速：${rate1}x`);
        break;
      case 'x':
        const rate2 = +(video.playbackRate + 0.1).toFixed(1);
        video.playbackRate = rate2;
        showMessage(`调速：${rate2}x`);
        break;
      case 'r':
        video.playbackRate = 1;
        showMessage('倍速重置为 1x');
        break;
      case 'v':
        video.volume = Math.max(video.volume - 0.1, 0);
        showMessage(`当前音量：${(video.volume * 100).toFixed(0)}%`);
        break;
      case 'b':
        video.volume = Math.min(video.volume + 0.1, 1);
        showMessage(`当前音量：${(video.volume * 100).toFixed(0)}%`);
        break;
      case 'i':
        showVideoInfo(video);
        break;
      case 'p':
        // 切换播放和暂停
        if (video.paused) {
          video.play();
          showMessage('播放');
        } else {
          video.pause();
          showMessage('暂停');
        }
        break;
      case 'm':
        // 切换静音
        video.muted = !video.muted;
        if (video.muted) {
          showMessage('静音');
        } else {
          showMessage('取消静音');
        }
        break;
      default:
        if (isDebug) {
          showMessage('按键：' + e.key);
        }
        break;
    }
  })

  return true
}



function showMessage(message) {
  var messageElement = document.createElement('div');
  messageElement.innerHTML = message;

  // 设置样式
  messageElement.style.position = 'fixed';
  messageElement.style.top = '50%';
  messageElement.style.left = '50%';
  messageElement.style.transform = 'translate(-50%, -50%)';
  messageElement.style.backgroundColor = '#a7aa';
  messageElement.style.color = '#fff';
  messageElement.style.fontSize = '16px';
  messageElement.style.borderRadius = '4px';
  messageElement.style.textAlign = 'center';
  messageElement.style.padding = '10px';
  messageElement.style.boxSizing = 'border-box';
  messageElement.style.opacity = '0';
  messageElement.style.zIndex = '9999';
  messageElement.style.transition = 'opacity 0.5s';

  // 添加元素到页面
  document.body.appendChild(messageElement);

  // 显示消息
  messageElement.style.opacity = '1';

  // 在 3 秒后隐藏消息
  setTimeout(() => {
    messageElement.style.opacity = '0';
    // 延迟 0.5 秒后销毁 div 元素
    setTimeout(() => {
      messageElement.remove();
    }, 500);
  }, 1000);
}


function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(secs).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}


function showVideoInfo(video) {
  let current = formatTime(video.currentTime.toFixed(0))
  let duration = formatTime(video.duration.toFixed(0))
  if (Number.isNaN(video.duration)) {
    duration = ''
  } else {
    duration = '/' + formatTime(video.duration.toFixed(0))
  }
  if (current.startsWith('00:') && duration.startsWith('00:')) {
    // 去掉前面的 00:
    current = current.slice(3)
    duration = duration.slice(3)
  }
  const volume = (video.volume * 100).toFixed(0)
  // 弹出当前视频 倍数 进度
  showMessage(`
    音量：${volume}%，
    倍速：${video.playbackRate}x，
    进度：${current}${duration}
  `)
}
