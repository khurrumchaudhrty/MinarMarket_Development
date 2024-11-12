const express = require('express');
const Bid = require('../models/BuyerBids'); // Assuming you have a Bid model

const router = express.Router();


module.exports = router;
// Route to get bids for a specific product
router.get('/bids/:itemId', async (req, res) => {
    const { itemId } = req.params;

    try {
        const bids = await Bid.find({ itemId }).sort({ bidAmount: -1 });
        res.status(200).json({ bids });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});