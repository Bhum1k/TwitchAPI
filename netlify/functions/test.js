const clientId = '928408632272255';
const redirectUri = 'http://localhost:3000/auth/callback';
const scope = 'user_profile,user_media'; // Specify the scope of access required
const state = 'YOUR_STATE'; // Optional, used for CSRF protection

const authorizationUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;

// Redirect the user to the authorization URL
window.location.href = authorizationUrl;
