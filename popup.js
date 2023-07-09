// @ts-nocheck
// adding a new bookmark row to the popup
const addNewBookmark = () => { };

const viewBookmarks = () => { };

const onPlay = e => { };

const onDelete = e => { };

const setBookmarkAttributes = () => { };

document.addEventListener("DOMContentLoaded", () => {
  // 获取storage中的数据
  chrome.storage.sync.get('config', result => {
    console.log("Config currently is " + result.config);
    const { speedSubtractKey, speedAddKey, speedResetKey, speedStep, volumeSubtractKey, volumeAddKey, volumeResetKey, volumeStep, volumeDefault, forwardKey, backwardKey, forwardStep, trunLightKey, fullscreenKey, enabled, debug } = result.config
    // 设置默认值
    const speedSubtractKeyEl = document.getElementById('speedSubtractKey')
    speedSubtractKeyEl.value = speedSubtractKey || 'a'
    speedSubtractKeyEl.addEventListener('change', e => {
      chrome.storage.sync.set({ config: { ...result.config, speedSubtractKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const speedAddKeyEl = document.getElementById('speedAddKey')
    speedAddKeyEl.value = speedAddKey || 'd'
    speedAddKeyEl.addEventListener('change', e => {
      chrome.storage.sync.set({ config: { ...result.config, speedAddKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const speedResetKeyEl = document.getElementById('speedResetKey')
    speedResetKeyEl.value = speedResetKey || 's'
    speedResetKeyEl.addEventListener('change', e => {
      chrome.storage.sync.set({ config: { ...result.config, speedResetKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const speedStepEl = document.getElementById('speedStep')
    speedStepEl.value = speedStep || 0.1
    speedStepEl.addEventListener('change', e => {
      chrome.storage.sync.set({ config: { ...result.config, speedStep: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const volumeSubtractKeyEl = document.getElementById('volumeSubtractKey')
    volumeSubtractKeyEl.value = volumeSubtractKey || 'z'
    volumeSubtractKeyEl.addEventListener('change', e => {
      chrome.storage.sync.set({ config: { ...result.config, volumeSubtractKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const volumeAddKeyEl = document.getElementById('volumeAddKey')
    volumeAddKeyEl.value = volumeAddKey || 'c'
    volumeAddKeyEl.addEventListener('change', e => {
      chrome.storage.sync.set({ config: { ...result.config, volumeAddKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const volumeResetKeyEl = document.getElementById('volumeResetKey')
    volumeResetKeyEl.value = volumeResetKey || 'x'
    volumeResetKeyEl.addEventListener('change', e => {
      chrome.storage.sync.set({ config: { ...result.config, volumeResetKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const volumeStepEl = document.getElementById('volumeStep')
    volumeStepEl.value = volumeStep || 0.1
    volumeStepEl.addEventListener('change', e => {
      chrome.storage.sync.set({ config: { ...result.config, volumeStep: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const volumeDefaultEl = document.getElementById('volumeDefault')
    volumeDefaultEl.value = volumeDefault || 0.5
    volumeDefaultEl.addEventListener('change', e => {
      chrome.storage.sync.set({ config: { ...result.config, volumeDefault: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const forwardKeyEl = document.getElementById('forwardKey')
    forwardKeyEl.value = forwardKey || 'w'
    forwardKeyEl.addEventListener('change', e => {
      chrome.storage.sync.set({ config: { ...result.config, forwardKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const backwardKeyEl = document.getElementById('backwardKey')
    backwardKeyEl.value = backwardKey || 'q'
    backwardKeyEl.addEventListener('change', e => {
      chrome.storage.sync.set({ config: { ...result.config, backwardKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const forwardStepEl = document.getElementById('forwardStep')
    forwardStepEl.value = forwardStep || 10
    forwardStepEl.addEventListener('change', e => {
      chrome.storage.sync.set({ config: { ...result.config, forwardStep: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const trunLightKeyEl = document.getElementById('trunLightKey')
    trunLightKeyEl.value = trunLightKey || 'e'
    trunLightKeyEl.addEventListener('change', e => {
      chrome.storage.sync.set({ config: { ...result.config, trunLightKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })
  });
});
