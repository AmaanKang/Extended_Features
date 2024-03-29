// content.js


//Create notification button on youtube player
function createNotificationButton(controlBar) {
  if (!controlBar) {
    return;
  }

  controlBar.style.display = 'flex';
  controlBar.style.alignItems = 'center';
   //Create the notification button element
  const notificationButton = document.createElement('button');
  notificationButton.classList.add('ytp-button');
  notificationButton.title = 'Set Notification';
  notificationButton.style.marginTop = '6%';
  notificationButton.style.marginLeft = '2%';

  //Create the svg for the notification button
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

  notificationButton.appendChild(svg);
  controlBar.appendChild(notificationButton);

  // Get the player element
  const player = document.querySelector('.html5-video-container');

  // Adjust the styles as needed
  if (player) {
    player.style.width = '100%'; // Set the width to 100%
    player.style.margin = '0'; // Remove any margin
    player.style.padding = '0'; // Remove any padding
  }

  //When notification button is clicked, then following method should play.
  notificationButton.addEventListener('click', function() {
    // Create a modal dialog
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.tabIndex = '-1';
    modal.role = 'dialog';
    modal.id = 'myModal';

    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog modal-dialog-centered';
    modalDialog.role = 'document';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';

    const modalTitle = document.createElement('h5');
    modalTitle.className = 'modal-title';
    modalTitle.innerHTML = 'Set Notification';
    modalTitle.style.fontSize = '25px';

    const closeButton = document.createElement('button');
    closeButton.className = 'close';
    closeButton.ariaLabel = 'Close';
    closeButton.dataDismiss = 'modal';

    const exitButton = document.createElement('span');
    exitButton.textContent = 'x';
    exitButton.style.fontSize = '20px';
    exitButton.style.cursor = 'pointer';
  

    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';

    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';

    const buttonSave = document.createElement('button');
    buttonSave.className = 'btn btn-primary';
    buttonSave.textContent = 'Save changes';
    buttonSave.style.fontSize = '20px';
    
    const buttonClose = document.createElement('button');
    buttonClose.className = 'btn btn-secondary';
    buttonClose.textContent = 'Close';
    buttonClose.style.fontSize = '20px';

    // Create a date picker
    const datePicker = document.createElement('input');
    datePicker.type = 'date';
    datePicker.style.fontSize = '20px';
    datePicker.style.paddingLeft = '4%';

    // Create a time picker
    const timePicker = document.createElement('input');
    timePicker.type = 'time';
    timePicker.style.fontSize = '20px';
    timePicker.style.paddingLeft = '4%';

    // Append the date picker, time picker, and buttons to the modal body
    modalBody.appendChild(datePicker);
    modalBody.appendChild(timePicker);

    modalFooter.appendChild(buttonSave);
    modalFooter.appendChild(buttonClose);

    closeButton.appendChild(exitButton);

  
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);

    modal.appendChild(modalDialog);
    document.body.appendChild(modal);
    
    //The modal should show when the button has been clicked.
    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();

    myModal._element.addEventListener('hidden.bs.modal', function(){
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }
    });

    // Implement your notification setting logic here
    buttonSave.addEventListener('click', function(event) {
      event.preventDefault();

      // Check if the date and time picker are empty
      if (!datePicker.value) {
        // If they are, change their border color to red
        datePicker.style.borderColor = 'red';
      }else if(!timePicker.value) {
        timePicker.style.borderColor = 'red';
      } else {
        // If they are not, reset their border color
        datePicker.style.borderColor = timePicker.style.borderColor = 'black';
        const dateTime = new Date(`${datePicker.value}T${timePicker.value}`);

        const url = window.location.href;
        // Send a message to the background script to schedule the alarm
        chrome.runtime.sendMessage({ dateTime: dateTime.toISOString(), url:url});
        alert(`Notification set for ${dateTime}`);
        // Remove the modal dialog
        myModal.dispose();
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
      }
    });

    // Remove the modal dialog when the cancel button is clicked
    buttonClose.addEventListener('click', function() {
      myModal.dispose();
      document.body.removeChild(modal);
      document.body.style.overflow = 'auto';
    });

    // Remove the modal dialog when the close button is clicked
    exitButton.addEventListener('click', function() {
      myModal.dispose();
      document.body.removeChild(modal);
      document.body.style.overflow = 'auto';
    });
  });
}

//Filter the loaded comments under a youtube video
function filterComments(query){
  const allComments = document.querySelectorAll('ytd-comment-thread-renderer');
  const countText = document.querySelector('#count');
  const wholeCountText = countText.querySelector('yt-formatted-string');
  const countSpan = document.createElement('span');
  countSpan.className = 'style-scope yt-formatted-string';
  countSpan.dir = 'auto';
  var count = 0;
  allComments.forEach(function(comment) {
    const commentContent = comment.querySelector('#content-text');
    if(commentContent.textContent.toLowerCase().includes(query.toLowerCase())){
      comment.style.display = '';
      count++;
    }else{
      comment.style.display = 'none';
    }
  });
  if(wholeCountText){
    countSpan.innerHTML = count;
    wholeCountText.appendChild(countSpan);
  }

}

//Create the search bar to type in the keyword and search comments
function createSearchComments(commentBox){
  // Check if the search bar already exists
  if (commentBox.querySelector('input[type="text"]')) {
    return;
  }

  // Create a Search Bar Div
  const searchSection = document.createElement('div');
  searchSection.style.marginTop = '2%';

  // Create the search bar
  const searchBar = document.createElement('input');
  searchBar.type = 'text';
  searchBar.placeholder = 'Search comments...';
  searchBar.style.fontSize = '15px';
  searchBar.style.width = '100%';
  searchBar.style.paddingLeft = '2%';

  searchSection.appendChild(searchBar);
  // Insert the search bar at the beginning of the comments section
  if (commentBox.firstChild) {
    commentBox.insertBefore(searchSection, commentBox.firstChild);
  } else {
    commentBox.appendChild(searchSection);
  }

  // Listen for the 'input' event on the search bar
  searchBar.addEventListener('input', function() {
    filterComments(searchBar.value);
  });
}

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    // Check if nodes were added
    if (mutation.addedNodes.length) {
      //Disable shorts
      let shortsElement = document.querySelector('ytd-reel-shelf-renderer');
      if (shortsElement) {
        shortsElement.style.display = "none";
      }
      const commentsElement = document.querySelector('ytd-comments#comments');
      if (commentsElement) {
          createSearchComments(commentsElement);
      }
      // Get the control bar
      const controlBar = document.querySelector('.ytp-right-controls');

      // If the control bar exists and doesn't already have the notification button, create it
      if (controlBar && !controlBar.querySelector('.bi-alarm-fill')) {
        createNotificationButton(controlBar);
      }
    }
  });
});

// Start observing the body for changes in the child list
observer.observe(document.body, { childList: true, subtree: true });

// Create the IntersectionObserver to watch for comments
const commentsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    // When a comment becomes visible in the viewport, apply the filter
    if (entry.isIntersecting) {
      filterComments(searchBar.value);
    }
  });
}, {
  root: null, // Use the viewport as the root
  threshold: 0.05 // Call the callback when at least 5% of the comment is visible
});

// Start observing the comments section
const allComments = document.querySelectorAll('ytd-comment-thread-renderer');
allComments.forEach(function(comment) {
  commentsObserver.observe(comment);
});



