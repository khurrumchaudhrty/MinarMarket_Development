    const express = require('express');
    const router = express.Router();

    const {addProductListing,showProductListings, showMyProductListings, fetchProductListing, updateProductListing} = require('../controllers/ProductListingController');

    // console.log("ITHAY AAN");
    router.post('/', addProductListing);
    router.get('/',showProductListings);
    router.post('/buyer/my-product-listings', showMyProductListings)
    router.get('/fetch-product-details/:productId', fetchProductListing);
    router.put('/updateProduct/:productId', updateProductListing);
    module.exports = router;