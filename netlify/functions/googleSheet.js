const axios = require('axios');
const fs = require('fs');

const url = 'https://www.goontracker.com/';
const outputFileName = 'output.html';

axios.get(url, { responseType: 'text' })
    .then(response => {
        const htmlContent = response.data;

        // Save HTML content to a file
        fs.writeFileSync(outputFileName, htmlContent, 'utf-8');
        console.log(`HTML content saved to ${outputFileName}`);
    })
    .catch(error => {
        console.error('Error fetching the page:', error);
    });
