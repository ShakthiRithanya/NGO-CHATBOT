// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// API Service
const api = {
    // NGO Endpoints
    getAllNGOs: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/ngos`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching NGOs:', error);
            return { success: false, error: error.message };
        }
    },

    getNGOsByCategory: async (category) => {
        try {
            const response = await fetch(`${API_BASE_URL}/ngos/category/${category}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching NGOs by category:', error);
            return { success: false, error: error.message };
        }
    },

    getNGOsByDistrict: async (district) => {
        try {
            const response = await fetch(`${API_BASE_URL}/ngos/district/${district}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching NGOs by district:', error);
            return { success: false, error: error.message };
        }
    },

    searchNGOs: async (query) => {
        try {
            const response = await fetch(`${API_BASE_URL}/ngos/search/query?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching NGOs:', error);
            return { success: false, error: error.message };
        }
    },

    // Chat Endpoints
    sendChatMessage: async (message, sessionId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/chat/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, sessionId }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error sending chat message:', error);
            return { success: false, error: error.message };
        }
    },

    getChatHistory: async (sessionId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/chat/history/${sessionId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching chat history:', error);
            return { success: false, error: error.message };
        }
    },

    submitFeedback: async (chatId, helpful, rating) => {
        try {
            const response = await fetch(`${API_BASE_URL}/chat/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chatId, helpful, rating }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error submitting feedback:', error);
            return { success: false, error: error.message };
        }
    },

    // Analytics Endpoints
    getStats: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/analytics/stats`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching stats:', error);
            return { success: false, error: error.message };
        }
    },

    // Health Check
    checkHealth: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error checking health:', error);
            return { success: false, error: error.message };
        }
    }
};

// Generate unique session ID
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Get or create session ID
function getSessionId() {
    let sessionId = localStorage.getItem('ngo_chat_session_id');
    if (!sessionId) {
        sessionId = generateSessionId();
        localStorage.setItem('ngo_chat_session_id', sessionId);
    }
    return sessionId;
}

// Export for use in other files
window.api = api;
window.getSessionId = getSessionId;
