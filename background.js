// background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "scheduleNotification") {
      const notificationOptions = {
        type: "basic",
        iconUrl: "images/icon48.png",
        title: "Video Reminder",
        message: "It's time to watch the scheduled video!"
      };
  
      // Schedule the notification for the specified date/time
      chrome.notifications.create("videoScheduledNotification", notificationOptions);
    }
  });
  