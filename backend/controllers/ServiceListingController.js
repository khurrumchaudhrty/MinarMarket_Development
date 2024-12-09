const ServiceListing = require("../models/ServiceListing");

exports.addServiceListing = async(req,res) => {
    try {
        const {title, description, hourlyRate, userId } = req.body;

        if(!title || !description || !hourlyRate || !userId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        const newService = new ServiceListing({
            title,
            description,
            hourlyRate,
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

