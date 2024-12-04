const ProductListing = require('../models/ProductListing'); // Import the ProductListing model
const mongoose = require('mongoose');
// Controller to handle adding a new product listing
exports.addProductListing = async (req, res) => {
    try {
        const { title, description, price, category, images, userId } = req.body;

        // Validate required fields
        if (!title || !description || !price || !category || !images || images.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required, and at least one image must be provided.',
            });
        }

        // Check that no more than 6 images are being uploaded
        if (images.length > 6) {
            return res.status(400).json({
                success: false,
                message: 'You can upload a maximum of 6 images.',
            });
        }

        // Create a new product listing
        const newProduct = new ProductListing({
            title,
            description,
            price,
            category,
            images,
            listerId: userId
        });

        // Save to the database
        await newProduct.save();

        // Send a success response
        return res.status(201).json({
            success: true,
            message: 'Product listing added successfully.',
            data: newProduct,
        });
    } catch (error) {
        console.error('Error adding product listing:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while adding the product listing.',
        });
    }
};

exports.showProductListings = async (req, res) => {
    try {
        //Find all approved product listings with status "Approved"
        const productListings = await ProductListing.find({ status: "Approved", isActive: true });

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

exports.showMyProductListings = async (req, res) => {
    try {
        // Extract the id from the request body
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Lister ID is required.',
            });
        }

        // Convert the id to a MongoDB ObjectId
        const objectId = new mongoose.Types.ObjectId(id);

        // Query the database for listings with the given listerId
        const productListings = await ProductListing.find({
            status: "Approved",
            isActive: true,
            listerId: objectId, // Use the converted ObjectId here
        });

        return res.status(200).json({
            success: true,
            message: 'Product listings retrieved successfully.',
            data: productListings,
        });
    } catch (error) {
        console.error('Error retrieving my product listings:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving my product listings.',
        });
    }
};