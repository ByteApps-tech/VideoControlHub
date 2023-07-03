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
  const videos = document.querySelectorAll('video');

  if (!videos.length) return false;

  const video = videos[0];

  video.play();

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
        // 弹出当前视频 倍数 进度
        showMessage(`倍速：${video.playbackRate}x，进度：${convertSecondsToMinutes(video.currentTime.toFixed(0))}`);
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


function convertSecondsToMinutes(seconds) {
  var minutes = Math.floor(seconds / 60);  // 得到分钟数
  var remainingSeconds = seconds % 60;     // 得到剩余的秒数

  // 将分钟数和剩余秒数作为字符串拼接起来
  var formattedTime = minutes + " 分钟 " + remainingSeconds + " 秒";

  return formattedTime;
}
