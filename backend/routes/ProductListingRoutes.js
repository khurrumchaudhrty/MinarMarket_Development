const express = require('express');
const router = express.Router();

const {addProductListing} = require('../controllers/ProductListingController');

console.log("ITHAY AAN");
router.post('/', addProductListing);


module.exports = router;