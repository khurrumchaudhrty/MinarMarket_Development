const ServiceListing = require("../models/ServiceListing");

exports.addServiceListing = async(req,res) => {
    try {
        const {title, description, rate, userId, images, pricingModel, city, category } = req.body;

        if(!title || !description || !rate || !userId ||!pricingModel ||!city ||!category){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        // Check that no more than 6 images are being uploaded
        if (images.length > 6) {
            return res.status(400).json({
                success: false,
                message: 'You can upload a maximum of 6 images.',
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
            listerId:userId
        });

        await newService.save();

        return res.status(201).json({
            success:true,
            message:"Service Listing added successfully.",
            data: newService
        });

    } catch (error) {
        console.error('Error adding Service Listing',error);
        return res.status(500).json({
            success:false,
            message: 'An error occurred while adding the service listing'
        });
    }
}


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

