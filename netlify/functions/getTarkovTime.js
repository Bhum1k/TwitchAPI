const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const response = await axios.get('https://tarkov-time.adam.id.au/api');
    const data = response.data;

    // Parse the times as Date objects
    const leftTime = new Date(data.left);
    const rightTime = new Date(data.right);

    // Format the times in 12-hour format (h:mm a)
    const formattedLeftTime = leftTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const formattedRightTime = rightTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    // Combine the formatted times into a single string
    const result = `${formattedLeftTime}/${formattedRightTime}`;

    return {
      statusCode: 200,
      body: result,
      headers: {
        'Content-Type': 'text/plain',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Failed to fetch and format data',
      headers: {
        'Content-Type': 'text/plain',
      },
    };
  }
};
