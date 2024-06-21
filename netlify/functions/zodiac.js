const fs = require('fs');
const axios = require('axios');

function returnOutput(dateString) {
    // Define the zodiac signs and their date ranges
    const zodiacSigns = [
        { sign: "Capricorn", start: "12-22", end: "01-19" },
        { sign: "Aquarius", start: "01-20", end: "02-18" },
        { sign: "Pisces", start: "02-19", end: "03-20" },
        { sign: "Aries", start: "03-21", end: "04-19" },
        { sign: "Taurus", start: "04-20", end: "05-20" },
        { sign: "Gemini", start: "05-21", end: "06-20" },
        { sign: "Cancer", start: "06-21", end: "07-22" },
        { sign: "Leo", start: "07-23", end: "08-22" },
        { sign: "Virgo", start: "08-23", end: "09-22" },
        { sign: "Libra", start: "09-23", end: "10-22" },
        { sign: "Scorpio", start: "10-23", end: "11-21" },
        { sign: "Sagittarius", start: "11-22", end: "12-21" },
    ];

    // Check if the input is a string in the format "MM DD"
    if (typeof dateString !== 'string' || !/^\d{2} \d{2}$/.test(dateString)) {
        return "Invalid input: Date must be in the format 'MM DD'";
    }

    const [month, day] = dateString.split(' ').map(num => parseInt(num, 10));

    if (isNaN(month) || isNaN(day)) {
        return "Invalid input: Date must be in the format 'MM DD'";
    }

    const date = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    for (let i = 0; i < zodiacSigns.length; i++) {
        const { sign, start, end } = zodiacSigns[i];
        if (
            (date >= start && date <= "12-31") || (date >= "01-01" && date <= end)
        ) {
            return `The astrological Zodiac sign for the date ${dateString} is: ${sign}`;
        }
    }

    return "Invalid date: Unable to determine Zodiac sign";
}

exports.handler = async (event, context) => {
    try {
        const { queryStringParameters } = event;
        const queryTerm = queryStringParameters && queryStringParameters.query;

        console.log(queryTerm);

        // Await the returnOutput call
        const output = await returnOutput(queryTerm);

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
