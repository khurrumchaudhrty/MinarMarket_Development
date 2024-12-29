const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Routes
const UserAuthRoutes = require('./routes/UserAuthRoutes');
const AddProductListing = require('./routes/ProductListingRoutes');
const SellerListing = require('./routes/SellerListingRoutes');
const DeleteSellerListing = require('./routes/DeleteSellerListingRoutes');
const AllProductsListing = require('./routes/AdminListingRoutes');
const UpdateProductsListing = require('./routes/AdminListingRoutes');
// const ProductListingRoutes = require('./routes/ProductListingRoutes');
// const SellerListing = require('./routes/SellerListingRoutes')
const AddServiceListing = require('./routes/ServiceListingRoutes');
const Bids = require('./routes/Bid');//for Buyer Bids
const BuyerRequirement = require('./routes/BuyerRequirementRoutes');
const BuyerProductRequirementController = require('./routes/BuyerProductRequirementRoutes');

const ServiceListingRoutes = require('./routes/ServiceListingRoutes');
const ProductListingRoutes = require('./routes/ProductListingRoutes');
// const { verifyAPIRequest } = require('./middleware/authAPIRequest');


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }));
app.use(bodyParser.json({ limit: '150mb' }));

app.use(cookieParser());

/// PRODUCTION
// app.use('/api/authentication', verifyAPIRequest, UserAuthRoutes);

// console.log(process.env.REACT_APP_API_URL+"/api/buyer-requirement")


// LOCAL HOST TESTING
app.use('/api/authentication',  UserAuthRoutes);
app.use('/addProductListing', AddProductListing);
app.use('/addServiceListing', AddServiceListing);
app.use('/seller-listings', SellerListing); // Add this line
app.use('/deactivate-listings', DeleteSellerListing);
app.use('/admin-product-listings', AllProductsListing);
app.use('/update-listings-status', UpdateProductsListing);
// app.use('/deactivate-listings', DeleteSellerListingRoutes)
// app.use('/product-listings', require('./routes/ProductListingRoutes'));
app.use('/product-listings', ProductListingRoutes);
app.use('/service-listings', ServiceListingRoutes);
//for Buyer Bids
app.use('/bids/', Bids);
app.use('/buyer-requirement', BuyerRequirement);
// app.use('/buyer-product-requirement', BuyerProductRequrementController);
app.use('/buyer-product-requirement', BuyerProductRequirementController); // Fix this usage


// console.log("App.js wala API: ", process.env.REACT_APP_API_URL+"/api/buyer-requirement")

module.exports = app;

