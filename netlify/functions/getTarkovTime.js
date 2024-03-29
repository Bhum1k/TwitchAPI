const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const response = await axios.get('https://tarkov-time.adam.id.au/api');
    const data = response.data;
    const left = data.left;
    const right = data.right;
    const left_slice = left.slice(0,-3);
    const right_slice = right.slice(0, -3);
    const output = left_slice.concat('/', right_slice);




    return {
      statusCode: 200,
      body: output,
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

