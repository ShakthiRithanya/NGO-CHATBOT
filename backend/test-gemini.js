const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const models = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-2.0-flash-exp', 'gemini-pro'];

    for (const m of models) {
        console.log(`\n--- Testing Model: ${m} ---`);
        try {
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("Hello, are you there?");
            const response = await result.response;
            console.log(`[SUCCESS] ${m}: ${response.text().substring(0, 50)}...`);
        } catch (err) {
            console.error(`[ERROR] ${m}: ${err.message}`);
            if (err.status) console.error(`Status: ${err.status}`);
        }
    }
}

testModels();
