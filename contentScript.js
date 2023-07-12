function getSetting(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (result) => resolve(result[key]))
  })
}

(async () => {
  console.log('hello videohub')

  let hadListened = false

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (hadListened) return

    const flag = handleListen()
    if (flag) {
      hadListened = true
    }
  })


})()

let isDebug = true
let videoIsCenter = false

// 获取设置
function getConfig() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('config', result => {
      resolve(result.config)
    })
  })
}

function handleListen() {
  let video = null
  const videos = document.querySelectorAll('video');
  const bilibiliMovieVideo = document.querySelector('.bpx-player-video-wrap')?.childNodes?.[0]

  if (!videos.length && !bilibiliMovieVideo) return false;

  video = bilibiliMovieVideo || videos[0];

  injectStyle()

  document.addEventListener('keydown', async (e) => {

    const config = await getConfig()

    switch (e.key) {
      case config.forwardKey:
        handleSeek(video, +config.forwardStep)
        break;
      case config.backwardKey:
        handleSeek(video, -config.forwardStep)
        break;
      case config.speedSubtractKey:
        handleSpeedChange(video, -config.speedStep)
        break;
      case config.speedAddKey:
        handleSpeedChange(video, +config.speedStep)
        break;
      case config.speedResetKey:
        handleSpeedReset(video)
        break;
      case config.volumeSubtractKey:
        handleVolumeChange(video, -config.volumeStep)
        break;
      case config.volumeAddKey:
        handleVolumeChange(video, +config.volumeStep)
        break;
      case config.volumeResetKey:
        handleVolumeReset(video, +config.volumeDefault || 0.5)
        break;
      // case 'i':
      //   showVideoInfo(video);
      //   break;
      // case 'p':
      //   // 切换播放和暂停
      //   if (video.paused) {
      //     video.play();
      //     showMessage('播放');
      //   } else {
      //     video.pause();
      //     showMessage('暂停');
      //   }
      //   break;
      // case 'm':
      //   // 切换静音
      //   video.muted = !video.muted;
      //   if (video.muted) {
      //     showMessage('静音');
      //   } else {
      //     showMessage('取消静音');
      //   }
      //   break;
      // case 'c':
      //   videoIsCenter = !videoIsCenter
      //   video.style.width = '100%'
      //   // video 置于中间
      //   centerVideo(video);
      //   if (videoIsCenter) {
      //     changeVideoSize(video, -30)
      //   }
      //   break;
      // case '-':
      //   if (!videoIsCenter) return
      //   changeVideoSize(video, -10)
      //   break;
      // case '=':
      //   if (!videoIsCenter) return
      //   // video 放大
      //   changeVideoSize(video, 10)
      //   break;
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

function injectStyle() {
  // 检查文档中是否存在具有特定id的<style>元素
  function isStyleExist(styleId) {
    return document.getElementById(styleId) !== null;
  }

  // 如果不存在，则创建<style>元素并插入样式
  function createStyleIfNotExist(styleId, cssContent) {
    if (!isStyleExist(styleId)) {
      var styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.innerHTML = cssContent;
      document.head.appendChild(styleElement);
    }
  }

  // 要插入的样式内容
  var cssContent = `
  #video-hub-background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9998;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .overflow-hidden {
    overflow: hidden !important;
  }

  .hidden {
    display: none !important;
  }
  
  #video-hub {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    width: 100%;
    height: 100%;
    padding: 1000px;
    background-color: rgba(0, 0, 0, 0.9);
  }
  
  video {
    transition: all 0.5s;
  }
  
  `;

  // 要插入的样式元素id
  var styleId = "video-hub";

  createStyleIfNotExist(styleId, cssContent);
}


function centerVideo(videoEl) {
  // 检查元素是否存在 id 属性，并且值为 "video-hub"
  if (videoEl.getAttribute("id") === "video-hub") {
    // 元素已经具有 id 属性，移除该属性
    videoEl.removeAttribute("id");
  } else {
    videoEl.setAttribute("id", "video-hub");
  }

  // #biliMainHeader 隐藏或显示
  const biliMainHeader = document.getElementById("biliMainHeader");
  if (biliMainHeader.classList.contains("hidden")) {
    biliMainHeader.classList.remove("hidden");
  } else {
    biliMainHeader.classList.add("hidden");
  }

  // body overflow hidden
  const body = document.body;
  if (body.classList.contains("overflow-hidden")) {
    body.classList.remove("overflow-hidden");
  } else {
    body.classList.add("overflow-hidden");
  }
}

function addBackgroundOverlay() {
  // 检查文档中是否存在具有特定id的<div>元素
  function isDivExist(divId) {
    return document.getElementById(divId) !== null;
  }

  // 如果不存在，则创建<div>元素并插入样式
  function createDivIfNotExist(divId) {
    if (!isDivExist(divId)) {
      var divElement = document.createElement("div");
      divElement.id = divId;
      document.body.appendChild(divElement);
    } else {
      // 如果存在，则移除该元素
      document.getElementById(divId).remove();
    }
  }

  // 要插入的样式元素id
  var divId = "video-hub-background-overlay";

  createDivIfNotExist(divId);
}


function changeVideoSize(videoEl, delta = 10) {
  const width = videoEl.style.width.replace("%", "");
  const newWidth = Math.min(Math.max(+width + delta, 10), 100);
  videoEl.style.width = `${newWidth}%`;
}

// 播放速度
function handleSpeedChange(videoEl, delta = 0.25) {
  const speed = videoEl.playbackRate;
  const newSpeed = Math.max((speed + delta).toFixed(1), 0);
  videoEl.playbackRate = newSpeed;
  showMessage(`当前播放速度：${newSpeed}x`);
}

// 音量
function handleVolumeChange(videoEl, delta = 0.1) {
  const volume = videoEl.volume;
  const newVolume = Math.max(Math.min(+volume + delta, 1), 0);
  videoEl.volume = newVolume;
  showMessage(`当前音量：${(newVolume * 100).toFixed(0)}%`);
}

// 快进快退
function handleSeek(videoEl, delta = 5) {
  const currentTime = videoEl.currentTime;
  const newTime = Math.max(Math.min(currentTime + delta, videoEl.duration), 0);
  videoEl.currentTime = newTime;
  showMessage(`${delta > 0 ? '快进' : '快退'}：${Math.abs(delta)}秒`);
}

// 播放速度重置
function handleSpeedReset(videoEl) {
  videoEl.playbackRate = 1;
  showMessage(`当前播放速度：1x`);
}

// 音量重置
function handleVolumeReset(videoEl, resetValue = 0.5) {
  videoEl.volume = resetValue;
  showMessage(`当前音量：${resetValue * 100}%`);
}
