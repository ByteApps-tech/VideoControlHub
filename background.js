const defaultSettings = {
  enabled: true,
  debug: false,
  videoIsCenter: false,
  // 播放速度
  speedSubtractKey: 'a',
  speedResetKey: 's',
  speedAddKey: 'd',
  speedStep: 0.1,
  // 音量
  volumeSubtractKey: 'z',
  volumeResetKey: 'x',
  volumeAddKey: 'c',
  volumeStep: 0.1,
  volumeDefault: 0.5,
  // 快进快退
  forwardKey: 'w',
  backwardKey: 'q',
  forwardStep: 10,
  trunLightKey: 'g',
  fullscreenKey: 'f',
}

chrome.runtime.onInstalled.addListener(function () {
  // 获取当前时间
  const currentTime = new Date().getTime();
  // 计算7天后的时间
  const expirationTime = currentTime + (7 * 24 * 60 * 60 * 1000);
  // 存储到本地存储
  chrome.storage.sync.set({ expirationTime });
});


chrome.tabs.onUpdated.addListener((tabId, _, tab) => {

  if (tab.status === 'complete') {

    // chrome.action.setBadgeText({
    //   text: 'Ready',
    // })

    chrome.tabs.sendMessage(tabId, {
      type: 'NEW',
      url: tab.url,
      title: tab.title
    })

    chrome.storage.sync.get(['expirationTime'], function (result) {
      // 获取当前时间
      const currentTime = new Date().getTime();
      // 获取存储的过期时间
      const expirationTime = result.expirationTime;
      // 检查是否过期
      if (currentTime >= expirationTime) {
        chrome.tabs.sendMessage(tabId, {
          type: 'DISABLED',
        })
      }
    });

    chrome.storage.sync.get('config', result => {
      if (!result.config) {
        chrome.storage.sync.set({ config: defaultSettings }, function () {
          console.log('Config is set to default');
        });
      } else {
        console.log('Config is got: ', result.config);
      }
    })
  }
});





