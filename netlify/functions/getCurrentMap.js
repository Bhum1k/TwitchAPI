const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const response = await axios.get('https://www.tarkovpal.com/api');
	const response2 = await axios.get('https://decapi.me/misc/time?timezone=America/Chicago&format=F%20j,%20o,%20g:i%20a')
    const data = response.data;
	const central = response2.data;
    const currentMap = data["Current Map"][0];
	const apiDate = data["Time"][0];
	
	const minutes = calculateTimeDifferenceInMinutes(apiDate, central);
	
	const output = currentMap.concat('(Last seen ', minutes, ' minutes ago)');

    // Set the environment variable
    process.env.CURRENT_MAP = currentMap;

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

// Function to calculate the time difference in minutes between two date strings
function calculateTimeDifferenceInMinutes(dateString1, dateString2) {
  // Parse the date strings into Date objects
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  // Calculate the time difference in milliseconds
  const timeDifferenceMs = date2 - date1;

  // Convert milliseconds to minutes
  const timeDifferenceMinutes = timeDifferenceMs / (1000 * 60);

  return Math.abs(timeDifferenceMinutes); // Use Math.abs to ensure a positive result
}

// Example usage
const dateString1 = "September 20, 2023, 1:26 am";
const dateString2 = "September 21, 2023, 2:45 pm";

const timeDifference = calculateTimeDifferenceInMinutes(dateString1, dateString2);
console.log(`Time difference in minutes: ${timeDifference}`);

