const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const response = await axios.get('http://worldtimeapi.org/api/timezone/Europe/London');
    const data = response.data;
    const currentDateTime = new Date(data.utc_datetime);

    // Assuming the reset time is obtained from the Tarkov API as in your original code
    // Replace this with the actual reset time obtained from your Tarkov API call
    const resetTime = getResetTime(); // Replace with your implementation

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

// Helper function to format time difference
function formatTimeDifference(timeDifference, isPreviousRestock) {
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const formattedTime = `${hours}h ${minutes % 60}m ${seconds % 60}s`;

  return isPreviousRestock
    ? `Time since previous restock: ${formattedTime}`
    : `Time until next restock: ${formattedTime}`;
}

async function getResetTime() {
  try {
    const response = await fetch('https://api.tarkov.dev/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          traders(lang: en) {
            name
            resetTime
          }
        }`
      })
    });

    const data = await response.json();
    const resetTime = data['data']['traders'][0]['resetTime'];

    return resetTime;
  } catch (error) {
    console.error('Error fetching reset time:', error);
    throw error;
  }
}
