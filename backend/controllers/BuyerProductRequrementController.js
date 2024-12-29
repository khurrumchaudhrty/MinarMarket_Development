const express = require("express");
const BuyerRequirement = require("../models/BuyerRequirement");

// Controller function to handle product listing    
exports.showbuyerProductListings = async (req, res) => {
// try {
//     const searchQuery = req.query.search || '';
//     const buyerRequirements = await BuyerRequirement.find({
//         isActive: true,
//         title: { $regex: searchQuery, $options: 'i' }, // Case-insensitive search
//     }).sort({ updatedAt: -1 });

//     res.status(200).json(buyerRequirements);
// } catch (error) {
//     console.error('Error fetching buyer requirements:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
// }

    try {
        //Find all approved product listings with status "Approved"
        const productListings = await BuyerRequirement.find({ isActive: true });

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
}


// exports.showProductListings = async (req, res) => {
//     try {
//         //Find all approved product listings with status "Approved"
//         const productListings = await ProductListing.find({ status: "Approved", isActive: true });

//         return res.status(200).json({
//             success: true,
//             message: 'Product listings retrieved successfully.',
//             data: productListings,
//         });
//     } catch (error) {
//         console.error('Error retrieving product listings:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'An error occurred while retrieving product listings.',
//         });
//     }
// }