const express = require("express");
const BuyerRequirement = require("../models/BuyerRequirement");

// Controller function to handle product listing
exports.listProduct = async (req, res) => {
  
 
  try {
    console.log("Controller wala API: ", process.env.REACT_APP_API_URL+"/api/buyer-requirement")

    const { title, description, price, category, userId } = req.body;

    // Validate required fields
    if (!title || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required, and at least one image must be provided.',
    });
    }

    // Create a new product entry
    const newProduct = new BuyerRequirement({
      title,
      description,
      price,
      category,
      listerId: userId, 
    });

    await newProduct.save();

    console.log("New Product: ", newProduct);

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
