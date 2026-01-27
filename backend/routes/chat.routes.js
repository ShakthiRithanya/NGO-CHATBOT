const express = require('express');
const router = express.Router();
const ChatLog = require('../models/ChatLog.model');
const NGO = require('../models/NGO.model');
const { getGeminiResponse, getSmartSuggestions } = require('../gemini');
const { isTamilText, translateTamilToEnglish, translateEnglishToTamil } = require('../translation');

// Local NGO Database (fallback when MongoDB is not available)
const localNGODatabase = [
    // Education
    { name: "Akshaya Patra Foundation", location: "Chennai, Madurai, Coimbatore", category: "education", focus: "Mid-day meal program for school children", impact: "Serves 1.8 million children daily across Tamil Nadu", contact: "chennai@akshayapatra.org", website: "www.akshayapatra.org", districts: ["Chennai", "Madurai", "Coimbatore", "Tiruchirappalli"] },
    { name: "Teach for India", location: "Chennai", category: "education", focus: "Educational equity through fellowship program", impact: "Reaching 10,000+ students in underserved communities", contact: "chennai@teachforindia.org", website: "www.teachforindia.org", districts: ["Chennai"] },
    { name: "Pratham Tamil Nadu", location: "Chennai, Tiruvallur, Kanchipuram", category: "education", focus: "Improving reading and math skills for children", impact: "Impacting 75,000+ children annually", contact: "tamilnadu@pratham.org", website: "www.pratham.org", districts: ["Chennai", "Tiruvallur", "Kanchipuram"] },
    { name: "Isha Vidhya", location: "Coimbatore, Erode, Tirupur", category: "education", focus: "Rural education and computer literacy", impact: "Operating 206 schools across Tamil Nadu", contact: "info@ishavidhya.org", website: "www.ishavidhya.org", districts: ["Coimbatore", "Erode", "Tirupur", "Nilgiris"] },
    { name: "Nanban Foundation", location: "Chennai", category: "education", focus: "Education and skill development for underprivileged", impact: "Supporting 5,000+ students with scholarships", contact: "info@nanbanfoundation.org", website: "www.nanbanfoundation.org", districts: ["Chennai", "Tiruvallur"] },
    { name: "Sevalaya", location: "Tiruvallur", category: "education", focus: "Education, healthcare and community development", impact: "Educating 2,000+ rural children", contact: "sevalayakasuva@gmail.com", website: "www.sevalaya.org", districts: ["Tiruvallur", "Chennai"] },
    { name: "Bhumi", location: "Chennai, Coimbatore", category: "education", focus: "Volunteer-driven education support", impact: "Reaching 15,000+ children through volunteers", contact: "chennai@bhumi.ngo", website: "www.bhumi.ngo", districts: ["Chennai", "Coimbatore", "Madurai"] },
    { name: "Agaram Foundation", location: "Chennai", category: "education", focus: "Higher education scholarships for rural students", impact: "Supporting 10,000+ students with college education", contact: "info@agaramfoundation.org", website: "www.agaramfoundation.org", districts: ["Chennai", "Tiruvallur", "Kanchipuram"] },
    { name: "Aseema Charitable Trust", location: "Chennai", category: "education", focus: "Education for underprivileged children", impact: "Educating 3,000+ children", contact: "info@aseema.org", website: "www.aseema.org", districts: ["Chennai"] },
    { name: "Shanti Bhavan", location: "Vellore", category: "education", focus: "Residential education for disadvantaged children", impact: "Transforming lives of 300+ children", contact: "info@shantibhavan.org", website: "www.shantibhavan.org", districts: ["Vellore"] },

    // Healthcare
    { name: "Aravind Eye Care System", location: "Madurai, Coimbatore, Tirunelveli", category: "healthcare", focus: "Eye care and cataract surgeries", impact: "Performed 5+ million eye surgeries, 60% free", contact: "info@aravind.org", website: "www.aravind.org", districts: ["Madurai", "Coimbatore", "Tirunelveli"] },
    { name: "TANKER Foundation", location: "Chennai", category: "healthcare", focus: "Kidney disease awareness and dialysis support", impact: "Providing free dialysis to 1,500+ patients monthly", contact: "info@tankerfoundation.org", website: "www.tankerfoundation.org", districts: ["Chennai", "Kanchipuram", "Tiruvallur"] },
    { name: "Sankara Nethralaya", location: "Chennai", category: "healthcare", focus: "Comprehensive eye care services", impact: "Treating 2,000+ patients daily", contact: "info@sankaranethralaya.org", website: "www.sankaranethralaya.org", districts: ["Chennai"] },
    { name: "Ganga Hospital Foundation", location: "Coimbatore", category: "healthcare", focus: "Trauma care and reconstructive surgery", impact: "Treating 60,000+ patients annually", contact: "info@gangahospital.com", website: "www.gangahospital.com", districts: ["Coimbatore", "Tirupur", "Erode"] },
    { name: "Arogya World", location: "Chennai", category: "healthcare", focus: "Diabetes and chronic disease prevention", impact: "Reaching 1 million+ people with health education", contact: "info@arogyaworld.org", website: "www.arogyaworld.org", districts: ["Chennai", "Kanchipuram"] },

    // Environment
    { name: "Environmentalist Foundation of India (EFI)", location: "Chennai", category: "environment", focus: "Lake and water body restoration", impact: "Restored 95+ water bodies across Tamil Nadu", contact: "efi@efiglobal.org", website: "www.efiglobal.org", districts: ["Chennai", "Kanchipuram", "Tiruvallur", "Chengalpattu"] },
    { name: "Isha Outreach - Project GreenHands", location: "Coimbatore", category: "environment", focus: "Tree plantation and green cover", impact: "Planted 35+ million trees across Tamil Nadu", contact: "pgh@ishafoundation.org", website: "www.projectgreenhands.org", districts: ["Coimbatore", "Erode", "Tirupur", "Nilgiris", "Karur"] },
    { name: "Care Earth Trust", location: "Chennai", category: "environment", focus: "Wildlife conservation and biodiversity", impact: "Protecting 60+ endangered species", contact: "info@careearthtrust.org", website: "www.careearthtrust.org", districts: ["Chennai", "Kanchipuram", "Tiruvallur"] },
    { name: "Nizhal", location: "Chennai", category: "environment", focus: "Urban greening and tree conservation", impact: "Planted 150,000+ trees in urban areas", contact: "info@nizhal.org", website: "www.nizhal.org", districts: ["Chennai"] },

    // Women
    { name: "SEWA Tamil Nadu", location: "Chennai, Tiruchirappalli, Thanjavur", category: "women", focus: "Women's economic empowerment and livelihoods", impact: "Supporting 30,000+ women entrepreneurs", contact: "sewa.tn@gmail.com", website: "www.sewa.org", districts: ["Chennai", "Tiruchirappalli", "Thanjavur", "Madurai"] },
    { name: "Working Women's Forum", location: "Chennai", category: "women", focus: "Microfinance and women's rights advocacy", impact: "Empowering 120,000+ women", contact: "info@workingwomensforum.org", website: "www.workingwomensforum.org", districts: ["Chennai", "Kanchipuram", "Tiruvallur"] },
    { name: "Hand in Hand India", location: "Chennai, Kanchipuram", category: "women", focus: "Women's self-help groups and microfinance", impact: "Empowering 500,000+ women", contact: "info@hihseed.org", website: "www.hihseed.org", districts: ["Chennai", "Kanchipuram", "Tiruvallur", "Villupuram"] },

    // Children
    { name: "CRY - Child Rights and You", location: "Chennai", category: "children", focus: "Child rights, education and protection", impact: "Impacting 250,000+ children", contact: "chennai@cry.org", website: "www.cry.org", districts: ["Chennai", "Kanchipuram", "Tiruvallur", "Vellore"] },
    { name: "Udavum Karangal", location: "Chennai", category: "children", focus: "Orphan care, rehabilitation and education", impact: "Caring for 1,200+ children and elderly", contact: "info@udavumkarangal.org", website: "www.udavumkarangal.org", districts: ["Chennai"] },
    { name: "Bala Mandir Kamaraj", location: "Chennai", category: "children", focus: "Orphanage and child education", impact: "Caring for 500+ orphaned children", contact: "info@balamandir.org", website: "www.balamandir.org", districts: ["Chennai"] },

    // Elderly Care
    { name: "HelpAge India", location: "Chennai, Madurai, Coimbatore", category: "elderly", focus: "Elderly care, healthcare and advocacy", impact: "Serving 60,000+ senior citizens", contact: "chennai@helpageindia.org", website: "www.helpageindia.org", districts: ["Chennai", "Madurai", "Coimbatore", "Tiruchirappalli"] },
    { name: "Dignity Foundation", location: "Chennai", category: "elderly", focus: "Active ageing and elderly empowerment", impact: "Engaging 15,000+ senior citizens", contact: "chennai@dignityfoundation.com", website: "www.dignityfoundation.com", districts: ["Chennai", "Kanchipuram"] },

    // Disability
    { name: "Vidya Sagar", location: "Chennai", category: "disability", focus: "Cerebral palsy and multiple disabilities support", impact: "Supporting 2,500+ children with disabilities", contact: "info@vidyasagar.org", website: "www.vidyasagar.org", districts: ["Chennai"] },
    { name: "Amar Seva Sangam", location: "Ayikudy, Tirunelveli", category: "disability", focus: "Comprehensive disability rehabilitation", impact: "Serving 12,000+ persons with disabilities", contact: "info@amarseva.org", website: "www.amarseva.org", districts: ["Tirunelveli", "Thoothukudi"] },

    // Rural Development
    { name: "DHAN Foundation", location: "Madurai", category: "rural", focus: "Rural development, livelihoods and water management", impact: "Reaching 6 million rural families", contact: "info@dhan.org", website: "www.dhan.org", districts: ["Madurai", "Dindigul", "Theni", "Ramanathapuram", "Sivaganga"] },
    { name: "MYRADA", location: "Dharmapuri", category: "rural", focus: "Rural community development and SHGs", impact: "Supporting 150,000+ rural families", contact: "myrada@myrada.org", website: "www.myrada.org", districts: ["Dharmapuri", "Krishnagiri"] },

    // Animal Welfare
    { name: "Blue Cross of India", location: "Chennai", category: "animal_welfare", focus: "Animal rescue and welfare", impact: "Rescuing 50,000+ animals annually", contact: "info@bluecrossofindia.org", website: "www.bluecrossofindia.org", districts: ["Chennai", "Kanchipuram"] },

    // Disaster Relief
    { name: "Goonj", location: "Chennai", category: "disaster_relief", focus: "Disaster relief and rural development", impact: "Reaching 500,000+ people in disasters", contact: "chennai@goonj.org", website: "www.goonj.org", districts: ["Chennai", "Kanchipuram", "Tiruvallur"] },

    // Skill Development
    { name: "Don Bosco Tech Society", location: "Chennai, Madurai, Coimbatore", category: "skill_development", focus: "Skill training and employment", impact: "Training 20,000+ youth annually", contact: "info@donboscotech.in", website: "www.donboscotech.in", districts: ["Chennai", "Madurai", "Coimbatore", "Tiruchirappalli"] }
];

// Helper function to extract category from English text
function extractCategory(text) {
    const lowerMsg = text.toLowerCase();

    // English & Tamil category keywords
    if (lowerMsg.includes('education') || lowerMsg.includes('school') || lowerMsg.includes('study') || lowerMsg.includes('கல்வி') || lowerMsg.includes('பள்ளி')) return 'education';
    if (lowerMsg.includes('health') || lowerMsg.includes('hospital') || lowerMsg.includes('medical') || lowerMsg.includes('மருத்துவம்') || lowerMsg.includes('சுகாதாரம்')) return 'healthcare';
    if (lowerMsg.includes('environment') || lowerMsg.includes('green') || lowerMsg.includes('tree') || lowerMsg.includes('சுற்றுச்சூழல்') || lowerMsg.includes('இயற்கை')) return 'environment';
    if (lowerMsg.includes('women') || lowerMsg.includes('பெண்கள்')) return 'women';
    if (lowerMsg.includes('child') || lowerMsg.includes('children') || lowerMsg.includes('குழந்தை')) return 'children';
    if (lowerMsg.includes('animal') || lowerMsg.includes('pet') || lowerMsg.includes('விலங்கு')) return 'animal_welfare';
    if (lowerMsg.includes('disaster') || lowerMsg.includes('relief') || lowerMsg.includes('பேரிடர்')) return 'disaster_relief';
    if (lowerMsg.includes('skill') || lowerMsg.includes('training') || lowerMsg.includes('திறன்')) return 'skill_development';
    if (lowerMsg.includes('elderly') || lowerMsg.includes('senior') || lowerMsg.includes('முதியோர்')) return 'elderly';
    if (lowerMsg.includes('disability') || lowerMsg.includes('disabled') || lowerMsg.includes('மாற்றுத்திறனாளி')) return 'disability';
    if (lowerMsg.includes('rural') || lowerMsg.includes('village') || lowerMsg.includes('கிராம')) return 'rural';
    if (lowerMsg.includes('animal') || lowerMsg.includes('pet') || lowerMsg.includes('விலங்கு')) return 'animal_welfare';
    if (lowerMsg.includes('disaster') || lowerMsg.includes('relief') || lowerMsg.includes('பேரிடர்')) return 'disaster_relief';
    if (lowerMsg.includes('skill') || lowerMsg.includes('training') || lowerMsg.includes('திறன்')) return 'skill_development';

    return null;
}

// Helper function to extract district from English and Tamil text
function extractDistrict(text) {
    const lowerMsg = text.toLowerCase();

    // Tamil district keywords mapping
    const tamilDistrictMap = {
        'கோயம்புத்தூர்': 'Coimbatore',
        'கோவை': 'Coimbatore',
        'சென்னை': 'Chennai',
        'மதுரை': 'Madurai',
        'திருச்சி': 'Tiruchirappalli',
        'திருச்சிராப்பள்ளி': 'Tiruchirappalli',
        'ஈரோடு': 'Erode',
        'வேலூர்': 'Vellore',
        'திருவள்ளூர்': 'Tiruvallur',
        'காஞ்சிபுரம்': 'Kanchipuram',
        'திருப்பூர்': 'Tirupur',
        'நீலகிரி': 'Nilgiris',
        'சேலம்': 'Salem',
        'நாமக்கல்': 'Namakkal',
        'விழுப்புரம்': 'Villupuram',
        'ஓசூர்': 'Hosur',
        'கிருஷ்ணகிரி': 'Krishnagiri',
        'திண்டுக்கல்': 'Dindigul',
        'தேனி': 'Theni',
        'செங்கல்பட்டு': 'Chengalpattu'
    };

    const englishDistricts = ["chennai", "madurai", "coimbatore", "tiruchirappalli", "erode", "vellore", "tiruvallur", "kanchipuram", "tirupur", "nilgiris", "salem", "namakkal", "villupuram", "hosur", "krishnagiri", "dindigul", "theni", "chengalpattu"];

    // Check English districts
    for (const d of englishDistricts) {
        if (lowerMsg.includes(d)) {
            return d.charAt(0).toUpperCase() + d.slice(1);
        }
    }

    // Check Tamil districts
    for (const [tamil, english] of Object.entries(tamilDistrictMap)) {
        if (text.includes(tamil)) {
            return english;
        }
    }

    return null;
}

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

        // Check if message is in Tamil
        const isTamil = isTamilText(message);

        // Detect analytical intent (highest impact, best, largest, etc.)
        const analyticalKeywords = ['highest', 'best', 'largest', 'most', 'top', 'தாக்கம்', 'சிறந்த', 'அதிக', 'முக்கியமான'];
        const isAnalyticalAction = analyticalKeywords.some(key => message.toLowerCase().includes(key));

        // Try to extract category and district from the original message (works with Tamil)
        let category = extractCategory(message);
        let district = extractDistrict(message);

        // If it's Tamil and we couldn't find keywords, translate and try again for better filtering
        if (isTamil && (!category || !district)) {
            try {
                const translated = await translateTamilToEnglish(message);
                if (!category) category = extractCategory(translated);
                if (!district) district = extractDistrict(translated);
            } catch (transError) {
                console.warn('Translation fallback failed:', transError.message);
            }
        }

        // Special logic: If it's an analytical query (like "highest impact"), 
        // we should ALWAYS prioritize Gemini over a simple list fallback.
        // We only use the local list filter as context for Gemini.

        // Get all NGOs - try MongoDB first, fallback to local data
        let allNGOs = [];
        try {
            allNGOs = await NGO.find({});
        } catch (dbError) {
            console.warn('MongoDB unavailable, using local NGO data:', dbError.message);
            allNGOs = localNGODatabase;
        }

        // Filter NGOs for context
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

        // Special case: If user mentions a specific NGO name, we should use Gemini to explain it
        const mentionsSpecificNGO = allNGOs.some(ngo => message.toLowerCase().includes(ngo.name.toLowerCase()));

        // Decision: Use Gemini if it's analytical, mentions a specific NGO, or is a long query
        const isComplexQuery = message.split(' ').length > 4;
        const shouldPreferAI = isAnalyticalAction || mentionsSpecificNGO || isComplexQuery || (!category && !district);

        // If we found a category but it's an analytical query, we MUST use Gemini
        const shouldForceAI = category && isAnalyticalAction;

        // Try Gemini AI first, fallback to processMessage if it fails
        try {
            // Use Gemini if: it's analytical, OR we have no simple filters, OR everything else fails
            const aiResponse = await getGeminiResponse(message, filteredNGOs);
            res.json({
                success: true,
                reply: aiResponse
            });
        } catch (geminiError) {
            console.error('Gemini AI Error in Route:', geminiError.message);

            // Fallback strategy: 
            // If it's an analytical query, we still want to show the impact details in the fallback
            const processedResponse = await processMessage(message);

            // Enrich fallback if analytical keywords were used
            let finalReply = processedResponse.text || processedResponse.reply || message;
            if (isAnalyticalAction && category && filteredNGOs.length > 0) {
                finalReply = `⚠️ *Note: AI analysis is currently processing. Here is the detailed data for ${category} NGOs to help you compare:* \n\n` +
                    filteredNGOs.map(ngo =>
                        `🏢 <strong>${ngo.name}</strong>\n✨ <strong>Impact:</strong> ${ngo.impact}\n🎯 <strong>Focus:</strong> ${ngo.focus}\n📧 ${ngo.contact}\n`
                    ).join('\n');
            }

            res.json({
                success: true,
                reply: finalReply,
                quickReplies: processedResponse.quickReplies
            });
        }
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

    // Greeting - English only (using word boundaries to avoid matching "Which")
    if (messageLower.match(/\b(hello|hi|hey)\b/)) {
        return {
            text: "Hello! 👋 I'm your NGO assistant for Tamil Nadu. I can help you discover amazing organizations working across Tamil Nadu in various categories.\n\nWhat would you like to know today?",
            reply: "Hello! I'm your NGO assistant for Tamil Nadu.",
            quickReplies: ['Education NGOs 📚', 'Healthcare 🏥', 'NGOs in Chennai 📍', 'Volunteer Info 🤝']
        };
    }

    // Check for specific NGO names (Powerful Fallback)
    const specificNGO = localNGODatabase.find(ngo => messageLower.includes(ngo.name.toLowerCase()));
    if (specificNGO) {
        return {
            text: `🏢 <strong>${specificNGO.name}</strong>\n\n📍 <strong>Location:</strong> ${specificNGO.location}\n🎯 <strong>Focus:</strong> ${specificNGO.focus}\n✨ <strong>Impact:</strong> ${specificNGO.impact}\n📧 <strong>Email:</strong> ${specificNGO.contact}\n🌐 <strong>Website:</strong> <a href="https://${specificNGO.website}" target="_blank">${specificNGO.website}</a>\n\nWould you like more information or how to support them?`,
            reply: `Here are the details for ${specificNGO.name}.`,
            quickReplies: ['How to help? 🤝', 'Contact Info 📞', 'Other NGOs nearby']
        };
    }

    // Extract category and district
    const category = extractCategory(message);
    const district = extractDistrict(message);

    // Build response based on extracted category/district
    if (category && district) {
        const matchedNGOs = localNGODatabase.filter(ngo =>
            ngo.category && ngo.category.toLowerCase() === category &&
            ngo.districts && ngo.districts.some(d => d.toLowerCase() === district.toLowerCase())
        );

        if (matchedNGOs.length > 0) {
            const ngoList = matchedNGOs.map(ngo =>
                `<strong>${ngo.name}</strong>\n📍 ${ngo.location}\n💼 ${ngo.focus}\n📧 ${ngo.contact}\n🌐 ${ngo.website}`
            ).join('\n\n');
            return {
                text: `✅ Found ${matchedNGOs.length} NGO(s) in ${category} category in ${district}:\n\n${ngoList}`,
                reply: `Found ${matchedNGOs.length} NGO(s) in ${category} category in ${district}`,
                quickReplies: ['Show more', 'Other districts', 'Other categories']
            };
        } else {
            return {
                text: `Sorry, no NGOs found for '${category}' in '${district}'. Try searching by other categories or districts.`,
                reply: `No NGOs found for '${category}' in '${district}'`,
                quickReplies: ['Search by category', 'Search by district', 'All categories']
            };
        }
    }

    // Category only
    if (category) {
        const matchedNGOs = localNGODatabase.filter(ngo => ngo.category && ngo.category.toLowerCase() === category);
        if (matchedNGOs.length > 0) {
            const ngoList = matchedNGOs.map(ngo =>
                `<strong>${ngo.name}</strong> (${ngo.location})`
            ).join('\n');
            return {
                text: `✅ Found ${matchedNGOs.length} ${category} NGO(s):\n\n${ngoList}`,
                reply: `Found ${matchedNGOs.length} ${category} NGO(s)`,
                quickReplies: ['Filter by district', 'Other categories']
            };
        }
    }

    // District only
    if (district) {
        const matchedNGOs = localNGODatabase.filter(ngo =>
            ngo.districts && ngo.districts.some(d => d.toLowerCase() === district.toLowerCase())
        );
        if (matchedNGOs.length > 0) {
            const ngoList = matchedNGOs.map(ngo =>
                `<strong>${ngo.name}</strong> (${ngo.category})`
            ).join('\n');
            return {
                text: `✅ Found ${matchedNGOs.length} NGO(s) in ${district}:\n\n${ngoList}`,
                reply: `Found ${matchedNGOs.length} NGO(s) in ${district}`,
                quickReplies: ['By category', 'Other districts']
            };
        }
    }

    // Volunteer queries - English only
    if (messageLower.match(/volunteer|help|support|donate/)) {
        return {
            text: "That's wonderful! 🤝 You can volunteer or support NGOs in several ways:\n\n1. Contact NGOs directly using the contact information provided\n2. Visit their websites to learn about volunteer opportunities\n3. Donate to causes you care about\n4. Spread awareness about their work\n\nWould you like to see NGOs in a specific category or district?",
            reply: "Great! You can volunteer with NGOs. Would you like to see NGOs in a specific category or district?",
            quickReplies: ['Education NGOs', 'Healthcare NGOs', 'NGOs in my district']
        };
    }

    // Default response
    return {
        text: "I can help you find NGOs by:\n\n📚 Category (Education, Healthcare, Environment, etc.)\n📍 District (Chennai, Coimbatore, Madurai, etc.)\n🤝 How to volunteer or donate\n\nWhat would you like to know?",
        reply: "I can help you find NGOs! Ask me about categories, districts, or volunteering opportunities.",
        quickReplies: ['Show categories', 'Find by district', 'How to help?']
    };
}

module.exports = router;
