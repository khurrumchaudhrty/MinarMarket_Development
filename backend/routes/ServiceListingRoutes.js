const express = require("express");
const router = express.Router();

const {addServiceListing} = require("../controllers/ServiceListingController");

// router.get('/',showServiceListings);
router.post('/',addServiceListing);

module.exports = router;