const catchAsyncErrors = require("../middleware/CatchAsyncErrors.js");
const mongoose = require("mongoose");
const User = require("../models/User.js");
const jwt = require('jsonwebtoken');

exports.login = catchAsyncErrors(async (req, res, next) => {
  // console.log("Received login request"); // Debugging statement to confirm login request is received

  if (!req.body) {
    console.log("Request body is missing"); // Debugging statement if body is not provided
    return res.status(400).json({
      success: false,
      message: "Please enter your email and password",
    });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Email or password missing"); // Debugging statement for missing credentials
    return res
      .status(400)
      .json({ success: false, message: "Please enter email and password" });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    console.log("User not found"); // Debugging statement if user does not exist
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    console.log("Password did not match"); // Debugging statement if password is incorrect
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  // Include user name and email in the JWT payload
  const payload = {
    id: user._id,
    name: user.name, 
    email: user.email,
    admin: user.admin,
    accountStatus: user.accountStatus
  };

  // Generate token with a payload that includes name and email
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return res.status(200).json({ success: true, token });
});

exports.signup = catchAsyncErrors(async (req, res, next) => {
  console.log("Received signup request");

  if (!req.body) {
      return res.status(400).json({ success: false, message: "Missing request body" });
  }

  const { email, phone, password, confirmPassword, name } = req.body;

  if (!email || !phone || !password || !confirmPassword || !name) {
      return res.status(400).json({ success: false, message: "Please enter all required fields" });
  }

  if (!/^\d{10,15}$/.test(phone)) {
      return res.status(400).json({ success: false, message: "Invalid phone number format" });
  }

  if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
      return res.status(400).json({ success: false, message: "User with this email or phone number already exists" });
  }

  try {
      const newUser = await User.create({ name, email, phone, password });
      console.log("User created successfully:", newUser);
      return res.status(200).json({ success: true, message: "User registered successfully" });
  } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
  }
});
