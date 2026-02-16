const express = require('express');
const router = express.Router();
const { db } = require('../database');

// GET all NGOs
router.get('/', (req, res) => {
    try {
        const ngos = db.prepare('SELECT * FROM ngos').all();
        // Parse districts if stored as JSON string
        const parsedNgos = ngos.map(ngo => ({
            ...ngo,
            districts: JSON.parse(ngo.districts || '[]'),
            contact: {
                phone: ngo.phone,
                email: ngo.email,
                address: ngo.address
            }
        }));

        res.json({
            success: true,
            count: parsedNgos.length,
            data: parsedNgos
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET NGOs by category
router.get('/category/:category', (req, res) => {
    try {
        const { category } = req.params;
        const ngos = db.prepare('SELECT * FROM ngos WHERE category = ?').all(category.toLowerCase());

        const parsedNgos = ngos.map(ngo => ({
            ...ngo,
            districts: JSON.parse(ngo.districts || '[]'),
            contact: {
                phone: ngo.phone,
                email: ngo.email,
                address: ngo.address
            }
        }));

        res.json({
            success: true,
            category: category,
            count: parsedNgos.length,
            data: parsedNgos
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET NGOs by district
router.get('/district/:district', (req, res) => {
    try {
        const { district } = req.params;
        const ngos = db.prepare('SELECT * FROM ngos WHERE districts LIKE ?').all(`%${district}%`);

        const parsedNgos = ngos.map(ngo => ({
            ...ngo,
            districts: JSON.parse(ngo.districts || '[]'),
            contact: {
                phone: ngo.phone,
                email: ngo.email,
                address: ngo.address
            }
        }));

        res.json({
            success: true,
            district: district,
            count: parsedNgos.length,
            data: parsedNgos
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET NGO by ID
router.get('/:id', (req, res) => {
    try {
        const ngo = db.prepare('SELECT * FROM ngos WHERE id = ?').get(req.params.id);

        if (!ngo) {
            return res.status(404).json({
                success: false,
                message: 'NGO not found'
            });
        }

        const parsedNgo = {
            ...ngo,
            districts: JSON.parse(ngo.districts || '[]'),
            contact: {
                phone: ngo.phone,
                email: ngo.email,
                address: ngo.address
            }
        };

        res.json({
            success: true,
            data: parsedNgo
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST create new NGO
router.post('/', (req, res) => {
    try {
        const { name, category, location, districts, focus, impact, contact, website, description } = req.body;
        const info = db.prepare(`
            INSERT INTO ngos (name, category, location, districts, focus, impact, phone, email, address, website, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            name, category, location, JSON.stringify(districts), focus, impact,
            contact?.phone, contact?.email, contact?.address,
            website, description
        );

        res.status(201).json({
            success: true,
            message: 'NGO created successfully',
            data: { id: info.lastInsertRowid, ...req.body }
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// PUT update NGO
router.put('/:id', (req, res) => {
    try {
        const { name, category, location, districts, focus, impact, contact, website, description } = req.body;
        const info = db.prepare(`
            UPDATE ngos 
            SET name = ?, category = ?, location = ?, districts = ?, focus = ?, impact = ?, 
                phone = ?, email = ?, address = ?, website = ?, description = ?
            WHERE id = ?
        `).run(
            name, category, location, JSON.stringify(districts), focus, impact,
            contact?.phone, contact?.email, contact?.address,
            website, description, req.params.id
        );

        if (info.changes === 0) {
            return res.status(404).json({
                success: false,
                message: 'NGO not found'
            });
        }

        res.json({
            success: true,
            message: 'NGO updated successfully'
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// DELETE NGO
router.delete('/:id', (req, res) => {
    try {
        const info = db.prepare('DELETE FROM ngos WHERE id = ?').run(req.params.id);

        if (info.changes === 0) {
            return res.status(404).json({
                success: false,
                message: 'NGO not found'
            });
        }

        res.json({
            success: true,
            message: 'NGO deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Search NGOs
router.get('/search/query', (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const ngos = db.prepare(`
            SELECT * FROM ngos 
            WHERE name LIKE ? OR focus LIKE ? OR description LIKE ?
        `).all(`%${q}%`, `%${q}%`, `%${q}%`);

        const parsedNgos = ngos.map(ngo => ({
            ...ngo,
            districts: JSON.parse(ngo.districts || '[]'),
            contact: {
                phone: ngo.phone,
                email: ngo.email,
                address: ngo.address
            }
        }));

        res.json({
            success: true,
            query: q,
            count: parsedNgos.length,
            data: parsedNgos
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
