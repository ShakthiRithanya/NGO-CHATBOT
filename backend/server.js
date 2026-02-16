const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { init } = require('./database');

// Initialize Database
init();

// Import Routes
const ngoRoutes = require('./routes/ngo.routes');
const chatRoutes = require('./routes/chat.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const eventRoutes = require('./routes/event.routes');

// Use Routes
app.use('/api/ngos', ngoRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/events', eventRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Tamil Nadu NGO Connect Backend is running!',
        timestamp: new Date().toISOString()
    });
});

// Root Route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Tamil Nadu NGO Connect API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            ngos: '/api/ngos',
            chat: '/api/chat',
            analytics: '/api/analytics',
            events: '/api/events'
        }
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
