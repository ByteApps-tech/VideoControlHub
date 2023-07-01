chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: 'OFF' })
})

chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({
    tabId: tab.id,
  })
  const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  chrome.action.setBadgeText({
    text: nextState,
  })

  await chrome.scripting.executeScript({
    target: {
      tabId: tab.id,
    },
    files: ['./content.js'],
  })
})

function foo(nextState) {
  const video = document.querySelector('video')
  if (video) {
    if (nextState === 'ON') {
      video.play()
    }
    else {
      video.pause()
    }
  }
}
