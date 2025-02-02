const express = require("express");
const BuyerMessage = require("../models/BuyerMessages");
const User = require("../models/User");
const ProductListing = require("../models/ProductListing"); // Import models

// Controller function to fetch messages for a seller
exports.getSellerMessages = async (req, res) => {
    try {
        const { sellerId } = req.params; // Extract seller ID from request parameters

        console.log("Fetching messages for Seller ID:", sellerId);

        if (!sellerId) {
            return res.status(400).json({
                success: false,
                message: "Seller ID is required.",
            });
        }

        // Find messages where id_of_lister matches the sellerId
        const messages = await BuyerMessage.find({ id_of_lister: sellerId });

        if (messages.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No messages found for this seller.",
            });
        }

        // Fetch buyer details and product names
        const enrichedMessages = await Promise.all(
            messages.map(async (message) => {
                const buyer = await User.findById(message.id_of_buyer);
                const product = await ProductListing.findById(message.id_of_product);

                return {
                    id: message._id,
                    product: product ? product.title : "Unknown Product",
                    name: buyer ? buyer.name : "Unknown Buyer",
                    email: buyer ? buyer.email : "Unknown Email",
                };
            })
        );

        return res.status(200).json({
            success: true,
            messages: enrichedMessages,
        });
    } catch (error) {
        console.error("Error fetching seller messages:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching messages.",
        });
    }
};
