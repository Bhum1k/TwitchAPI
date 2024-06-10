const fs = require('fs');
const axios = require('axios');

async function returnOutput(query) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        return (`${data[0].word} (${data[0].meanings[0].partOfSpeech}) - ${data[0].meanings[0].definitions[0].definition}`);
    } catch (error) {
        console.error('There was an error fetching the dictionary data:', error);
        return 'Word not found!!!';
    }
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
