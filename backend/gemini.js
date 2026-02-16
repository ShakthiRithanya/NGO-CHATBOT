const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Groq fallback configuration
const useGroqFallback = async (prompt, model = "llama-3.1-8b-instant") => {
    try {
        console.log(`[AI-FALLBACK] Attempting Groq with model ${model}...`);
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 1024
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('[AI-FALLBACK] Groq failed:', error.response?.data || error.message);
        throw error;
    }
};

// NGO Database context for AI
const ngoContext = `You are a helpful assistant for Tamil Nadu NGO Connect.
Your primary goal is to help people discover and connect with NGOs across Tamil Nadu.

KNOWLEDGE BASE:
- You help with categories like Education, Healthcare, Environment, Women Empowerment, Child Welfare, Elderly Care, Disability Support, Rural Development, Animal Welfare, Disaster Relief, and Skill Development.
- You cover all 38 districts of Tamil Nadu.

BILINGUAL CAPABILITY:
- You are fluent in both English and Tamil.
- If the user asks in Tamil, reply in Tamil.
- If the user asks in English, reply in English.
- Use a warm, professional, and encouraging tone.

RESPONSE GUIDELINES:
1. Full Details: For every NGO you mention, ALWAYS include their Focus, Location, Impact, Contact Email, and Website URL.
2. Structure: Use bullet points and bold text for readability.
3. Analytical Queries: If a user asks for "highest impact", "best", "most students", or "largest area", analyze the 'impact' and 'focus' fields in the provided database to determine the answer. Explain WHY you chose that NGO based on the data.
4. Engaging: Use relevant emojis to make the conversation friendly.
5. Accuracy: ONLY use the NGO data provided to you. If no NGOs match, suggest expanding the search.`;

// Function to get AI response with multi-model fallback
async function getGeminiResponse(userMessage, ngoDatabase) {
    const prompt = `${ngoContext}

    User Query: "${userMessage}"

    ONLY use the following NGO list to answer. Do NOT invent or generalize. If the list is empty, say no NGOs found for the query.

    NGO Database (JSON):
    ${JSON.stringify(ngoDatabase, null, 2)}

    Please provide a helpful, structured response. Format your response with clear sections and use emojis.`;

    try {
        console.log(`[GEMINI] Attempting gemini-1.5-flash...`);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.warn(`[GEMINI] Failed! Reason: ${error.message}. Switching to Groq fallback...`);
        return await useGroqFallback(prompt);
    }
}

// Function to get smart suggestions
async function getSmartSuggestions(userMessage) {
    const prompt = `Based on this user query about NGOs in Tamil Nadu: "${userMessage}"
    Generate 3 helpful follow-up questions or suggestions the user might want to ask next. Keep them short (max 6 words each).
    Format as JSON array: ["suggestion 1", "suggestion 2", "suggestion 3"]`;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
    } catch (error) {
        try {
            const groqRes = await useGroqFallback(prompt);
            return JSON.parse(groqRes.replace(/```json\n?|\n?```/g, ''));
        } catch (f) {
            return ["Show all categories", "Search by district", "How to volunteer?"];
        }
    }
}

// Function to generate event details from user input
async function generateEventDetails(userInput) {
    const prompt = `Based on this user request for an NGO event: "${userInput}"
    Create a detailed event plan for an Indian NGO context.
    Current date: ${new Date().toISOString()}
    
    Requirements:
    1. Appropriate title.
    2. Realistic date and time in the future.
    3. Detailed description (2-3 sentences).
    4. Location within Tamil Nadu.
    5. Specific category (Education, Healthcare, etc.).
    6. A descriptive prompt for an image generator for a professional poster.

    Format your response STRICTLY as a valid JSON object:
    {
        "title": "string",
        "date": "ISO-8601 string",
        "description": "string",
        "location": "string",
        "category": "string",
        "posterPrompt": "string"
    }`;

    try {
        console.log(`[GEMINI] Attempting event generation...`);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
        throw new Error('No JSON in response');
    } catch (error) {
        console.warn(`[GEMINI] Event generation failed! Switching to Groq...`);
        // Use a powerful model for JSON structure
        const groqRes = await useGroqFallback(prompt, "llama-3.3-70b-versatile");
        const jsonMatch = groqRes.match(/\{[\s\S]*\}/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
        throw new Error('All AI providers failed to generate valid event JSON');
    }
}

module.exports = {
    getGeminiResponse,
    getSmartSuggestions,
    generateEventDetails
};
