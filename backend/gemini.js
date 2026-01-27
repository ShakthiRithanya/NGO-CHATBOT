// Gemini AI Integration for NGO Chatbot
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
    const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro', 'gemini-pro'];
    let lastError = null;

    const prompt = `${ngoContext}

    User Query: "${userMessage}"

    ONLY use the following NGO list to answer. Do NOT invent or generalize. If the list is empty, say no NGOs found for the query.

    NGO Database (JSON):
    ${JSON.stringify(ngoDatabase, null, 2)}

    Please provide a helpful, structured response. If the user is asking about specific NGOs in a category or district, ONLY list those in the provided NGO Database. Do not mention NGOs not in the list. Format your response with clear sections and use emojis.`;

    for (const modelName of modelsToTry) {
        try {
            console.log(`[GEMINI] Attempting ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            if (text) {
                console.log(`[GEMINI] SUCCESS with ${modelName}`);
                return text;
            }
        } catch (error) {
            console.error(`[GEMINI] Failed ${modelName}:`, error.message);
            lastError = error;
            // If it's a 404, we continue to the next model
            if (error.message.includes('404') || error.message.includes('not found')) {
                continue;
            }
            // If it's an API key error (403/401), or other critical error, we might want to stop, 
            // but for now, we'll try all available names.
        }
    }

    throw lastError || new Error('All Gemini models failed');
}

// Function to get smart suggestions
async function getSmartSuggestions(userMessage) {
    try {
        // Try flash first for suggestions
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `Based on this user query about NGOs in Tamil Nadu: "${userMessage}"
Generate 3 helpful follow-up questions or suggestions the user might want to ask next. Keep them short (max 6 words each).
Format as JSON array: ["suggestion 1", "suggestion 2", "suggestion 3"]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
    } catch (error) {
        // Fallback suggestions
        return ["Show all categories", "Search by district", "How to volunteer?"];
    }
}

module.exports = {
    getGeminiResponse,
    getSmartSuggestions
};
