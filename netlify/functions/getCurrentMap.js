const { google } = require('googleapis');
const sheets = google.sheets('v4');

// Load the credentials from the JSON key file
const credentials = require('goons.json');

const auth = new google.auth.JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// The ID of the Google Sheet you want to access
const spreadsheetId = '2PACX-1vRwLysnh2Tf7h2yHBc_bpZLQh6DiFZtDqyhHLYP022xolQUPUHkSModV31E5Y7cLh_8LZGexpXy2VuH';

auth.authorize(function (err) {
  if (err) {
    console.error('Authorization Error:', err);
    return;
  }

  sheets.spreadsheets.values.get(
    {
      auth: auth,
      spreadsheetId: spreadsheetId,
      range: 'Sheet1!A2:B2', // Specify the range you want to extract data from
    },
    function (err, response) {
      if (err) {
        console.error('The API returned an error:', err);
        return;
      }

      const values = response.data.values;
      if (!values || values.length === 0) {
        console.log('No data found.');
      } else {
        console.log('Data:');
        for (const row of values) {
          console.log(row.join('\t'));
        }
      }
    }
  );
});
