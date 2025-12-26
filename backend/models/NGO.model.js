const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['education', 'healthcare', 'environment', 'women', 'children', 'elderly', 'disability', 'rural']
    },
    location: {
        type: String,
        required: true
    },
    districts: [{
        type: String,
        required: true
    }],
    focus: {
        type: String,
        required: true
    },
    impact: {
        type: String,
        required: true
    },
    contact: {
        phone: String,
        email: String,
        address: String
    },
    website: {
        type: String,
        trim: true
    },
    description: {
        type: String
    },
    verified: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster searches
ngoSchema.index({ category: 1, districts: 1 });
ngoSchema.index({ name: 'text', focus: 'text', description: 'text' });

// Update timestamp on save
ngoSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('NGO', ngoSchema);
