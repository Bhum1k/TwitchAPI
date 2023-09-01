const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const response = await axios.get('https://tarkov-time.adam.id.au/api');
    const data = response.data;

    // Extract the time strings (HH:mm:ss) from the API response
    const leftTimeStr = data.left.split(' ')[1];
    const rightTimeStr = data.right.split(' ')[1];

    // Split the time strings into hours, minutes, and seconds
    const leftTimeParts = leftTimeStr.split(':');
    const rightTimeParts = rightTimeStr.split(':');

    // Convert the time parts to integers
    const leftHours = parseInt(leftTimeParts[0]);
    const leftMinutes = parseInt(leftTimeParts[1]);
    const rightHours = parseInt(rightTimeParts[0]);
    const rightMinutes = parseInt(rightTimeParts[1]);

    // Format the times in 12-hour format (h:mm a)
    const formattedLeftTime = `${leftHours % 12}:${leftMinutes.toString().padStart(2, '0')} ${leftHours >= 12 ? 'PM' : 'AM'}`;
    const formattedRightTime = `${rightHours % 12}:${rightMinutes.toString().padStart(2, '0')} ${rightHours >= 12 ? 'PM' : 'AM'}`;

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
