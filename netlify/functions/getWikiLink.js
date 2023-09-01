const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const response = await axios.get('https://www.tarkovpal.com/api');
    const data = response.data;
    const currentMap = data["Current Map"][0];

    // Set the environment variable
    process.env.CURRENT_MAP = currentMap;

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

