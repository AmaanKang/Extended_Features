// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "enableScheduleOption") {
      addScheduleOption();
    }
  });
  
  function addScheduleOption() {
    const menuContainer = document.querySelector("ytd-menu-renderer #top-level-buttons");
    if (menuContainer) {
      const scheduleButton = document.createElement("button");
      scheduleButton.textContent = "Schedule";
      scheduleButton.addEventListener("click", function () {
        showDateTimePicker();
      });
  
      menuContainer.appendChild(scheduleButton);
    }
  }
  
  function showDateTimePicker() {
    // Add your logic to show a date/time picker here
    // ...
  
    // For demonstration purposes, let's simulate confirming the date/time
    const selectedDateTime = new Date();
    confirmAndScheduleNotification(selectedDateTime);
  }
  
  function confirmAndScheduleNotification(selectedDateTime) {
    // Add your logic to confirm the date/time and schedule the notification
    // ...
  
    // For demonstration purposes, let's simulate scheduling a notification
    const notificationOptions = {
      type: "basic",
      iconUrl: "images/icon48.png",
      title: "Video Scheduled!",
      message: "Notification will be sent at the scheduled time."
    };
  
    chrome.notifications.create("videoScheduledNotification", notificationOptions);
  }
  