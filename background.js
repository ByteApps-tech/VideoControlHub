chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
  if (tab.status === 'complete') {
    console.log('tab', tab)

    chrome.action.setBadgeText({
      text: 'Ready',
    })

    chrome.tabs.sendMessage(tabId, {
      type: 'NEW',
      url: tab.url,
      title: tab.title
    })
  }
});


