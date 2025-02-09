const User = require("../models/User");
const catchAsyncErrors = require("../middleware/CatchAsyncErrors");

// Fetch user profile
exports.getUserProfile = catchAsyncErrors(async (req, res) => {
  const userId = req.user.id; // Assuming `req.user` is populated by authentication middleware

  // Fetch user data, excluding sensitive fields like password
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  res.status(200).json({
    success: true,
    message: "User profile fetched successfully.",
    data: user,
  });
});

// Update user profile
exports.updateUserProfile = catchAsyncErrors(async (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  // Validate input
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and email are required.",
    });
  }

  // Update user data
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true }
  ).select("-password");

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  res.status(200).json({
    success: true,
    message: "User profile updated successfully.",
    data: updatedUser,
  });
});
