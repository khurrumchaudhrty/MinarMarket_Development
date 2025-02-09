const express = require("express");
const cors = require("cors");
const { getUserProfile, updateUserProfile } = require("../controllers/UserProfileController");
const { verifyAPIRequest } = require("../middleware/authAPIRequest");

const router = express.Router();

// CORS options specific to this route
const corsOptions = {
  origin: "http://localhost:3000", // Only allow the frontend origin
  credentials: true, // Allow cookies and credentials
};

router.options("/", cors(corsOptions)); // Handle preflight requests
router.get("/", cors(corsOptions), verifyAPIRequest, getUserProfile); // GET /profile
router.put("/", cors(corsOptions), verifyAPIRequest, updateUserProfile); // PUT /profile

module.exports = router;
