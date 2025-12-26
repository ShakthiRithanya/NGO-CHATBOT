const express = require('express');
const router = express.Router();
const ChatLog = require('../models/ChatLog.model');
const NGO = require('../models/NGO.model');

// GET - Overall statistics
router.get('/stats', async (req, res) => {
    try {
        const totalNGOs = await NGO.countDocuments();
        const totalChats = await ChatLog.countDocuments();
        const totalCategories = await NGO.distinct('category');
        const totalDistricts = await NGO.distinct('districts');

        // Category-wise NGO count
        const categoryStats = await NGO.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    avgRating: { $avg: '$rating' }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // Most searched categories
        const popularCategories = await ChatLog.aggregate([
            { $match: { category: { $ne: null } } },
            {
                $group: {
                    _id: '$category',
                    searchCount: { $sum: 1 }
                }
            },
            { $sort: { searchCount: -1 } },
            { $limit: 5 }
        ]);

        // Most searched districts
        const popularDistricts = await ChatLog.aggregate([
            { $match: { district: { $ne: null } } },
            {
                $group: {
                    _id: '$district',
                    searchCount: { $sum: 1 }
                }
            },
            { $sort: { searchCount: -1 } },
            { $limit: 5 }
        ]);

        res.json({
            success: true,
            data: {
                overview: {
                    totalNGOs,
                    totalChats,
                    totalCategories: totalCategories.length,
                    totalDistricts: totalDistricts.length
                },
                categoryStats,
                popularCategories,
                popularDistricts
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET - Chat analytics
router.get('/chats', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        let query = {};
        if (startDate && endDate) {
            query.timestamp = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const chatStats = await ChatLog.aggregate([
            { $match: query },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
                    },
                    count: { $sum: 1 },
                    helpfulCount: {
                        $sum: {
                            $cond: [{ $eq: ['$userFeedback.helpful', true] }, 1, 0]
                        }
                    },
                    avgRating: { $avg: '$userFeedback.rating' }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            success: true,
            data: chatStats
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET - User feedback summary
router.get('/feedback', async (req, res) => {
    try {
        const feedbackStats = await ChatLog.aggregate([
            { $match: { 'userFeedback.helpful': { $ne: null } } },
            {
                $group: {
                    _id: null,
                    totalFeedback: { $sum: 1 },
                    helpfulCount: {
                        $sum: {
                            $cond: [{ $eq: ['$userFeedback.helpful', true] }, 1, 0]
                        }
                    },
                    avgRating: { $avg: '$userFeedback.rating' }
                }
            }
        ]);

        res.json({
            success: true,
            data: feedbackStats[0] || {
                totalFeedback: 0,
                helpfulCount: 0,
                avgRating: 0
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
