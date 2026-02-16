const express = require('express');
const router = express.Router();
const { db } = require('../database');
const { generateEventDetails } = require('../gemini');

// Get all events
router.get('/', (req, res) => {
    try {
        const events = db.prepare('SELECT * FROM events ORDER BY date ASC').all();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create event manually
router.post('/', (req, res) => {
    const { title, description, date, location, category, posterUrl } = req.body;
    try {
        const info = db.prepare(`
            INSERT INTO events (title, description, date, location, category, posterUrl)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(title, description, date, location, category, posterUrl);

        res.status(201).json({ id: info.lastInsertRowid, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Generate event using AI
router.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    console.log(`[EVENT] Generation request received for prompt: "${prompt}"`);
    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
    }

    try {
        const aiResponse = await generateEventDetails(prompt);
        console.log(`[EVENT] AI successfully generated details for: "${aiResponse.title}"`);

        const categoryImages = {
            'Education': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'Healthcare': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'Environment': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'Women Empowerment': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'Child Welfare': 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        };

        const posterUrl = categoryImages[aiResponse.category] || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

        const info = db.prepare(`
            INSERT INTO events (title, description, date, location, category, posterUrl, aiGenerated)
            VALUES (?, ?, ?, ?, ?, ?, 1)
        `).run(aiResponse.title, aiResponse.description, aiResponse.date, aiResponse.location, aiResponse.category, posterUrl);

        res.status(201).json({
            id: info.lastInsertRowid,
            ...aiResponse,
            posterUrl,
            aiGenerated: true
        });
    } catch (error) {
        console.error('Generation route error:', error);
        res.status(500).json({ message: 'Error generating event', detail: error.message });
    }
});

// Register for an event
router.post('/:id/register', (req, res) => {
    const eventId = req.params.id;
    const { name, email, phone } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and Email are required' });
    }

    try {
        // Check if event exists
        const event = db.prepare('SELECT * FROM events WHERE id = ?').get(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const info = db.prepare(`
            INSERT INTO registrations (eventId, userName, userEmail, userPhone)
            VALUES (?, ?, ?, ?)
        `).run(eventId, name, email, phone);

        res.status(201).json({
            success: true,
            message: 'Successfully registered for the event!',
            registrationId: info.lastInsertRowid
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get registrations for an event (Admin/Debug)
router.get('/:id/registrations', (req, res) => {
    try {
        const registrations = db.prepare('SELECT * FROM registrations WHERE eventId = ?').all(req.params.id);
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
