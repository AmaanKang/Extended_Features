

  // Listen for the alarm
  chrome.alarms.onAlarm.addListener(function(alarm) {
    const delayInMinutes = Math.max((dateTime.getTime() - Date.now()) / 60000, 1);

  // Schedule an alarm
    chrome.alarms.create('myAlarm', { delayInMinutes });
    if (alarm.name === 'myAlarm') {
      // Show a notification
      chrome.notifications.create('myNotification', {
        type: 'basic',
        iconUrl: 'icon.png', // Replace with the path to your icon
        title: 'YouTube Notification',
        message: 'It\'s time to watch YouTube!'
      });
    }
  });