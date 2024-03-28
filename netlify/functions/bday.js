// Import the required modules
const axios = require('axios');

// Main Lambda function
exports.handler = async (event, context) => {
    try {
        const CentralDateTimeData = await axios.get('https://decapi.me/misc/time?timezone=America/Chicago&format=F%20j,%20o,%20g:i:s%20a');
        const CentralDateTime = CentralDateTimeData.data;
        
        const BDayTime = "May 26, 2024, 0:00 am";
        
        const BDayTime = "May 26, 2024, 0:00:00 am";
        let output = '';

        // Parsing CentralDateTime and BDayTime into Date objects
        const currentDateTime = new Date(CentralDateTime);
        const bdayDateTime = new Date(BDayTime);

        // Setting the year of the bdayDateTime to match the current year
        bdayDateTime.setFullYear(currentDateTime.getFullYear());

        // Getting the time until the next birthday in milliseconds
        let timeUntilBday = bdayDateTime.getTime() - currentDateTime.getTime();

        // If the birthday has already passed this year, set it to next year
        if (timeUntilBday < 0) {
            bdayDateTime.setFullYear(bdayDateTime.getFullYear() + 1);
            timeUntilBday = bdayDateTime.getTime() - currentDateTime.getTime();
        }

        // Calculating days, hours, minutes, and seconds until the birthday
        const daysUntilBday = Math.floor(timeUntilBday / (1000 * 60 * 60 * 24));
        const remainingTime = timeUntilBday % (1000 * 60 * 60 * 24);
        const hoursUntilBday = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutesUntilBday = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const secondsUntilBday = Math.floor((remainingTime % (1000 * 60)) / 1000);

        let daysPlurality, hoursPlurality, minutesPlurality, secondsPlurality;

        if (daysUntilBday === 1) {
            daysPlurality = `day`;
        } else {
            daysPlurality = `days`;
        }

        if (hoursUntilBday === 1) {
            hoursPlurality = `hour`;
        } else {
            hoursPlurality = `hours`;
        }

        if (minutesUntilBday === 1) {
            minutesPlurality = `minute`;
        } else {
            minutesPlurality = `minutes`;
        }

        if (secondsUntilBday === 1) {
            secondsPlurality = `second`;
        } else {
            secondsPlurality = `seconds`;
        }

        if (
            currentDateTime.getMonth() === bdayDateTime.getMonth() &&
            currentDateTime.getDate() === bdayDateTime.getDate()
        ) {
            output = "It's today fiatheCheering fiatheCheering fiatheCheering";
        } else {
            if (daysUntilBday >= 1) {
                output = `${daysUntilBday} ${daysPlurality}, ${hoursUntilBday} ${hoursPlurality} and ${minutesUntilBday} ${minutesPlurality} away`;
            } else if (daysUntilBday === 0 && hoursUntilBday > 0) {
                output = `${hoursUntilBday} ${hoursPlurality} and ${minutesUntilBday} ${minutesPlurality} away`;
            } else if (hoursUntilBday === 0 && minutesUntilBday > 0) {
                output = `${minutesUntilBday} ${minutesPlurality} and ${secondsUntilBday} ${secondsPlurality} away`;
            } else if (minutesUntilBday === 0 && secondsUntilBday > 0) {
                output = `${secondsUntilBday} ${secondsPlurality} away`;
            }
        }

        const jsonResponse = {
            statusCode: 200,
            body: output, // Convert the body to a JSON-formatted string
            headers: {
                'Content-Type': 'text/plain',
            },
        };
        
        return jsonResponse;
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
