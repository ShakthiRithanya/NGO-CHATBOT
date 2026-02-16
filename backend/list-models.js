const axios = require('axios');
require('dotenv').config();

async function listModels() {
    const key = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        const response = await axios.get(url);
        console.log('Available Models:');
        response.data.models.forEach(m => console.log(`- ${m.name}`));
    } catch (err) {
        console.error('Error listing models:', err.response?.data || err.message);
    }
}

listModels();
