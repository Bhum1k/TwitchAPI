// script.js
fetch('/.netlify/functions/getCurrentMap')
  .then(response => response.text()) // Use response.text() to get plain text
  .then(data => {
    const genieContainer = document.querySelector('div#__genieContainer');
    if (genieContainer) {
      // Update the content of the genieContainer
      genieContainer.setAttribute('data-content', data || 'Data not available');
      // Trigger the extension to update its display (if it supports this method)
      if (typeof genieContainer.updateDisplay === 'function') {
        genieContainer.updateDisplay();
      }
    }
  })
  .catch(error => {
    const genieContainer = document.querySelector('div#__genieContainer');
    if (genieContainer) {
      genieContainer.setAttribute('data-content', 'Failed to fetch data');
      if (typeof genieContainer.updateDisplay === 'function') {
        genieContainer.updateDisplay();
      }
    }
  });
