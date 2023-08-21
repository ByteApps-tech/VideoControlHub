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




chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
  if (tab.status === 'complete') {
    console.log('tab', tab)

    // chrome.action.setBadgeText({
    //   text: 'Ready',
    // })

    chrome.tabs.sendMessage(tabId, {
      type: 'NEW',
      url: tab.url,
      title: tab.title
    })

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





