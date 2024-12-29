const express = require("express");
const router = express.Router();


const { listProduct } = require("../controllers/BuyerRequirementController");

// Route for listing a product
router.post("/", listProduct);

// console.log("Route wala API: ", process.env.REACT_APP_API_URL+"/api/buyer-requirement")

module.exports = router;
