// const ApiFeatures = require('../utils/apiFeatures.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');

const mongoose = require('mongoose');

// User Model
const User = require('../models/User.js');

exports.login = catchAsyncErrors(async (req, res, next) => {
    if(!req.body) {
        return res.status(400).json({ success: false, message: 'Please enter your email and password' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please enter email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = user.getJWTToken();

    return res.status(200).json({ success: true, token });
} )

exports.signup = catchAsyncErrors( async (req, res, next) => {
    if(!req.body) { 
        return res.status(400).json({ success: false, message: 'Please enter your email and password' });
    }

    const { email, password, confirmPassword, name } = req.body;

    if (!email || !password || !confirmPassword || !name) {
        return res.status(400).json({ success: false, message: 'Please enter all required fields' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 8) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    // Searching for the user in the database
    const user = await User.findOne({ email });
    
    if (user) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }
    
    else {
        try {
            const user = await User.create({ name, email, password });
            return res.status(200).json({ success: true, message: 'User registered successfully' });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
} )