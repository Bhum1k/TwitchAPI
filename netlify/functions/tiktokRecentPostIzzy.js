// https://rapidapi.com/tikwm-tikwm-default/api/tiktok-scraper7

const fs = require('fs');
const axios = require('axios');

async function fetchData() {
    const options = {
        method: 'GET',
        url: 'https://tiktok-scraper7.p.rapidapi.com/user/posts',
        params: {
            user_id: '6769032858113803269',
            count: '1',
            cursor: '0'
        },
        headers: {
            'X-RapidAPI-Key': '0d5bc91b44msh27f6c54f345f353p15971ejsnb2754612e803',
            'X-RapidAPI-Host': 'tiktok-scraper7.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const videoId = response.data.data.videos[0].video_id;
        console.log(`Izzy's Recent TikTok: tiktok.com/@izzytwig/video/${videoId}`);
        return `Izzy's Recent TikTok: tiktok.com/@izzytwig/video/${videoId}`;
    } catch (error) {
        console.error('Error fetching data:', error);
        return error;
    }
}

// Call the async function to execute the code
// fetchData();



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
            body: '',
            headers: {
                'Content-Type': 'text/plain',
            },
        };
    }
};