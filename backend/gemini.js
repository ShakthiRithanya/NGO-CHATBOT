// Gemini AI Integration for NGO Chatbot
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Detect if text is in Tamil script
function isTamilText(text) {
    const tamilUnicodeRange = /[\u0B80-\u0BFF]/g;
    return tamilUnicodeRange.test(text);
}

// NGO Database context for AI with Tamil support
const ngoContext = `You are an intelligent and culturally-aware assistant for Tamil Nadu NGO Connect, a platform that helps people discover and connect with NGOs across Tamil Nadu, India.

You have access to a database of 78 NGOs across 11 categories:
- Education (10 NGOs) - பணியாக்கம்
- Healthcare (10 NGOs) - சுகாதாரம்
- Environment (9 NGOs) - சுற்றுச்சூழல்
- Women Empowerment (7 NGOs) - பெண் ஆதिকாரம்
- Child Welfare (8 NGOs) - குழந்தை நலன்
- Elderly Care (5 NGOs) - முதியவர் பராமரிப்பு
- Disability Support (6 NGOs) - மாற்றுக்ற்றம் உதவி
- Rural Development (7 NGOs) - கிராம மேம்பாடு
- Animal Welfare (2 NGOs) - விலங்கு நலன்
- Disaster Relief (2 NGOs) - பேரிடர் நிவாரணம்
- Skill Development (2 NGOs) - திறன் மேம்பாடு

The NGOs operate across 30+ districts in Tamil Nadu including Chennai, Coimbatore, Madurai, Tiruchirappalli, Vellore, and others.

TAMIL LANGUAGE HANDLING:
- Respond in the language the user writes in (Tamil, English, or mixed)
- If query contains Tamil, provide responses that honor Tamil cultural context
- Include Tamil terms and references when appropriate
- Recognize Tamil month names, festival names, and local references
- Be culturally sensitive to Tamil Nadu's social context

When users ask about NGOs:
1. Understand their intent (category, location, specific needs)
2. Provide relevant NGO recommendations with full details
3. Include contact details and location when appropriate
4. Be helpful, friendly, and professional
5. Use emojis to make responses engaging
6. For Tamil queries: Use Tamil phrases and demonstrate cultural understanding

Always respond in a structured, easy-to-read format.`;

// Function to get AI response
async function getGeminiResponse(userMessage, ngoDatabase) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const isTamil = isTamilText(userMessage);

        // Enhanced prompt with Tamil-specific instructions
        const tamilInstructions = isTamil ? `
IMPORTANT - User is writing in Tamil (or Tamil-English mix):
- Respond in Tamil if the query is primarily in Tamil
- Use appropriate Tamil culturally-sensitive language
- Include relevant Tamil terminology for NGO categories
- Show respect for Tamil cultural values and traditions
- If mentioning locations, use Tamil place names where appropriate
- Make references to Tamil Nadu's social development goals
` : '';

        const prompt = `${ngoContext}

${tamilInstructions}

    User Query: "${userMessage}"

    ONLY use the following NGO list to answer. Do NOT invent or generalize. If the list is empty, say no NGOs found for the query.

    NGO Database (JSON):
    ${JSON.stringify(ngoDatabase, null, 2)}

    Please provide a helpful, structured response. If the user is asking about specific NGOs in a category or district, ONLY list those in the provided NGO Database. Do not mention NGOs not in the list. Format your response with clear sections and use emojis.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error('Gemini AI Error:', error);
        throw error;
    }
}

// Function to get smart suggestions
async function getSmartSuggestions(userMessage) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const isTamil = isTamilText(userMessage);

        const languageNote = isTamil ? 
            "Generate suggestions in Tamil if the original query is in Tamil, otherwise in English." : 
            "";

        const prompt = `Based on this user query about NGOs in Tamil Nadu: "${userMessage}"

${languageNote}

Generate 3 helpful follow-up questions or suggestions the user might want to ask next. Keep them short (max 6 words each).

Format as JSON array: ["suggestion 1", "suggestion 2", "suggestion 3"]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON from response
        const suggestions = JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
        return suggestions;
    } catch (error) {
        console.error('Suggestions Error:', error);
        // Return culturally relevant default suggestions
        const isTamil = isTamilText(userMessage);
        return isTamil ? 
            ["அனைத்து பிரிவுகளைக் காட்டு", "மாவட்டப்படி தேடு", "தன்னார்வலராக குறிப்பிட"] :
            [
                "Show all categories",
                "Search by district",
                "How to volunteer?"
            ];
    }
}

module.exports = {
    getGeminiResponse,
    getSmartSuggestions
};
