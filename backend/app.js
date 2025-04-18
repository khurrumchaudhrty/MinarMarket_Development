const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Routes
const UserAuthRoutes = require('./routes/UserAuthRoutes');
const AddProductListing = require('./routes/ProductListingRoutes');
const SellerListing = require('./routes/SellerListingRoutes');
const DeleteSellerListing = require('./routes/DeleteSellerListingRoutes');
const AllProductsListing = require('./routes/AdminListingRoutes');
const UpdateProductsListing = require('./routes/AdminListingRoutes');
const AllServicesListing = require('./routes/ServiceListingRoutes');
const AllServiceListing = require('./routes/AdminListingRoutes');
const AllBuyerProductListing = require('./routes/AdminListingRoutes');
const AllBuyerServiceListing = require('./routes/AdminListingRoutes');

const AddServiceListing = require('./routes/ServiceListingRoutes');
const Bids = require('./routes/Bid'); // For Buyer Bids
const BuyerRequirement = require('./routes/BuyerRequirementRoutes');
const BuyerProductRequirementController = require('./routes/BuyerProductRequirementRoutes');
const ServiceListingRoutes = require('./routes/ServiceListingRoutes');
const ProductListingRoutes = require('./routes/ProductListingRoutes');
const ComplaintRoutes = require('./routes/ComplaintRoutes');
const BuyerMessages = require('./routes/BuyerMessages');
const Visits = require('./routes/VisitRoutes');
const BuyerMessagesToSellers = require("./routes/BuyerMessagesToSellers");
const BuyerServiceRequirement = require('./routes/BuyerServiceRequirementRoutes');
const ChatRoutes = require("./routes/chatRoutes");
const SearchRoutes = require('./routes/SearchRoutes');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }));
app.use(bodyParser.json({ limit: '150mb' }));
app.use(cookieParser());

/// PRODUCTION
// Uncomment the following line for production with request verification middleware
// app.use('/api/authentication', verifyAPIRequest, UserAuthRoutes);

// LOCAL HOST TESTING
app.use('/api/authentication', UserAuthRoutes);
app.use('/send-otp', UserAuthRoutes);
app.use('/addProductListing', AddProductListing);
app.use('/addServiceListing', AddServiceListing);
app.use('/seller-listings', SellerListing);
app.use('/deactivate-listings', DeleteSellerListing);
app.use('/admin-product-listings', AllProductsListing);
app.use('/admin', AllProductsListing);
// app.use('/admin-service-listings', AdminServiceListings);

app.use('/update-listings-status', UpdateProductsListing);
app.use('/seller-services', AllServiceListing);
app.use('/service-listings', AllServicesListing);

// Unified Product and Service Listings Routes
app.use('/product-listings', ProductListingRoutes);
app.use('/service-listings', ServiceListingRoutes);
app.use('/proposals', require('./routes/ProposalRoutes'));
//for Buyer Bids
app.use('/bids/', Bids);
app.use('/buyer-requirement', BuyerRequirement);
app.use('/buyer-product-requirement', BuyerProductRequirementController);
app.use('/buyer-listings', BuyerRequirement);
app.use('/buyer-listings/delete', BuyerRequirement);
app.use('/buyer-listings/update', BuyerRequirement);
app.use('/buyer-service-requirement', BuyerServiceRequirement);

// Search API routes
app.use('/api/search', SearchRoutes);

app.use('/proposals', require('./routes/ProposalRoutes'));

app.use('/report', ComplaintRoutes);
app.use('/buyer-messages', BuyerMessages);
app.use('/buyer-messages/check', BuyerMessages);

app.use("/message-from-buyers", BuyerMessagesToSellers);
app.use("/update-message-status", BuyerMessagesToSellers);

app.use("/webvisits", Visits)



//Routes for chatting
app.use("/chat", ChatRoutes);
module.exports = app;

