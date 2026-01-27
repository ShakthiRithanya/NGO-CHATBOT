// Translation module using Groq API
const axios = require('axios');

// Initialize Groq API
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Detect if text is in Tamil script
function isTamilText(text) {
    if (!text) return false;
    const tamilUnicodeRange = /[\u0B80-\u0BFF]/g;
    return tamilUnicodeRange.test(text);
}

// Translate Tamil to English using Groq
async function translateTamilToEnglish(text) {
    try {
        if (!isTamilText(text)) {
            return text;
        }

        const response = await axios.post(GROQ_API_URL, {
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert Tamil linguist specializing in formal (Senthamil) and colloquial Tamil. Translate the user text into clear, modern English. Preserve the original meaning and nuances. Provide ONLY the translation.'
                },
                {
                    role: 'user',
                    content: text
                }
            ],
            temperature: 0.1,
            max_tokens: 1024
        }, {
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const translatedText = response.data.choices[0].message.content.trim();
        console.log(`[TRANSLATION SUCCESS] Tamil -> English: "${text.substring(0, 20)}..." -> "${translatedText.substring(0, 20)}..."`);
        return translatedText;
    } catch (error) {
        console.error('Translation Error (Tamil to English):', error.response?.data || error.message);
        return text;
    }
}

// Translate English to Tamil using Groq
async function translateEnglishToTamil(text) {
    try {
        const response = await axios.post(GROQ_API_URL, {
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional English-to-Tamil translator. Translate the text into clear, modern Tamil. Provide ONLY the translation.'
                },
                {
                    role: 'user',
                    content: text
                }
            ],
            temperature: 0.1,
            max_tokens: 1024
        }, {
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const translatedText = response.data.choices[0].message.content.trim();
        console.log(`English to Tamil: "${text}" -> "${translatedText}"`);
        return translatedText;
    } catch (error) {
        console.error('Translation Error (English to Tamil):', error.message);
        return text;
    }
}

module.exports = {
    isTamilText,
    translateTamilToEnglish,
    translateEnglishToTamil
};
