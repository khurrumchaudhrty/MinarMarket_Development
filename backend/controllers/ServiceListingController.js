const ServiceListing = require("../models/ServiceListing");
const mongoose = require("mongoose");
exports.addServiceListing = async (req, res) => {
  try {
    const {
      title,
      description,
      rate,
      userId,
      images,
      pricingModel,
      city,
      category,
    } = req.body;

    if (
      !title ||
      !description ||
      !rate ||
      !userId ||
      !pricingModel ||
      !city ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check that no more than 6 images are being uploaded
    if (images.length > 6) {
      return res.status(400).json({
        success: false,
        message: "You can upload a maximum of 6 images.",
      });
    }
    const newService = new ServiceListing({
      title,
      description,
      rate,
      pricingModel,
      city,
      category,
      images,
      listerId: userId,
    });

    await newService.save();

    return res.status(201).json({
      success: true,
      message: "Service Listing added successfully.",
      data: newService,
    });
  } catch (error) {
    console.error("Error adding Service Listing", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the service listing",
    });
  }
};

exports.fetchServiceListing = async (req, res) => {
  try {
    // Extract the serviceId from the request parameters
    const { serviceId } = req.params;
    // Validate the serviceId
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID format.",
      });
    }
    // Fetch the service details with only the required fields
    const service = await ServiceListing.findById(
      serviceId,
      "_id title description category rate pricingModel city images"
    );

    // Check if the service exists
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    // Return the service details
    return res.status(200).json({
      success: true,
      message: "Service details fetched successfully.",
      service, // Include the selected service details in the response
    });
  } catch (error) {
    console.error("Error fetching Service Listing", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the service listing",
    });
  }
};

exports.updateServiceListing = async (req, res) => {
  try {
    // Extract the service ID from the route parameters
    const { serviceId } = req.params;

    // Convert serviceId to ObjectId
    const objectId = new mongoose.Types.ObjectId(serviceId);

    const { title,
        description,
        rate,
        pricingModel,
        city,
        category,
        images} = req.body; // Extract fields from the request body

    // Validate required fields
    if (!title || !description || !rate || !category ||!pricingModel ||!city) {
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

    // Find the service by ID and update its details
    const updatedService = await ServiceListing.findByIdAndUpdate(
        objectId, // Use the converted ObjectId
        {
            title,
            description,
            rate,
            pricingModel,
            city,
            category,
            images,
            status: "Pending",
        },
        { new: true } // Return the updated document
    );

    // If no service is found, return an error
    if (!updatedService) {
        return res.status(404).json({
            success: false,
            message: 'Service not found.',
        });
    }

    // Send a success response
    return res.status(200).json({
        success: true,
        message: 'Service details updated successfully.',
        data: updatedService,
    });
  } catch (error) {
    console.error("Error updating Service Listing", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the service listing",
    });
  }
};

// exports.showServiceListings = async(req,res) =>{
//     try{
//         const serviceListings = await ServiceListing.find({status:"Approved"})

//         return res.status(200).json({
//             success:true,
//             message:"Service Listings retreived successfully.",
//             data: serviceListings
//         });

//     }
//     catch(error){
//         console.error("Error retreiving service listings: ", error);
//         return res.status(500).json({
//             success:false,
//             message:"An error occurred while retreiving service listings."
//         });
//     }
// }
