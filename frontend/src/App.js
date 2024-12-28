import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import ListingForm from "./pages/Listingform.js";
import SellerDashboard from "./pages/SellerDashboard.js";
import BuyerDashboard from "./pages/BuyerDashboard.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import RouteGuard from "./components/RouteGuard.js";
import BuyerMyListings from "./pages/BuyerMyListings.js";
import ProductListingForm from "./pages/ProductListingForm.js";
import ServiceListing from "./pages/ServiceListing.js"; // Import the new ServiceListing page

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/seller-dashboard"
          element={
            <RouteGuard>
              <SellerDashboard />
            </RouteGuard>
          }
        />
        <Route
          path="/listing-form"
          element={
            <RouteGuard>
              <ProductListingForm /> {/* Protected Listing Form */}

            </RouteGuard>
          }
        />
        <Route
          path="/service-listing"
          element={
            <RouteGuard>
              <ServiceListing />
            </RouteGuard>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <RouteGuard>
              <AdminDashboard />
            </RouteGuard>
          }
        />
        <Route
          path="/buyer-dashboard"
          element={
            <RouteGuard>
              <BuyerDashboard />
            </RouteGuard>
          }
        />
        <Route
          path="/my-listings"
          element={
            <RouteGuard>
              <BuyerMyListings />
            </RouteGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;