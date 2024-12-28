const express = require("express");
const router = express.Router();

const {addServiceListing, showServiceListings} = require("../controllers/ServiceListingController");

// router.get('/',showServiceListings);
router.post('/',addServiceListing);
router.get('/',showServiceListings);

module.exports = router;
