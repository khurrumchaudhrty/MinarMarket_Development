const express = require("express");
const BuyerRequirement = require("../models/BuyerRequirement");

// Controller function to handle product listing    
exports.showbuyerProductListings = async (req, res) => {
    try {
        
        const userId = req.query.userId; // Extract userId from query parameters
        console.log("User ID from query:", userId);
        // Find all approved product listings, excluding those created by the current user
        const productListings = await BuyerRequirement.find({
            isActive: true,
            listerId: { $ne: String(userId) }, // Exclude listings by the current user
            status: 'Approved'  
        });

        return res.status(200).json({
            success: true,
            message: 'Product listings retrieved successfully.',
            data: productListings,
        });
    } catch (error) {
        console.error('Error retrieving product listings:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving product listings.',
        });
    }
};
