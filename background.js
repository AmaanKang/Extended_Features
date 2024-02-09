chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Get the date and time from the message
  const dateTime = new Date(request.dateTime);

  // Calculate the delay in minutes until the alarm should fire
  const delayInMinutes = Math.max((dateTime.getTime() - Date.now()) / 60000, 1);
  const url = request.url;  
  // Schedule an alarm
  chrome.storage.local.set({ 'url': url }, function() {
    // Schedule an alarm
    chrome.alarms.create('myAlarm', { delayInMinutes });
  });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'myAlarm') {
    // Retrieve the URL from chrome.storage
    chrome.storage.local.get('url', function(data) {
      // Show a notification
      chrome.notifications.create('myNotification', {
        type: 'basic',
        iconUrl: '32.png',
        title: 'YouTube Notification',
        message: 'It\'s time to watch YouTube! Click to open.'
      }, function(notificationId) {
        // Store the URL with the notification ID
        chrome.storage.local.set({ [notificationId]: data.url });
      });
      
      chrome.notifications.onClicked.addListener(function(notificationId) {
        // Retrieve the URL associated with the notification ID
        chrome.storage.local.get(notificationId, function(data) {
          // Open a new tab with the URL
          chrome.tabs.create({ url: data[notificationId] });
      
          // Clear the URL from storage
          chrome.storage.local.remove(notificationId);
        });
      });
      chrome.storage.local.remove('url');
    });
  }
});