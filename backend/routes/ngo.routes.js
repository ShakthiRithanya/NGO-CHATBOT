const express = require('express');
const router = express.Router();
const NGO = require('../models/NGO.model');

// GET all NGOs
router.get('/', async (req, res) => {
    try {
        const ngos = await NGO.find();
        res.json({
            success: true,
            count: ngos.length,
            data: ngos
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET NGOs by category
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const ngos = await NGO.find({ category: category.toLowerCase() });

        res.json({
            success: true,
            category: category,
            count: ngos.length,
            data: ngos
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET NGOs by district
router.get('/district/:district', async (req, res) => {
    try {
        const { district } = req.params;
        const ngos = await NGO.find({
            districts: { $regex: new RegExp(district, 'i') }
        });

        res.json({
            success: true,
            district: district,
            count: ngos.length,
            data: ngos
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET NGO by ID
router.get('/:id', async (req, res) => {
    try {
        const ngo = await NGO.findById(req.params.id);

        if (!ngo) {
            return res.status(404).json({
                success: false,
                message: 'NGO not found'
            });
        }

        res.json({
            success: true,
            data: ngo
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST create new NGO
router.post('/', async (req, res) => {
    try {
        const ngo = new NGO(req.body);
        await ngo.save();

        res.status(201).json({
            success: true,
            message: 'NGO created successfully',
            data: ngo
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// PUT update NGO
router.put('/:id', async (req, res) => {
    try {
        const ngo = await NGO.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!ngo) {
            return res.status(404).json({
                success: false,
                message: 'NGO not found'
            });
        }

        res.json({
            success: true,
            message: 'NGO updated successfully',
            data: ngo
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// DELETE NGO
router.delete('/:id', async (req, res) => {
    try {
        const ngo = await NGO.findByIdAndDelete(req.params.id);

        if (!ngo) {
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
router.get('/search/query', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const ngos = await NGO.find({
            $text: { $search: q }
        });

        res.json({
            success: true,
            query: q,
            count: ngos.length,
            data: ngos
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
