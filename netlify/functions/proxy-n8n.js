// netlify/functions/proxy-n8n.js

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const data = JSON.parse(event.body);

    const response = await fetch('https://parv27.app.n8n.cloud/webhook/upload-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const resText = await response.text();

    return {
      statusCode: response.status,
      body: resText
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Server Error: ${error.message}`
    };
  }
}
