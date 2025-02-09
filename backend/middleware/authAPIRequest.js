exports.verifyAPIRequest = async (req, res, next) => {
    const allowedOrigin = "http://localhost:3000"; // Allow only the frontend origin
    const origin = req.headers.origin || req.headers.referer;
  
    if (origin !== allowedOrigin) {
      console.log("Unauthorized origin:", origin); // Debug log
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid origin" });
    }
  
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
  
    if (!token) {
      console.log("No token provided"); // Debug log
      return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Debug log
  
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        console.log("User not found"); // Debug log
        return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
      }
  
      req.user = user;
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
  };
  