const express = require("express");
const router = express.Router();

const {addServiceListing, fetchServiceListing, updateServiceListing} = require("../controllers/ServiceListingController");

// router.get('/',showServiceListings);
router.post('/',addServiceListing);
router.get('/fetch-service-details/:serviceId', fetchServiceListing);
router.put('/updateService/:serviceId', updateServiceListing);
module.exports = router;