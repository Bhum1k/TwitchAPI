const fs = require('fs');

// Load the JSON data from the file
const jsonData = fs.readFileSync('instagram_medias.json', 'utf8');

// Parse the JSON data
const data = JSON.parse(jsonData);

// Access the shortcode within the node
const shortcode = data.edges[0].node.shortcode

// Print the shortcode to verify
console.log(`https://www.instagram.com/p/${shortcode}`);
