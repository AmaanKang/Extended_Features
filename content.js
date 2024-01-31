// content.js


function createNotificationButton(controlBar) {
  if (!controlBar) {
    return;
  }

  const notificationButton = document.createElement('button');
  notificationButton.classList.add('ytp-button');
  notificationButton.title = 'Set Notification';

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width','100%');
  svg.setAttribute('height','100%');
  svg.setAttribute('fill','currentColor');
  svg.setAttribute('class','bi bi-alarm-fill');
  svg.setAttribute('viewBox','0 0 36 36');

  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d','M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5m2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.04 8.04 0 0 0 .86 5.387M11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.04 8.04 0 0 0-3.527-3.527');

  var useStyle = document.createElement('use');
  useStyle.className = 'ytp-svg-shadow';

  svg.appendChild(useStyle);
  svg.appendChild(path);
  svg.paddingTop = '50px';

  notificationButton.appendChild(svg);

  
  //notificationButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-alarm-fill" viewBox="0 0 36 36"><path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5m2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.04 8.04 0 0 0 .86 5.387M11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.04 8.04 0 0 0-3.527-3.527"/></svg>';


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
