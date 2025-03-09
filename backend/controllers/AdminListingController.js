const ProductListing = require('../models/ProductListing');
const user = require('../models/User');
const ServiceListing = require('../models/ServiceListing');
const BuyerRequirement = require('../models/BuyerRequirement');
const BuyerServiceRequirement = require('../models/BuyerServiceRequirement');

exports.getAllBuyerServiceRequirements = async (req, res) => {

    try {
        // Fetch all active buyer service requirements and populate the lister's name
        const requirements = await BuyerServiceRequirement.find({ isActive: true })
            .populate({
                path: 'listerId',
                model: 'user',
                select: 'name' // Fetch only the name field from the User model
            });

        // Check if any buyer service requirements were found
        if (requirements.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No buyer service requirements found in the database.',
            });
        }

        // Send a success response with the requirements
        return res.status(200).json({
            success: true,
            message: 'Buyer service requirements fetched successfully.',
            data: requirements,
        });
    } catch (error) {
        console.error('Error fetching buyer service requirements:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching buyer service requirements.',
        });
    }
};




exports.getAllBuyerProductRequirements = async (req, res) => {
    
    try {
        // Fetch all active buyer product requirements and populate the lister's name
        const requirements = await BuyerRequirement.find({ isActive: true })
            .populate({
                path: 'listerId',
                model: 'user',
                select: 'name' // Fetch only the name field from the User model
            });

        // Check if any buyer product requirements were found
        if (requirements.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No buyer product requirements found in the database.',
            });
        }

        // Send a success response with the requirements
        return res.status(200).json({
            success: true,
            message: 'Buyer product requirements fetched successfully.',
            data: requirements,
        });
    } catch (error) {
        console.error('Error fetching buyer product requirements:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching buyer product requirements.',
        });
    }
};



exports.getAllServiceListings = async (req, res) => {
    console.log("hkjdjdj")
    try {
        // Fetch all active service listings and populate the lister's name from the User collection
        const services = await ServiceListing.find({ isActive: true })
            .populate({
                path: 'listerId',
                model: 'user',
                select: 'name' // Only select the name field from the User model
            });

        // Check if any service listings were found
        if (services.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No service listings found in the database.',
            });
        }

        // Send a success response with the services and the lister's name
        return res.status(200).json({
            success: true,
            message: 'Service listings fetched successfully.',
            data: services,
        });
    } catch (error) {
        console.error('Error fetching all service listings:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching service listings.',
        });
    }
};

exports.getAllProductListings = async (req, res) => {
    
    

    
    try {
        // Find all active product listings and populate the lister's name from the User collection
        const products = await ProductListing.find({ isActive: 1 })
            .populate({
                path: 'listerId',
                model: 'user', 
                select: 'name' // Only select the name field from the User model
            });

        // Check if products were found
        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No product listings found in the database.',
            });
        }

        // Send a success response with the products and the seller's name
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



exports.getUpdateServiceListings = async (req, res) => {
    
    const { serviceIds, newStatus } = req.body;
  
    if (!serviceIds || !newStatus) {
        return res.status(400).json({
            success: false,
            message: "Please provide both serviceIds and newStatus in the request body.",
        });
    }

    try {
        const updateResult = await ServiceListing.updateMany(
            { _id: { $in: serviceIds } },
            { status: newStatus }
        );

        if (updateResult.nModified === 0) {
            return res.status(404).json({
                success: false,
                message: "No service listings were updated. Please check the serviceIds.",
            });
        }

        return res.status(200).json({
            success: true,
            message: `Service listings updated to ${newStatus} successfully.`,
        });

    } catch (error) {
        console.error("Error updating service listings:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating service listings.",
        });
    }

}

exports.getUpdateBuyerProductListings= async (req, res) => {
   
    const { requirementIds, newStatus } = req.body;
    
    if (!requirementIds || !newStatus) {
        return res.status(400).json({
            success: false,
            message: "Please provide both requirementIdsand newStatus in the request body.",
        });
    }

    try {
        const updateResult = await BuyerRequirement.updateMany(
            { _id: { $in: requirementIds } },
            { status: newStatus }
        );

        if (updateResult.nModified === 0) {
            return res.status(404).json({
                success: false,
                message: "No buyer product requirements were updated. Please check the requirementIds.",
            });
        }

        return res.status(200).json({
            success: true,
            message: `Buyer product requirements updated to ${newStatus} successfully.`,
        });

    } catch (error) {
        console.error("Error updating buyer product requirements:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating buyer product requirements.",
        });
    }
}

exports.getUpdateBuyerServiceListings = async (req, res) => {
   
    const { requirementIds, newStatus } = req.body;

    if (!requirementIds || !newStatus) {
        return res.status(400).json({
            success: false,
            message: "Please provide bothrequirementIds and newStatus in the request body.",
        });
    }

    try {
        const updateResult = await BuyerServiceRequirement.updateMany(
            { _id: { $in: requirementIds } },
            { status: newStatus }
        );

        if (updateResult.nModified === 0) {
            return res.status(404).json({
                success: false,
                message: "No buyer service requirements were updated. Please check the requirementIds.",
            });
        }

        return res.status(200).json({
            success: true,
            message: `Buyer service requirements updated to ${newStatus} successfully.`,
        });

    } catch (error) {
        console.error("Error updating buyer service requirements:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating buyer service requirements.",
        });
    }
}


exports.getUpdateProductListings = async (req, res) => {
    const { itemIds, newStatus } = req.body;
    // Check if itemIds and newStatus are provided
    if (!itemIds || !newStatus) {
        return res.status(400).json({
            success: false,
            message: "Please provide both itemIds and newStatus in the request body.",
        });
    }

    try {
        // Update the status of all listings with matching itemIds
        const updateResult = await ProductListing.updateMany(
            { _id: { $in: itemIds } }, // Match listings by itemIds
            { status: newStatus }      // Set the new status
        );

        // Check if any listings were updated
        if (updateResult.nModified === 0) {
            return res.status(404).json({
                success: false,
                message: "No listings were updated. Please check the itemIds.",
            });
        }

        return res.status(200).json({
            success: true,
            message: `Listings updated to ${newStatus} successfully.`,
        });

    } catch (error) {
        console.error("Error updating product listings:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating product listings.",
        });
    }
};

