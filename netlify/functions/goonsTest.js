const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event, context) => {
    try {
        const response2 = await axios.get('https://decapi.me/misc/time?timezone=America/New_York&format=n/j/o%20G:i:s')
        const central = response2.data;
        const data = await scraping();
        
        const currentMap = data[2];
        const apiDate = data[1];
        console.log(currentMap);
        console.log(apiDate);
        const minutes = calculateTimeDifferenceInMinutes(apiDate, central);

        const output = currentMap.concat(' reported ', minutes, ' minutes ago');
        console.log(output);
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
    const timeDifferenceMinutes = Math.floor(timeDifferenceMs / (1000 * 60));
    return Math.abs(timeDifferenceMinutes); // Use Math.abs to ensure a positive result
}

function split(str, index) {
    const result = [str.slice(0, index), str.slice(index)];

    return result;
}


async function scraping() {
    const resposne = await axios.request({
        method: "GET",
        url: "https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vR-wIQI351UH85ILq5KiCLMMrl0uHRmjDinBCt6nXGg5exeuCxQUf8DTLJkwn7Ckr8-HmLyEIoapBE5/pubhtml/sheet?headers=false&gid=1420050773"
    });

    const $ = cheerio.load(resposne.data);

    const element = $(".s0").text();
    const [first, second] = split(element, 23);
    const dataArr = second.match(/(\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}:\d{2}:\d{2})([A-Za-z]+)/);
    return dataArr
}