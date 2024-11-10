// import SellerDashboardNavbar from "../components/SellerDashboardNavbar";
// import SellerSidebar from "../components/SellerSidebar";
// const SellerDashboard = () => {

//     return (
//         <>
//            <SellerDashboardNavbar/> 
//            <SellerSidebar/>
//         </>
//     );
// }

// export default SellerDashboard;


import SellerDashboardNavbar from "../components/SellerDashboardNavbar";
import SellerSidebar from "../components/SellerSidebar";
import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';


const SellerDashboard = () => {
return (

<div className="flex flex-col min-h-screen">
      <SellerDashboardNavbar />
      <div className="flex flex-1">
        <SellerSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-xl font-semibold mb-4">Products</h1>
          {/* Products Table */}
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Listing ID</th>
                <th className="pb-2">Date Listed</th>
                <th className="pb-2">Product Title</th>
                <th className="pb-2">Status</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 text-blue-600">#A1DA59</td>
                <td>23/09/2024</td>
                <td>Laptop</td>
                <td className="text-green-600">Approved</td>
                <td className="text-blue-600">Edit Product Details</td>
              </tr>
              <tr>
                <td className="py-3 text-blue-600">#A1DA58</td>
                <td>23/09/2024</td>
                <td>Camera</td>
                <td className="text-yellow-600">Pending</td>
                <td className="text-blue-600">Edit Product Details</td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
      {/* Footer */}
      <footer className="border-t border-gray-200 py-4">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-end space-x-6 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-900">Help Center</a>
          <a href="#" className="hover:text-gray-900">Terms of Service</a>
          <a href="#" className="hover:text-gray-900">Privacy Policy</a>
        </div>
      </footer>
    </div>

);

}

export default SellerDashboard;
