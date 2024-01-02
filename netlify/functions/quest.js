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

            let output = "FILL";
            if (queryTerm.length != 0) {
                marketUrl = `https://api.tarkov-market.app/api/v1/nightbot?x-api-key=6dJ67FuraCJjcxjd&q=${queryTerm}`;
                try {
                    priceResponse = await axios.get(marketUrl);
                    marketData = priceResponse.data;
                    console.log(marketData);
                    output = marketData;
                    if (marketData.includes("₽")) {
                        let array = marketData.split(" ");
                        concatenated = array.slice(0, -1).join(" ");
                        output = concatenated;
                    }
                }
                catch (error) {
                    output = "ERROR";
                }

                console.log(output);
            } else {
                output = "";
            }
            
        return {
            statusCode: 200,
            body: output,
            headers: {
            'Content-Type': 'text/plain',
        }
    }}
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error", error: error.message }),
        };
    };
}

return {
    statusCode: 200,
    body: output,
    headers: {
        'Content-Type': 'text/plain',
    },
};