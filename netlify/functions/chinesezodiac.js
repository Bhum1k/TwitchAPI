const fs = require('fs');
const axios = require('axios');

async function returnOutput(year) {
    // Check if the input is a string and try to convert it to a number
    if (typeof year === 'string') {
        year = parseInt(year, 10);
    }

    // Check if the input is not a number or if it is NaN after conversion
    if (isNaN(year)) {
        return "Invalid input: Year must be a number";
    }

    const zodiacSigns = [
        "Rat",
        "Ox",
        "Tiger",
        "Rabbit",
        "Dragon",
        "Snake",
        "Horse",
        "Goat",
        "Monkey",
        "Rooster",
        "Dog",
        "Pig"
    ];

    // Chinese Zodiac cycle is 12 years
    const cycleLength = 12;

    // 1924 is the start of the current zodiac cycle
    const startYear = 1924;

    const index = (year - startYear) % cycleLength;
    let A = zodiacSigns[index >= 0 ? index : index + cycleLength];
    return `The Chinese Zodiac sign for the year ${year} is: ${A}`;
}

exports.handler = async (event, context) => {
    try {
        console.log('Event:', JSON.stringify(event)); // Log the entire event object for debugging

        const { queryStringParameters } = event;
        const queryTerm = queryStringParameters ? queryStringParameters.query : undefined;

        console.log('Query Term:', queryTerm); // Log queryTerm for debugging

        // Convert queryTerm to number
        const year = parseInt(queryTerm, 10);

        // Await the returnOutput call
        const output = await returnOutput(year);

        return {
            statusCode: 200,
            body: output,
            headers: {
                'Content-Type': 'text/plain',
            },
        };
    } catch (error) {
        console.error('Error:', error); // Log the error for debugging

        return {
            statusCode: 500,
            body: 'Failed to fetch data',
            headers: {
                'Content-Type': 'text/plain',
            },
        };
    }
};
