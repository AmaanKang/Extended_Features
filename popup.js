chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {shorts: document.getElementsByName("disableShorts")}, function(response) {
      console.log(response.farewell);
    });
  });