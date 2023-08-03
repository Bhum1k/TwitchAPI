exports.handler = async (event, context) => {
  try {
    const currentMap = process.env.CURRENT_MAP;

    return {
      statusCode: 200,
      body: JSON.stringify({ "Current Map": currentMap }),
      headers: {
        'Content-Type': 'application/json',
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
