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
    }
}

returnOutput('masochist').then(result => {
    console.log(result);
});
