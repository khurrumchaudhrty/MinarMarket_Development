// // const ApiFeatures = require('../utils/apiFeatures.js');
// const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');

// const mongoose = require('mongoose');

// // User Model
// const User = require('../models/User.js');

// exports.login = catchAsyncErrors(async (req, res, next) => {
//     if(!req.body) {
//         return res.status(400).json({ success: false, message: 'Please enter your email and password' });
//     }

//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ success: false, message: 'Please enter email and password' });
//     }

//     const user = await User.findOne({ email }).select('+password');

//     if (!user) {
//         return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     const isPasswordMatched = await user.comparePassword(password);

//     if (!isPasswordMatched) {
//         return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     const token = user.getJWTToken();

//     return res.status(200).json({ success: true, token });
// } )

// exports.signup = catchAsyncErrors( async (req, res, next) => {
//     if(!req.body) { 
//         return res.status(400).json({ success: false, message: 'Please enter your email and password' });
//     }

//     const { email, password, confirmPassword, name } = req.body;

//     if (!email || !password || !confirmPassword || !name) {
//         return res.status(400).json({ success: false, message: 'Please enter all required fields' });
//     }

//     if (password !== confirmPassword) {
//         return res.status(400).json({ success: false, message: 'Passwords do not match' });
//     }

//     if (password.length < 8) {
//         return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
//     }

//     // Searching for the user in the database
//     const user = await User.findOne({ email });
    
//     if (user) {
//         return res.status(400).json({ success: false, message: 'User already exists with this email' });
//     }
    
//     else {
//         try {
//             const user = await User.create({ name, email, password });
//             return res.status(200).json({ success: true, message: 'User registered successfully' });
//         } catch (error) {
//             return res.status(500).json({ success: false, message: error.message });
//         }
//     }
// } )
// const ApiFeatures = require('../utils/apiFeatures.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const mongoose = require('mongoose');
const User = require('../models/User.js');

exports.login = catchAsyncErrors(async (req, res, next) => {
    console.log("Received login request"); // Debugging statement to confirm login request is received

    if(!req.body) {
        console.log("Request body is missing"); // Debugging statement if body is not provided
        return res.status(400).json({ success: false, message: 'Please enter your email and password' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        console.log("Email or password missing"); // Debugging statement for missing credentials
        return res.status(400).json({ success: false, message: 'Please enter email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        console.log("User not found"); // Debugging statement if user does not exist
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        console.log("Password did not match"); // Debugging statement if password is incorrect
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = user.getJWTToken();
    console.log("JWT token generated:", token); // Debugging statement to confirm token generation

    return res.status(200).json({ success: true, token });
});

exports.signup = catchAsyncErrors(async (req, res, next) => {
    console.log("Received signup request"); // Debugging statement to confirm signup request is received

    if(!req.body) { 
        console.log("Request body is missing"); // Debugging statement if body is not provided
        return res.status(400).json({ success: false, message: 'Please enter your email and password' });
    }

    const { email, password, confirmPassword, name } = req.body;

    if (!email || !password || !confirmPassword || !name) {
        console.log("Required fields missing"); // Debugging statement for missing fields
        return res.status(400).json({ success: false, message: 'Please enter all required fields' });
    }

    if (password !== confirmPassword) {
        console.log("Passwords do not match"); // Debugging statement for mismatched passwords
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 8) {
        console.log("Password is too short"); // Debugging statement for short password
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    const user = await User.findOne({ email });
    if (user) {
        console.log("User already exists with this email"); // Debugging statement if user exists
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    try {
        const newUser = await User.create({ name, email, password });
        console.log("User created successfully:", newUser); // Debugging statement for successful user creation
        return res.status(200).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.log("Error creating user:", error); // Debugging statement for user creation error
        return res.status(500).json({ success: false, message: error.message });
    }
});
