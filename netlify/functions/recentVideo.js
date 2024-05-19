const fetch = require('node-fetch');

async function getLatestVideo(apiKey, channelId) {
    try {
        // Fetch the uploads playlist ID for the channel
        const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`;
        let response = await fetch(channelUrl);
        let data = await response.json();

        if (data.items.length === 0) {
            console.error('No channel found with the provided ID.');
            return null;
        }

        const uploadsPlaylistId = data.items[0].contentDetails.relatedPlaylists.uploads;

        // Fetch the most recent video from the uploads playlist
        const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=1&key=${apiKey}`;
        response = await fetch(playlistUrl);
        data = await response.json();

        if (data.items.length === 0) {
            console.error('No videos found in the uploads playlist.');
            return null;
        }

        const latestVideo = data.items[0].snippet;
        const videoTitle = latestVideo.title;
        const videoId = latestVideo.resourceId.videoId;
        const videoUrl = `https://youtu.be/${videoId}`;

        const firstWord = videoTitle.split(' ')[0].toUpperCase();
        const resultString = `NEW FIA ${firstWord} VLOG: ${videoUrl}`;

        return resultString;
    } catch (error) {
        console.error('Error fetching the latest video:', error);
        return null;
    }
}

// Replace with your API key and channel ID
const API_KEY = 'AIzaSyBSY-QY0CMiiXmrdkWlmmy78NRkZ8gwE6s';
const CHANNEL_ID = 'UCOsc46KpYdy0zAKzPdLUokA';

// async function main() {
//     const result = await getLatestVideo(API_KEY, CHANNEL_ID);
//     if (result) {
//         console.log(result);
//     }
// }

main();

exports.handler = async (event, context) => {
    try {
        const result = await getLatestVideo(API_KEY, CHANNEL_ID);
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