// script.js
fetch('/.netlify/functions/getCurrentMap')
  .then(response => response.text()) // Use response.text() to get plain text
  .then(data => {
    const genieContainer = document.querySelector('div#__genieContainer');
    if (genieContainer) {
      // Access the shadowRoot of the genieContainer
      const shadowRoot = genieContainer.shadowRoot || genieContainer.attachShadow({ mode: 'open' });

      // Create a new text node with the map data
      const textNode = document.createTextNode(data || 'Data not available');

      // Clear the existing content and append the new text node
      shadowRoot.innerHTML = '';
      shadowRoot.appendChild(textNode);
    }
  })
  .catch(error => {
    const genieContainer = document.querySelector('div#__genieContainer');
    if (genieContainer) {
      // Access the shadowRoot of the genieContainer
      const shadowRoot = genieContainer.shadowRoot || genieContainer.attachShadow({ mode: 'open' });

      // Create a new text node with the error message
      const errorTextNode = document.createTextNode('Failed to fetch data');

      // Clear the existing content and append the new text node
      shadowRoot.innerHTML = '';
      shadowRoot.appendChild(errorTextNode);
    }
  });
