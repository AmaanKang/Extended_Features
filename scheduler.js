// scheduler.js
document.getElementById("confirmButton").addEventListener("click", function () {
    // Get the selected date/time from the picker input
    const selectedDateTime = new Date(); // Replace with actual logic
  
    // Inform the background script to schedule the notification
    chrome.runtime.sendMessage({ action: "scheduleNotification", datetime: selectedDateTime });
  
    // Close the scheduler tab
    window.close();
  });
  