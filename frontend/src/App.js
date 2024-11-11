// // src/App.js
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login"; // Adjust the path if necessary
// import Signup from "./pages/Signup"; // Import Signup component
// import ListingForm from "./pages/Listingform.js";
// import SellerDashboard from "./pages/SellerDashboard.js";
// import RouteGuard from "./components/RouteGuard.js";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} /> {/* Add this line */}
//         {/* Protected routes */}
//         <RouteGuard path="/seller-dashboard" component={SellerDashboard} />
//         <RouteGuard path="/listing-form" component={ListingForm} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"; // Adjust the path if necessary
import Signup from "./pages/Signup"; // Import Signup component
import ListingForm from "./pages/Listingform.js";
import SellerDashboard from "./pages/SellerDashboard.js";
import RouteGuard from "./components/RouteGuard.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* Signup route */}
        
        {/* Protected routes wrapped with RouteGuard */}
        <Route
          path="/seller-dashboard"
          element={
            <RouteGuard>
              <SellerDashboard /> {/* Protected page */}
            </RouteGuard>
          }
        />
        
        <Route
          path="/listing-form"
          element={
            <RouteGuard>
              <ListingForm /> {/* Protected page */}
            </RouteGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
