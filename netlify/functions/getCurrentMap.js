const axios = require('axios');

// Replace with the URL of the published spreadsheet
const spreadsheetUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRwLysnh2Tf7h2yHBc_bpZLQh6DiFZtDqyhHLYP022xolQUPUHkSModV31E5Y7cLh_8LZGexpXy2VuH/pubhtml';

// Example range to fetch data from
const range = 'Sheet1!A2:B2';

// Construct the API endpoint
const apiUrl = `${spreadsheetUrl}?gid=0&single=true&range=${range}`;

// Make a GET request to fetch the data
axios
  .get(apiUrl)
  .then((response) => {
    const data = response.data;
    console.log('Data:', data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });