
import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
const SellerSidebar = () => {
    const [openSubMenu, setOpenSubMenu] = useState({
        'My Listings': true // Set to true by default to match the design
    });

    const toggleSubMenu = (menu) => {
        setOpenSubMenu((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };


    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between">
            <div className="p-4">
                <div className="space-y-4">
                    {/* Seller Header */}
                    <div className="text-lg font-semibold text-gray-800">
                        Seller
                    </div>

                    {/* Dashboard Item */}
                    <div className="flex items-center space-x-2 text-blue-600">
                        <span className="text-lg">⊞</span>
                        <span>Dashboard</span>
                    </div>

                    {/* My Listings Section */}
                    <div>
                        <div className="flex items-center mb-2">
                            <button
                                onClick={() => toggleSubMenu('My Listings')}
                                className="flex items-center space-x-2 text-gray-600"
                            >
                                <span className="text-lg">◎</span>
                                <span>My Listings</span>
                                {openSubMenu['My Listings'] ? (
                                    <ChevronDown className="w-4 h-4 ml-auto" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 ml-auto" />
                                )}
                            </button>
                        </div>

                        {openSubMenu['My Listings'] && (
                            <div className="ml-6 space-y-2">
                                {/* <div className="text-blue-600">Products</div> */}
                                <div>
                                    <Link
                                        to="/seller-dashboard"
                                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
                                    >
                                        <span className="text-lg"></span>
                                        <span>Products</span>
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        to="/seller-dashboard/services"
                                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
                                    >
                                        <span className="text-lg"></span>
                                        <span>Services</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* My Listings Section */}
                    <div>
                        <div className="flex items-center mb-2">
                            <button
                                onClick={() => toggleSubMenu('My Listings')}
                                className="flex items-center space-x-2 text-gray-600"
                            >
                                <span className="text-lg">◎</span>
                                <span>Buyers Requirement</span>
                                {openSubMenu['My Listings'] ? (
                                    <ChevronDown className="w-4 h-4 ml-auto" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 ml-auto" />
                                )}
                            </button>
                        </div>

                        {openSubMenu['My Listings'] && (
                            <div className="ml-6 space-y-2">
                                {/* <div className="text-blue-600">Products</div> */}
                                <div>
                                    <Link
                                        to="/seller-dashboard"
                                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
                                    >
                                        <span className="text-lg"></span>
                                        <span>Products</span>
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        to="/buyer-listings"
                                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
                                    >
                                        <span className="text-lg"></span>
                                        <span>Services</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Buyer requirement
                    <div className="flex items-center space-x-2 text-gray-600">
                        <span className="text-lg">®️</span>
                        <span><a href='/buyer-requirements'>Buyers Requirement</a></span>
                    </div> */}

                    {/* Settings Item */}
                    <div className="flex items-center space-x-2 text-gray-600">
                        <span className="text-lg">⚙</span>
                        <span>Settings</span>
                    </div>

                    <div className="p-4 flex justify-center">
                        <button className="px-4 py-1.5 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600">
                            <a href='/buyer-dashboard'>Switch to Buyer</a>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SellerSidebar;



