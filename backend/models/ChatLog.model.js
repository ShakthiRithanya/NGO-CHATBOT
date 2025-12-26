const mongoose = require('mongoose');

const chatLogSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        index: true
    },
    userMessage: {
        type: String,
        required: true
    },
    botResponse: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    district: {
        type: String
    },
    ngosRecommended: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NGO'
    }],
    timestamp: {
        type: Date,
        default: Date.now
    },
    userFeedback: {
        helpful: {
            type: Boolean,
            default: null
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        }
    }
});

// Index for analytics
chatLogSchema.index({ timestamp: -1 });
chatLogSchema.index({ category: 1, district: 1 });

module.exports = mongoose.model('ChatLog', chatLogSchema);
