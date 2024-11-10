const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
});

const productListingSchema = new mongoose.Schema({
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
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Books', 'Other'],
    },
    isApproved: {
        type: Boolean,
        default: false
    }
    ,
    images: {
        type: [imageSchema],
        validate: {
            validator: (images) => images.length <= 6,
            message: 'A maximum of 6 images can be uploaded.',
        },
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {},
    listerId:{}
});

module.exports = mongoose.model('ProductListing', productListingSchema);
