function getSetting(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (result) => resolve(result[key]))
  })
}

(async () => {
  console.log('hello videohub')

  let hadListened = false

  const settings = await getSetting('config')
  console.log('settings', settings)

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
let videoIsCenter = false

function handleListen() {
  let video = null
  const videos = document.querySelectorAll('video');
  const bilibiliMovieVideo = document.querySelector('.bpx-player-video-wrap')?.childNodes?.[0]

  if (!videos.length && !bilibiliMovieVideo) return false;

  video = bilibiliMovieVideo || videos[0];

  injectStyle()

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
      case 'c':
        videoIsCenter = !videoIsCenter
        video.style.width = '100%'
        // video 置于中间
        centerVideo(video);
        if (videoIsCenter) {
          changeVideoSize(video, -30)
        }
        break;
      case '-':
        if (!videoIsCenter) return
        changeVideoSize(video, -10)
        break;
      case '=':
        if (!videoIsCenter) return
        // video 放大
        changeVideoSize(video, 10)
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
