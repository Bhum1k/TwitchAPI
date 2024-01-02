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

            let output = "";
    
            marketUrl = `https://api.tarkov-market.app/api/v1/nightbot?x-api-key=6dJ67FuraCJjcxjd&q=${queryTerm}`;
            try {
                priceResponse = await axios.get(marketUrl);
                marketData = priceResponse.data;
                output = marketData;
                if (marketData.includes("₽")) {
                    let array = marketData.split(" ");
                    concatenated = array.slice(0, -1).join(" ");
                    output = concatenated;
            } catch (error) {
                output = "ERROR"
            }

        }
        

        return {
            statusCode: 200,
            //body: JSON.stringify({ message: "Success", data: yourProcessedData, returned: index}),
            body: output,
            headers: {
            'Content-Type': 'application/json',
        }
    }; catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error", error: error.message }),
        };
    };

    // Return the index of the best match
    return bestMatchIndex;
    }
}