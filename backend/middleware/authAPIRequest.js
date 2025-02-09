const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure this matches your project's structure

exports.verifyAPIRequest = async (req, res, next) => {
  const allowedOrigin = "https://travelwithdario.com";
  const origin = req.headers.origin || req.headers.referer;

  // Validate Origin
  if (origin !== allowedOrigin && origin !== "http://localhost:3000") {
    // Include localhost for development
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid origin" });
  }

  // Validate Token
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Error in verifyAPIRequest:", error);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};
