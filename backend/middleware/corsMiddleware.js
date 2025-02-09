const cors = require("cors");

// Configure CORS options for specific routes
const corsOptions = {
  origin: "http://localhost:3000", // Allowed origin
  credentials: true, // Allow cookies and credentials
};

exports.profileCORS = cors(corsOptions);
