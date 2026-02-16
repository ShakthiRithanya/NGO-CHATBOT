const axios = require('axios');
require('dotenv').config();

async function testGroq() {
    const key = process.env.GROQ_API_KEY;
    try {
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: "Say hello" }]
        }, {
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('[SUCCESS] Groq works:', response.data.choices[0].message.content);
    } catch (err) {
        console.error('[ERROR] Groq failed:', err.response?.data || err.message);
    }
}

testGroq();
