const fs = require('fs');
const axios = require('axios');

async function returnOutput(year) {
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
    return `The Chinese Zodiac sign for the year ${year} is: ${A}`
}


exports.handler = async (event, context) => {
    try {
        const { queryStringParameters } = event;
        const queryTerm = queryStringParameters && queryStringParameters.query;

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
