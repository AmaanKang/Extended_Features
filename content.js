// content.js

function createNotificationButton(controlBar) {
  if (!controlBar) {
    return;
  }

  const notificationButton = document.createElement('button');
  notificationButton.classList.add('ytp-button');
  notificationButton.title = 'Set Notification';
  notificationButton.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="M18 2C9.4 2 2 9.4 2 18s7.4 16 16 16 16-7.4 16-16S26.6 2 18 2zm-1 27h-4v-4h4v4zm0-6h-4V9h4v14z"></path></svg>';
  
  notificationButton.addEventListener('click', function() {
    // Create a modal dialog
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.zIndex = '1';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0,0,0,0.4)';

    // Create a modal content container
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fefefe';
    modalContent.style.margin = '15% auto';
    modalContent.style.padding = '20px';
    modalContent.style.border = '1px solid #888';
    modalContent.style.width = '80%';

    // Create a date picker
    const datePicker = document.createElement('input');
    datePicker.type = 'date';

    // Create a time picker
    const timePicker = document.createElement('input');
    timePicker.type = 'time';

    // Create confirm and cancel buttons
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm';
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';

    // Append the date picker, time picker, and buttons to the modal content container
    modalContent.appendChild(datePicker);
    modalContent.appendChild(timePicker);
    modalContent.appendChild(confirmButton);
    modalContent.appendChild(cancelButton);

    // Append the modal content container to the modal dialog
    modal.appendChild(modalContent);

    // Append the modal dialog to the body
    document.body.appendChild(modal);

    // Implement your notification setting logic here
    confirmButton.addEventListener('click', function() {
      const dateTime = `${datePicker.value} ${timePicker.value}`;
      alert(`Notification set for ${dateTime}`);
      // Remove the modal dialog
      document.body.removeChild(modal);
    });

    // Remove the modal dialog when the cancel button is clicked
    cancelButton.addEventListener('click', function() {
      document.body.removeChild(modal);
    });
  });

  controlBar.appendChild(notificationButton);
}

// Function to check if the video player controls are present
function checkControls() {
  const controlsInterval = setInterval(() => {
    const controlBar = document.querySelector('.ytp-right-controls');
    console.log(controlBar);
    if (controlBar) {
      clearInterval(controlsInterval);
      createNotificationButton(controlBar);
    }
  }, 1000); // Check every second
}

// Execute the function when the DOM is ready
document.addEventListener('DOMContentLoaded', checkControls);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'scheduleVideo') {
    console.log("Clicked on Schedule");
    checkControls();
  }
});
