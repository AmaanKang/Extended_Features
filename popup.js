document.addEventListener('DOMContentLoaded', function() {
  var scheduleButton = document.getElementById('scheduleButton');
  scheduleButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'scheduleVideo'});
    });
  });
});
