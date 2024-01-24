async function getResetTime() {
  try {
    const response = await fetch('https://api.tarkov.dev/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          traders(lang: en) {
            name
            resetTime
          }
        }`
      })
    });

    const data = await response.json();
    const resetTime = data?.data?.traders[0]?.resetTime;

    if (!resetTime) {
      console.error('Reset time not found in the API response:', data);
      return null; // or throw an error, depending on your desired behavior
    }

    return resetTime;
  } catch (error) {
    console.error('Error fetching reset time:', error);
    throw error;
  }
}

// Example usage:
async function fetchData() {
  try {
    const resetTime = await getResetTime();

    if (resetTime) {
      const resetTimeDate = new Date(resetTime);
      const currentTime = new Date();

      let timeDifference;
      let output;

      if (currentTime < resetTimeDate) {
        timeDifference = resetTimeDate - currentTime;
        output = formatTimeDifference(timeDifference);
      } else {
        timeDifference = currentTime - resetTimeDate;
        output = formatTimeDifference(timeDifference, true);
      }

      console.log(output);
    } else {
      console.error('Reset time is not available.');
    }
  } catch (error) {
    // Handle errors here
  }
}

fetchData(); // Call the fetchData function to initiate the process

function formatTimeDifference(timeDifference, isPreviousRestock) {
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const formattedTime = `${hours}h ${minutes % 60}m ${seconds % 60}s`;

  return isPreviousRestock
    ? `Time since previous restock: ${formattedTime}`
    : `Time until next restock: ${formattedTime}`;
}
