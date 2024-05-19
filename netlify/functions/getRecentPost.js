const axios = require('axios');

// Set up your Instagram app credentials
const clientId = '928408632272255';
const clientSecret = 'c0b0773cbe4902fa339d51fb7a1e2934';
const redirectUri = 'https://calm-figolla-de51de.netlify.app/'; // This should be a URL specified in your Instagram app settings

// Exchange the authorization code for an access token
async function getAccessToken(authorizationCode) {
    try {
        const response = await axios.post('https://api.instagram.com/oauth/access_token', {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
            code: authorizationCode
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error.response.data);
        throw error;
    }
}

// Fetch user's media (posts) using the access token
async function fetchUserMedia(accessToken) {
    try {
        const response = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,permalink&access_token=${accessToken}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching user media:', error.response.data);
        throw error;
    }
}

// Extract link to the last post
function extractLastPostLink(media) {
    const lastPost = media.find(post => post.media_type === 'IMAGE' || post.media_type === 'VIDEO');
    if (lastPost) {
        return lastPost.permalink;
    } else {
        console.error('No posts found.');
        return null;
    }
}

// Example usage
async function main(authorizationCode) {
    try {
        const accessToken = await getAccessToken(authorizationCode);
        const media = await fetchUserMedia(accessToken);
        const lastPostLink = extractLastPostLink(media);
        if (lastPostLink) {
            console.log('Link to the last post:', lastPostLink);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Replace 'YOUR_AUTHORIZATION_CODE' with the authorization code obtained after user authentication
main('IGQWROU2ptRXN3NF9GWGgzcGxIZAUhSdlg3MGJHdWkzWGhyb3NiT0FiV29WZAlc4a09NYTVJbU96Nl9rQW93YmFpVEJfMHJsYmdYYk5nNDNLdlNIQm4tRldQWlcybVlkUlN4MDg5MmlWMG9sTks1NjZAqTFNfM0s4c1kZD');
