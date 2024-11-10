// const SellerDashboardNavbar = () => {
//   return (
//     <nav className="bg-dashboardGray border-gray-200">
//       <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        
//         {/* Left Navigation Links */}
//         <div className="flex items-center">
//           <ul className="flex space-x-8">
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 md:p-0 rounded font-semibold"
//                 aria-current="page"
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 md:p-0 text-darkGray font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
//               >
//                 Profile
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Right Buttons */}
//         <div className="flex space-x-3">
//           <button
//             type="button"
//             className="text-white bg-buttonGreen hover:scale-110 animate duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
//           >
//             List a Product
//           </button>
//           <button
//             type="button"
//             className="text-white bg-blue-700 hover:scale-110 animate duration-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default SellerDashboardNavbar;



import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

// Navbar Component
const SellerDashboardNavbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Left side with logo and navigation */}
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-black hover:text-gray-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-500 hover:text-gray-600">
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Right side buttons */}
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            List Product
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};


export default SellerDashboardNavbar;