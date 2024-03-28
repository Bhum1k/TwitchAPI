// Import the required modules
const axios = require('axios');

// Helper function to fetch the reset time from the Tarkov API
async function getResetTime() {
  try {
    const response = await axios.post('https://api.tarkov.dev/graphql', {
      query: `{
        traders(lang: en) {
          name
          resetTime
        }
      }`,
    });

    const data = response.data;
    const resetTime = data?.data?.traders[0]?.resetTime;

    if (!resetTime) {
      console.error('Reset time not found in the API response:', data);
      return null;
    }

    return resetTime;
  } catch (error) {
    console.error('Error fetching reset time:', error);
    throw error;
  }
}

// Main Lambda function
exports.handler = async (event, context) => {
  try {
    const resetTime = await getResetTime();

    if (resetTime) {
      const resetTimeDate = new Date(resetTime);
      const currentTime = new Date();

      let timeDifference;
      let output = `Balls`;



      const jsonResponse = {
        statusCode: 200,
        body: output, // Convert the body to a JSON-formatted string
        headers: {
          'Content-Type': 'text/plain',
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
