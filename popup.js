document.getElementsByName("disableShorts").forEach(function(radio) {
    radio.addEventListener('change', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {shorts: radio.value});
        });
    });
});