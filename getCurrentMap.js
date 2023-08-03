const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const response = await axios.get('https://www.tarkovpal.com/api');
    const data = response.data;
    const currentMap = data["Current Map"][0];

    return {
      statusCode: 200,
      body: JSON.stringify({ currentMap }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
