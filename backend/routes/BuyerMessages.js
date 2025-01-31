const express = require("express");
const router = express.Router();

const { createBuyerMessage } = require("../controllers/BuyerMessages");

// Route for listing a product
router.post("/", createBuyerMessage);

module.exports = router;
