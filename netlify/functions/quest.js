const axios = require('axios');


exports.handler = async function (event, context) {
    try {
        // Extract the query term from the request
        const { queryStringParameters } = event;
        const queryTerm = queryStringParameters && queryStringParameters.query;

        // If query term is provided, add it to the URL
        const baseUrl = "https://calm-figolla-de51de.netlify.app/.netlify/functions/quest";
        const url = queryTerm ? `${baseUrl}?query=${encodeURIComponent(queryTerm)}` : baseUrl;
        
        const yourProcessedData = queryTerm;

    
            marketUrl = `https://api.tarkov-market.app/api/v1/nightbot?x-api-key=6dJ67FuraCJjcxjd&q=${queryTerm}`;
            priceResponse = await axios.get(marketUrl);
            marketData = priceResponse.data;
            let output = marketData;
            if (marketData.includes("₽")) {
                let array = marketData.split(" ");
                concatenated = array.slice(0, -1).join(" ");
                output = concatenated;
        }
        

        return {
            statusCode: 200,
            //body: JSON.stringify({ message: "Success", data: yourProcessedData, returned: index}),
            body: output,
            headers: {
            'Content-Type': 'application/json',
        }
    };
} catch (error) {
    return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error", error: error.message }),
    };
};

function searchAmmo(query) {
    // Convert the query to lowercase for case-insensitive matching
    const lowercaseQuery = query.toLowerCase();

    // Split the query into individual terms
    const queryTerms = lowercaseQuery.split(/\s+/);

    // Initialize variables to store the best match and its index
    let bestMatch = '';
    let bestMatchIndex = -1;

    // Loop through the array to find the best match
    for (let i = 0; i < searchterms.length; i++) {
        const currentTerm = searchterms[i].toLowerCase();

        // Check if all query terms are present in the current term
        const allTermsPresent = queryTerms.every(term => currentTerm.includes(term));

        if (allTermsPresent) {
            // Update the best match if the current term is a better match
            if (currentTerm.length > bestMatch.length) {
                bestMatch = currentTerm;
                bestMatchIndex = i;
            }
        }
    }

    // Return the index of the best match
    return bestMatchIndex;
}