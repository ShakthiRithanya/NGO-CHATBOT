const express = require('express');
const router = express.Router();
const ChatLog = require('../models/ChatLog.model');
const NGO = require('../models/NGO.model');
const { getGeminiResponse, getSmartSuggestions } = require('../gemini');

// Local NGO Database (fallback when MongoDB is not available)
const localNGODatabase = [
    { name: "Akshaya Patra Foundation", location: "Chennai, Madurai, Coimbatore", category: "education", districts: ["Chennai", "Madurai", "Coimbatore", "Tiruchirappalli"], focus: "Mid-day meal program", contact: "chennai@akshayapatra.org", website: "www.akshayapatra.org" },
    { name: "Teach for India", location: "Chennai", category: "education", districts: ["Chennai"], focus: "Educational equity", contact: "chennai@teachforindia.org", website: "www.teachforindia.org" },
    { name: "Isha Vidhya", location: "Coimbatore", category: "education", districts: ["Coimbatore", "Erode"], focus: "Rural education", contact: "info@ishavidhya.org", website: "www.ishavidhya.org" },
];

// POST - Process chat message with Gemini AI (frontend endpoint)
router.post('/', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        // Try to extract category and district from the message
        let category = null;
        let district = null;
        const lowerMsg = message.toLowerCase();
        // Simple keyword matching for demo
        if (lowerMsg.includes('education')) category = 'education';
        if (lowerMsg.includes('health')) category = 'healthcare';
        if (lowerMsg.includes('environment')) category = 'environment';
        if (lowerMsg.includes('women')) category = 'women';
        if (lowerMsg.includes('child')) category = 'children';
        if (lowerMsg.includes('elderly')) category = 'elderly';
        if (lowerMsg.includes('disability')) category = 'disability';
        if (lowerMsg.includes('rural')) category = 'rural';
        if (lowerMsg.includes('animal')) category = 'animal_welfare';
        if (lowerMsg.includes('disaster')) category = 'disaster_relief';
        if (lowerMsg.includes('skill')) category = 'skill_development';

        // Districts (expand as needed)
        const districts = ["chennai", "madurai", "coimbatore", "tiruchirappalli", "erode", "vellore", "tiruvallur", "kanchipuram", "tirupur", "nilgiris"];
        for (const d of districts) {
            if (lowerMsg.includes(d)) {
                district = d.charAt(0).toUpperCase() + d.slice(1);
                break;
            }
        }

        // Get all NGOs - try MongoDB first, fallback to local data
        let allNGOs = [];
        try {
            allNGOs = await NGO.find({});
        } catch (dbError) {
            console.warn('MongoDB unavailable, using local NGO data:', dbError.message);
            allNGOs = localNGODatabase;
        }

        // Strict filter: only NGOs with category and district match
        let filteredNGOs = allNGOs;
        if (category && district) {
            filteredNGOs = allNGOs.filter(ngo =>
                ngo.category && ngo.category.toLowerCase() === category &&
                Array.isArray(ngo.districts) && ngo.districts.some(d => d.toLowerCase() === district.toLowerCase())
            );
        } else if (category) {
            filteredNGOs = allNGOs.filter(ngo => ngo.category && ngo.category.toLowerCase() === category);
        } else if (district) {
            filteredNGOs = allNGOs.filter(ngo => Array.isArray(ngo.districts) && ngo.districts.some(d => d.toLowerCase() === district.toLowerCase()));
        }

        // If both category and district are present, return filtered NGOs directly
        if (category && district) {
            if (filteredNGOs.length === 0) {
                return res.json({
                    success: true,
                    reply: `No NGOs found for category '${category}' in district '${district}'.`
                });
            }
            // Format the response for the frontend
            const reply = filteredNGOs.map(ngo =>
                `• <strong>${ngo.name}</strong> <br>Location: ${ngo.location}<br>Focus: ${ngo.focus}<br>Contact: ${ngo.contact}<br>Website: ${ngo.website}`
            ).join('<br><br>');
            return res.json({
                success: true,
                reply: `<h3>Education NGOs in Coimbatore</h3>${reply}`
            });
        }

        // Otherwise, use Gemini for general queries
        const aiResponse = await getGeminiResponse(message, filteredNGOs);
        res.json({
            success: true,
            reply: aiResponse
        });
    } catch (error) {
        console.error('Chat Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST - Process chat message and get response (legacy endpoint)
router.post('/message', async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message || !sessionId) {
            return res.status(400).json({
                success: false,
                message: 'Message and sessionId are required'
            });
        }

        // Process message and generate response
        const response = await processMessage(message);

        // Save chat log
        const chatLog = new ChatLog({
            sessionId,
            userMessage: message,
            botResponse: response.text,
            category: response.category,
            district: response.district,
            ngosRecommended: response.ngos ? response.ngos.map(ngo => ngo._id) : []
        });

        await chatLog.save();

        res.json({
            success: true,
            data: {
                response: response.text,
                ngos: response.ngos,
                quickReplies: response.quickReplies
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST - Submit feedback for a chat
router.post('/feedback', async (req, res) => {
    try {
        const { chatId, helpful, rating } = req.body;

        const chatLog = await ChatLog.findByIdAndUpdate(
            chatId,
            {
                'userFeedback.helpful': helpful,
                'userFeedback.rating': rating
            },
            { new: true }
        );

        if (!chatLog) {
            return res.status(404).json({
                success: false,
                message: 'Chat log not found'
            });
        }

        res.json({
            success: true,
            message: 'Feedback submitted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET - Chat history for a session
router.get('/history/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const chatHistory = await ChatLog.find({ sessionId })
            .populate('ngosRecommended')
            .sort({ timestamp: 1 });

        res.json({
            success: true,
            count: chatHistory.length,
            data: chatHistory
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Helper function to process messages
async function processMessage(message) {
    const messageLower = message.toLowerCase();

    // Greeting
    if (messageLower.match(/hello|hi|hey|வணக்கம்|vanakkam/)) {
        return {
            text: "வணக்கம்! 🙏 Hello! I'm your NGO assistant for Tamil Nadu. I can help you discover amazing organizations working across all 38 districts in 8 different categories.\n\nWhat would you like to know today?",
            quickReplies: ['Education NGOs 📚', 'Healthcare 🏥', 'NGOs in Chennai 📍', 'Volunteer Info 🤝']
        };
    }

    // Category queries
    const categories = ['education', 'healthcare', 'environment', 'women', 'children', 'elderly', 'disability', 'rural'];
    for (const category of categories) {
        if (messageLower.includes(category)) {
            const ngos = await NGO.find({ category }).limit(5);
            return {
                text: `Here are some ${category} NGOs in Tamil Nadu:`,
                ngos: ngos,
                category: category,
                quickReplies: ['Tell me more', 'Other categories', 'How to volunteer?']
            };
        }
    }

    // District queries
    const districts = ['chennai', 'coimbatore', 'madurai', 'salem', 'tiruchirappalli', 'tirunelveli'];
    for (const district of districts) {
        if (messageLower.includes(district)) {
            const ngos = await NGO.find({
                districts: { $regex: new RegExp(district, 'i') }
            }).limit(5);
            return {
                text: `Here are NGOs working in ${district}:`,
                ngos: ngos,
                district: district,
                quickReplies: ['Show more', 'Other districts', 'Categories']
            };
        }
    }

    // Volunteer queries
    if (messageLower.match(/volunteer|help|support|donate/)) {
        return {
            text: "That's wonderful! 🤝 You can volunteer or support NGOs in several ways:\n\n1. Contact NGOs directly using the contact information provided\n2. Visit their websites to learn about volunteer opportunities\n3. Donate to causes you care about\n4. Spread awareness about their work\n\nWould you like to see NGOs in a specific category or district?",
            quickReplies: ['Education NGOs', 'Healthcare NGOs', 'NGOs near me']
        };
    }

    // Default response
    return {
        text: "I can help you find NGOs by:\n\n📚 Category (Education, Healthcare, Environment, etc.)\n📍 District (Chennai, Coimbatore, Madurai, etc.)\n🤝 How to volunteer or donate\n\nWhat would you like to know?",
        quickReplies: ['Show categories', 'Find by district', 'How to help?']
    };
}

module.exports = router;
