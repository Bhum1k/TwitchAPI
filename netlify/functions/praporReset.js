const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const resetTime = await getResetTime();

    if (resetTime) {
      const resetTimeDate = new Date(resetTime);
      const currentTime = new Date();

      let timeDifference;
      let output;

      if (currentTime < resetTimeDate) {
        timeDifference = resetTimeDate - currentTime;
        output = formatTimeDifference(timeDifference);
      } else {
        timeDifference = currentTime - resetTimeDate;
        output = formatTimeDifference(timeDifference, true);
      }

      const jsonResponse = {
        statusCode: 200,
        body: {
          message: output,
          resetTime: resetTime,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      };

      return jsonResponse;
    } else {
      console.error('Reset time is not available.');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Reset time is not available.' }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }
  } catch (error) {
    console.error('Error in Lambda function:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};

// The rest of your code remains unchanged

function formatTimeDifference(timeDifference, isPreviousRestock) {
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const formattedTime = `${hours}h ${minutes % 60}m ${seconds % 60}s`;

  return isPreviousRestock
    ? `Time since previous restock: ${formattedTime}`
    : `Time until next restock: ${formattedTime}`;
}
