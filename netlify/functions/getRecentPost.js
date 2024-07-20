const fs = require('fs');
const axios = require('axios');

async function fetchData() {
    const options = {
        method: 'GET',
        url: 'https://instagram-looter2.p.rapidapi.com/user-feeds2',
        params: { id: '1548216509', count: '1' },
        headers: {
            'x-rapidapi-key': '0d5bc91b44msh27f6c54f345f353p15971ejsnb2754612e803',
            'x-rapidapi-host': 'instagram-looter2.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const shortcode = response.data.data.user.edge_owner_to_timeline_media.edges[0].node.shortcode;
        const result = `Fia's Recent IG Post: instagram.com/p/${shortcode}`;
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        return 'Failed to fetch data';
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
