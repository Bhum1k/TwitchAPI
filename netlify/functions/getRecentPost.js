// https://rapidapi.com/neotank/api/instagram130

const fs = require('fs');
const axios = require('axios');

async function fetchData() {
    const options = {
        method: 'GET',
        url: 'https://instagram130.p.rapidapi.com/account-medias',
        params: {
            userid: '1548216509',
            first: '1'
        },
        headers: {
            'X-RapidAPI-Key': '0d5bc91b44msh27f6c54f345f353p15971ejsnb2754612e803',
            'X-RapidAPI-Host': 'instagram130.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(`Fia's Recent IG Post: https://www.instagram.com/p/${response.data.edges[0].node.shortcode}`)
        return (`Fia's Recent IG Post: https://www.instagram.com/p/${response.data.edges[0].node.shortcode}`);
    } catch (error) {
        return (error);
    }
}

// Call the async function to execute the code
fetchData();

exports.handler = async (event, context) => {
    try {
        const result = await fetchData();
        if (result) {
            console.log(result);
        }

        return {
            statusCode: 200,
            body: result,
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