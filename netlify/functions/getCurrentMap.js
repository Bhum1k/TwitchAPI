const fs = require('fs');
const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const response = await axios.get('https://www.tarkovpal.com/api');
    const data = response.data;
    const currentMap = data["Current Map"][0];

    // Write the raw text output to a file named 'output.txt'
    fs.writeFileSync('data.txt', currentMap, 'utf8');

    return {
      statusCode: 200,
      body: currentMap,
      headers: {
        'Content-Type': 'text/plain',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Failed to fetch data',
      headers: {
        'Content-Type': 'text/plain',
      },
    };
  }
};
