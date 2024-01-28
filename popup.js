// popup.js
document.getElementById("scheduleButton").addEventListener("click", function () {
    // Inform the content script to enable the "Schedule" option
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "enableScheduleOption" });
    });
  
    // Open a new tab with the scheduler interface
    chrome.tabs.create({ url: "scheduler.html" });
  });
  