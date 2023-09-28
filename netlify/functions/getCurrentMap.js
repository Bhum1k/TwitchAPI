const { google } = require('googleapis');
const sheets = google.sheets('v4');

// Replace with your own API key
const apiKey = 'AIzaSyB6_vmv4e2C-a1J8hrEmzZscAtx2S4A61g';

// The ID of the Google Spreadsheet
const spreadsheetId = '2PACX-1vRwLysnh2Tf7h2yHBc_bpZLQh6DiFZtDqyhHLYP022xolQUPUHkSModV31E5Y7cLh_8LZGexpXy2VuH';

// The range of cells to fetch data from (A2:B2 in this case)
const range = 'Sheet1!A2:B2';

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

exports.handler = async (event, context) => {
  try {
    const sheetsApi = google.sheets({ version: 'v4', auth: apiKey });
    const response = await sheetsApi.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const values = response.data.values;
    if (!values || values.length < 1 || values[0].length < 2) {
      throw new Error('Invalid data format in the Google Spreadsheet');
    }

    const currentMap = values[0][0];
    const apiDate = values[0][1];

    // Fetch current time
    const response2 = await axios.get('https://decapi.me/misc/time?timezone=America/Chicago&format=F%20j,%20o,%20g:i%20a');
    const central = response2.data;

    const minutes = calculateTimeDifferenceInMinutes(apiDate, central);

    const output = values;

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
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: 'Failed to fetch data',
      headers: {
        'Content-Type': 'text/plain',
      },
    };
  }
};
