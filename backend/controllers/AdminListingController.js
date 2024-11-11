const ProductListing = require('../models/ProductListing');

exports.getAllProductListings = async(req,res) => {
    try {
        const products = await ProductListing.find({isActive:1});
        // Check if products were found
        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No product listings found in the database.',
            });
        }
        // Send a success response with the products
        return res.status(200).json({
            success: true,
            message: 'Product listings fetched successfully.',
            data: products,
        });

    } catch (error) {
        console.error('Error fetching all product listings:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching product listings.',
        });
    }
};