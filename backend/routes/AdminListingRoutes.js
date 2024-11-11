const express = require("express");
const router = express.Router();

const { getAllProductListings } = require("../controllers/AdminListingController");

router.get("/", getAllProductListings);

module.exports = router;
