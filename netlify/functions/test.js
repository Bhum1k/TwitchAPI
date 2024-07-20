const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://instagram-looter2.p.rapidapi.com/user-feeds2',
    params: { id: '1548216509', count: '1' },
    headers: {
        'x-rapidapi-key': '0d5bc91b44msh27f6c54f345f353p15971ejsnb2754612e803',
        'x-rapidapi-host': 'instagram-looter2.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
    const data = response.data;
    if (data && data.data && data.data.user && data.data.user.edge_owner_to_timeline_media &&
        data.data.user.edge_owner_to_timeline_media.edges &&
        data.data.user.edge_owner_to_timeline_media.edges.length > 0) {
        const node = data.data.user.edge_owner_to_timeline_media.edges[0].node;
        const shortcode = node.shortcode;
        console.log(shortcode);
    } else {
        console.log("Shortcode not found");
    }
}).catch(function (error) {
    console.error(error);
});
