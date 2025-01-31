const express = require("express");
const BuyerMessage = require("../models/BuyerMessages");

// Controller function to handle buyer messages
exports.createBuyerMessage = async (req, res) => {
    try {
        const { id_of_buyer, id_of_product } = req.body; // Extract data from request body
        
        console.log("Buyer ID:", id_of_buyer, "Product ID:", id_of_product);
        
        if (!id_of_buyer || !id_of_product) {
            return res.status(400).json({
                success: false,
                message: "Buyer ID and Product ID are required.",
            });
        }

        // Create a new BuyerMessage document
        const newMessage = new BuyerMessage({
            id_of_buyer,
            id_of_product,
        });

        await newMessage.save();

        return res.status(201).json({
            success: true,
            message: "Buyer message saved successfully.",
        });
    } catch (error) {
        console.error("Error saving buyer message:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while saving buyer message.",
        });
    }
};
