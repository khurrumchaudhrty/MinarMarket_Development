import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SellerDashboard from "./pages/SellerDashboard.js";
import BuyerDashboard from "./pages/BuyerDashboard.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import RouteGuard from "./components/RouteGuard.js";
import BuyerMyListings from "./pages/BuyerMyListings.js";
import ProductListingForm from "./pages/ProductListingForm.js";
import ServiceListing from "./pages/ServiceListing.js";
import BuyerListings from "./pages/BuyerListings";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SellerServicesDashboard from "./pages/SellerServicesDashboard.js";
import BuyerRequirementForm from "./pages/BuyerRequirementForm.js";
import BuyerProductRequirement from "./pages/BuyerProductRequirement.js";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
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
          path="/seller-dashboard/services"
          element={
            <RouteGuard>
              <SellerServicesDashboard />
            </RouteGuard>
          }
        />
        <Route
          path="/listing-form"
          element={
            <RouteGuard>
              <ProductListingForm />
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
        <Route
          path="/buyer-listings"
          element={
            <RouteGuard>
              <BuyerListings />
            </RouteGuard>
          }
        />

        <Route
          path="/buyer-requirement-form"
          element={
            <RouteGuard>
              <BuyerRequirementForm /> {/* Protected Buyer Dashboard */}
            </RouteGuard>
          }
        />

        <Route
          path="/buyer-product-requirement"
          element={
            <RouteGuard>
              <BuyerProductRequirement /> {/* Protected Buyer Dashboard */}
            </RouteGuard>
          }
        />

        


        
      </Routes>
    </Router>
  );
}

export default App;
