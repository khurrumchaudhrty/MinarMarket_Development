    const express = require('express');
    const router = express.Router();

    const {addProductListing,showProductListings, showMyProductListings} = require('../controllers/ProductListingController');

    // console.log("ITHAY AAN");
    router.post('/', addProductListing);
    router.get('/',showProductListings);
    router.post('/buyer/my-product-listings', showMyProductListings)

    module.exports = router;