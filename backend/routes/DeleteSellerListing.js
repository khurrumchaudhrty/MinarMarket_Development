// SellerListingRoutes.js (Backend)
const express = require('express');
const router = express.Router();
const { deleteSellerListings } = require('../controllers/SellerListingController');

// DELETE route to handle deletion of seller listings by item IDs
router.delete('/delete-seller-listings', deleteSellerListings);

module.exports = router;
