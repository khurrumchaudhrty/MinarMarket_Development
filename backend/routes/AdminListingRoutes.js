const express = require("express");
const router = express.Router();

const { getAllProductListings, getUpdateProductListings, getAllBuyerServiceRequirements, getAllBuyerProductRequirements, getAllServiceListings, getUpdateBuyerServiceListings, getUpdateBuyerProductListings, getUpdateServiceListings } = require("../controllers/AdminListingController");

router.get("/", getAllProductListings);
router.post("/seller-services", getAllServiceListings);
router.post("/", getAllBuyerProductRequirements);
router.put("/", getAllBuyerServiceRequirements);
router.put("/update-listings-status", getUpdateProductListings);
router.put("/seller-service", getUpdateServiceListings);
router.put("/buyer-product", getUpdateBuyerProductListings);
router.put("/buyer-service", getUpdateBuyerServiceListings);

module.exports = router;
