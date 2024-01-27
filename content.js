// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "showContextMenu") {
      chrome.contextMenus.create({
        title: "Schedule",
        contexts: ["video"],
        onclick: function (info, tab) {
          // Handle the Schedule option click here
          console.log("Schedule clicked on video:", info);
        }
      });
    }
  });
  
  // Send a message to background.js when the page is loaded
  chrome.runtime.sendMessage({ action: "pageLoaded" });
  