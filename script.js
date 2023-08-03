// script.js
fetch('/.netlify/functions/getCurrentMap')
  .then(response => response.json())
  .then(data => {
    const currentMapElement = document.getElementById('currentMap');
    currentMapElement.textContent = data.currentMap || 'Data not available';
  })
  .catch(error => {
    const currentMapElement = document.getElementById('currentMap');
    currentMapElement.textContent = 'Failed to fetch data';
  });
