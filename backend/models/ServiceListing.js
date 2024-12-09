const mongoose = require('mongoose');


const serviceListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 200,
    },
    hourlyRate: {
        type: Number,
        required: true,
        min: 0,
    }, 
    availability:{
        type:Boolean,
        default:0
    },
    listerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    isActive:{
        type:Boolean,
        default:1
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Approved", "Rejected", "Pending"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Ensure updatedAt is updated on every save operation
serviceListingSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});


module.exports = mongoose.model('ServiceListing', serviceListingSchema);
