import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search } from "lucide-react";

const SellerDashboardNavbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buyer-listings?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between p-4">
        {/* Left side - Logo, Home, Profile */}
        <div className="flex items-center space-x-4 pl-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/seller-dashboard" className="text-black hover:text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-gray-500 hover:text-gray-600">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Center - Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input
              type="search"
              placeholder="Search buyer listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </form>

        {/* Right side - Actions */}
        <div className="flex space-x-4 mr-4">
          <Link
            to="/listing-form"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            List Product
          </Link>
          <Link
            to="/service-listing"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            List Service
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SellerDashboardNavbar;
