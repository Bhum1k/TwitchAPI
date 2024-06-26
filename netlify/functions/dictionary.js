const fs = require('fs');
const axios = require('axios');

async function returnOutput(query) {
    const url0 = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;

    try {
        const response = await axios.get(url0);
        const data = response.data;

        return (`${data[0].word} (${data[0].meanings[0].partOfSpeech}) - ${data[0].meanings[0].definitions[0].definition}`);
    } catch (error) {
        const url1 = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=8478128f-c2a2-4737-b81d-e0146f5392d9`;

        try {
            const response = await axios.get(url1);
            const data = response.data;
            return (`${query} (${data[0].fl}) - ${data[0].shortdef[0]}`);
    
        } catch (error) {
            const url2 = `https://www.dictionaryapi.com/api/v3/references/medical/json/${query}?key=d137241f-f3eb-4abd-9d30-28a6c627c414`;

            try {
                const response = await axios.get(url2);
                const data = response.data;
                return (`${data[0].meta.id} (${data[0].fl}) - ${data[0].shortdef[0]}`);
                
            } catch (error) {
                console.error('There was an error fetching the dictionary data:', error);
                return 'Word not found!!!';
            }
        }
    }
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
