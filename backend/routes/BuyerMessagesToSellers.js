const express = require("express");
const { getSellerMessages } = require("../controllers/BuyerMessagesToSellers"); // Import function
const router = express.Router();

// Define route to get messages for a seller
router.get("/:sellerId", getSellerMessages);

module.exports = router;
