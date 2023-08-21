// @ts-nocheck
// adding a new bookmark row to the popup
const addNewBookmark = () => { };

const viewBookmarks = () => { };

const onPlay = e => { };

const onDelete = e => { };

const setBookmarkAttributes = () => { };




document.addEventListener("DOMContentLoaded", () => {

  chrome.storage.sync.get('expirationTime', result => {
    console.log('expirationTime', result.expirationTime)
    const currentTime = new Date().getTime();
    const expirationTime = result.expirationTime;
    const days = document.getElementById("days");
    const wrapper = document.querySelector(".content-wrapper");
    if (currentTime > expirationTime) {
      days.innerHTML = "free version left 0 days";
      wrapper.classList.add('disabled')
      // 插件已被禁用
      console.log("插件已被禁用");
      // 可以在这里执行其他操作
    } else {
      const leftTime = Math.floor((expirationTime - currentTime) / (1000 * 60 * 60 * 24));
      days.innerHTML = "free version left " + leftTime + " days";
      wrapper.classList.remove('disabled')
      // 插件未被禁用
      console.log("插件未被禁用");
      // 可以在这里执行其他操作
    }

  })
  // 获取storage中的数据
  chrome.storage.sync.get('config', result => {
    console.log("Config currently is " + result.config);
    const { speedSubtractKey, speedAddKey, speedResetKey, speedStep, volumeSubtractKey, volumeAddKey, volumeResetKey, volumeStep, volumeDefault, forwardKey, backwardKey, forwardStep, trunLightKey, fullscreenKey, enabled, debug } = result.config
    // 设置默认值
    const speedSubtractKeyEl = document.getElementById('speedSubtractKey')
    speedSubtractKeyEl.value = speedSubtractKey || 'a'
    speedSubtractKeyEl.addEventListener('change', e => {
      if (!checkValue(e.target.value, result.config)) {
        e.target.value = speedSubtractKey || 'a'
        return
      }
      chrome.storage.sync.set({ config: { ...result.config, speedSubtractKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const speedAddKeyEl = document.getElementById('speedAddKey')
    speedAddKeyEl.value = speedAddKey || 'd'
    speedAddKeyEl.addEventListener('change', e => {
      if (!checkValue(e.target.value, result.config)) {
        e.target.value = speedAddKey || 'd'
        return
      }
      chrome.storage.sync.set({ config: { ...result.config, speedAddKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const speedResetKeyEl = document.getElementById('speedResetKey')
    speedResetKeyEl.value = speedResetKey || 's'
    speedResetKeyEl.addEventListener('change', e => {
      if (!checkValue(e.target.value, result.config)) {
        e.target.value = speedResetKey || 's'
        return
      }
      chrome.storage.sync.set({ config: { ...result.config, speedResetKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const speedStepEl = document.getElementById('speedStep')
    speedStepEl.value = speedStep || 0.1
    speedStepEl.addEventListener('change', e => {
      if (!checkValue(e.target.value, result.config)) {
        e.target.value = speedStep || 0.1
        return
      }
      chrome.storage.sync.set({ config: { ...result.config, speedStep: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const volumeSubtractKeyEl = document.getElementById('volumeSubtractKey')
    volumeSubtractKeyEl.value = volumeSubtractKey || 'z'
    volumeSubtractKeyEl.addEventListener('change', e => {
      if (!checkValue(e.target.value, result.config)) {
        e.target.value = volumeSubtractKey || 'z'
        return
      }
      chrome.storage.sync.set({ config: { ...result.config, volumeSubtractKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const volumeAddKeyEl = document.getElementById('volumeAddKey')
    volumeAddKeyEl.value = volumeAddKey || 'c'
    volumeAddKeyEl.addEventListener('change', e => {
      if (!checkValue(e.target.value, result.config)) {
        e.target.value = volumeAddKey || 'c'
        return
      }
      chrome.storage.sync.set({ config: { ...result.config, volumeAddKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const volumeResetKeyEl = document.getElementById('volumeResetKey')
    volumeResetKeyEl.value = volumeResetKey || 'x'
    volumeResetKeyEl.addEventListener('change', e => {
      if (!checkValue(e.target.value, result.config)) {
        e.target.value = volumeResetKey || 'x'
        return
      }
      chrome.storage.sync.set({ config: { ...result.config, volumeResetKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const volumeStepEl = document.getElementById('volumeStep')
    volumeStepEl.value = volumeStep || 0.1
    volumeStepEl.addEventListener('change', e => {
      if (!checkValue(e.target.value, result.config)) {
        e.target.value = volumeStep || 0.1
        return
      }
      chrome.storage.sync.set({ config: { ...result.config, volumeStep: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const volumeDefaultEl = document.getElementById('volumeDefault')
    volumeDefaultEl.value = volumeDefault || 0.5
    volumeDefaultEl.addEventListener('change', e => {
      if (!checkValue(e.target.value, result.config)) {
        e.target.value = volumeDefault || 0.5
        return
      }
      chrome.storage.sync.set({ config: { ...result.config, volumeDefault: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const forwardKeyEl = document.getElementById('forwardKey')
    forwardKeyEl.value = forwardKey || 'w'
    forwardKeyEl.addEventListener('change', e => {
      if (!checkValue(e.target.value, result.config)) {
        e.target.value = forwardKey || 'w'
        return
      }
      chrome.storage.sync.set({ config: { ...result.config, forwardKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const backwardKeyEl = document.getElementById('backwardKey')
    backwardKeyEl.value = backwardKey || 'q'
    backwardKeyEl.addEventListener('change', e => {
      if (!checkValue(e.target.value, result.config)) {
        e.target.value = backwardKey || 'q'
        return
      }
      chrome.storage.sync.set({ config: { ...result.config, backwardKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const forwardStepEl = document.getElementById('forwardStep')
    forwardStepEl.value = forwardStep || 10
    forwardStepEl.addEventListener('change', e => {
      if (!checkValue(e.target.value, result.config)) {
        e.target.value = forwardStep || 10
        return
      }
      chrome.storage.sync.set({ config: { ...result.config, forwardStep: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })

    const trunLightKeyEl = document.getElementById('trunLightKey')
    trunLightKeyEl.value = trunLightKey || 'e'
    trunLightKeyEl.addEventListener('change', e => {
      if (!checkValue(e.target.value, result.config)) {
        e.target.value = trunLightKey || 'e'
        return
      }
      chrome.storage.sync.set({ config: { ...result.config, trunLightKey: e.target.value } }, () => {
        console.log('Value is set to ' + e.target.value);
      });
    })
  });
});


function checkValue(value, config) {
  return true
  // TODO: 有bug，暂时不用
  if (value.length !== 1) {
    alert('快捷键只能是一个字符')
    return false
  }
  value = value.toLowerCase()
  if (Object.values(config).includes(value)) {
    alert('快捷键不能重复')
    return false
  }
  return true
}
