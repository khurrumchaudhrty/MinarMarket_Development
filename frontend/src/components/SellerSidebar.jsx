// import React, { useState } from 'react';
// import { ChevronRight, ChevronDown } from 'lucide-react';

// const SellerSidebar = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [openSubMenu, setOpenSubMenu] = useState({});

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     const toggleSubMenu = (menu) => {
//         console.log('toggleSubmenu being pressed')
//         setOpenSubMenu((prev) => ({
//             ...prev,
//             [menu]: !prev[menu],
//         }));
//     };

//     return (
//         <div>
//             {/* Navbar */}
//             <nav className="bg-dashboardGray border-gray-200 w-full">
//                 <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">

//                     {/* Left Navigation Links */}
//                     <div className="flex items-center">
//                         <ul className="flex space-x-8">
//                             <li>
//                                 <a
//                                     href="#"
//                                     className="block py-2 px-3 md:p-0 rounded font-semibold"
//                                     aria-current="page"
//                                 >
//                                     Home
//                                 </a>
//                             </li>
//                             <li>
//                                 <a
//                                     href="#"
//                                     className="block py-2 px-3 md:p-0 text-darkGray font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
//                                 >
//                                     Profile
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Right Buttons */}
//                     <div className="flex space-x-3">
//                         <button
//                             type="button"
//                             className="text-white bg-buttonGreen hover:scale-110 animate duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
//                         >
//                             List a Product
//                         </button>
//                         <button
//                             type="button"
//                             className="text-white bg-blue-700 hover:scale-110 animate duration-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </nav>

//             {/* Sidebar and Main Content Wrapper */}
//             <div className="flex">
//                 {/* Sidebar */}
//                 <aside
//                     className={`bg-dashboardGray text-center text-darkGray h-screen p-4 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-24'
//                         }`}
//                 >
//                     <button
//                         onClick={toggleSidebar}
//                         className="mb-6 text-darkGray focus:outline-none"
//                     >
//                         {isSidebarOpen ? 'Collapse' : 'Expand'}
//                     </button>

//                     {/* Sidebar Menu */}
//                     <nav className="space-y-5 flex flex-col items-center">
//                         <SidebarItem
//                             label="Dashboard"
//                             isSidebarOpen={isSidebarOpen}
//                             hasSubMenu={false}
//                         />
//                         <SidebarItem
//                             label="Settings"
//                             isSidebarOpen={isSidebarOpen}
//                             hasSubMenu={true}
//                             openSubMenu={openSubMenu}
//                             onClick={() => toggleSubMenu('settings')}
//                             submenuItems={[
//                                 { label: 'Profile Settings' },
//                                 { label: 'Account Settings' },
//                             ]}
//                         />
//                         <SidebarItem
//                             label="Reports"
//                             isSidebarOpen={isSidebarOpen}
//                             hasSubMenu={true}
//                             openSubMenu={openSubMenu}
//                             onClick={() => toggleSubMenu('reports')}
//                             submenuItems={[
//                                 { label: 'Sales Report' },
//                                 { label: 'Expense Report' },
//                                 { label: 'Customer Report' },
//                             ]}
//                         />
//                         <SidebarItem
//                             label="Help"
//                             isSidebarOpen={isSidebarOpen}
//                             hasSubMenu={false}
//                         />
//                     </nav>
//                 </aside>

//                 {/* Main Content */}
//                 <main className="flex-1 p-4">
//                     {/* Your main content goes here */}
//                     <h1 className="text-2xl font-bold">Welcome to the Seller Dashboard</h1>
//                     <p className="mt-4">Here is the main content area.</p>
//                 </main>
//             </div>
//         </div>
//     );
// };

// // Sidebar Item Component
// const SidebarItem = ({
//     label,
//     isSidebarOpen,
//     hasSubMenu,
//     openSubMenu,
//     onClick,
//     submenuItems = [],
// }) => {
//     return (
//         <div>
//             <button
//                 className="flex items-center w-full text-left focus:outline-none"
//                 onClick={onClick}
//             >
//                 <span className="flex-1">{label}</span>
//                 {hasSubMenu && (
//                     <span>
//                         {openSubMenu[label] ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </span>
//                 )}
//             </button>
//             {hasSubMenu && openSubMenu[label] && (
//                 <div className={`ml-4 mt-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>
//                     {submenuItems.map((item, index) => (
//                         <div key={index} className="mt-1 pl-2">
//                             {item.label}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SellerSidebar;


import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const SellerSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [openSubMenu, setOpenSubMenu] = useState({});

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSubMenu = (menu) => {
        console.log('toggleSubmenu being pressed');
        setOpenSubMenu((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="bg-dashboardGray border-gray-200 w-full">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    {/* Left Navigation Links */}
                    <div className="flex items-center">
                        <ul className="flex space-x-8">
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 px-3 md:p-0 rounded font-semibold"
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 px-3 md:p-0 text-darkGray font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                                >
                                    Profile
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Right Buttons */}
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            className="text-white bg-buttonGreen hover:scale-110 animate duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                        >
                            List a Product
                        </button>
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:scale-110 animate duration-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Sidebar and Main Content Wrapper */}
            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`bg-dashboardGray text-center text-darkGray h-screen p-4 transition-all duration-300 ${
                        isSidebarOpen ? 'w-64' : 'w-24'
                    }`}
                >
                    <button
                        onClick={toggleSidebar}
                        className="mb-6 text-darkGray focus:outline-none"
                    >
                        {isSidebarOpen ? 'Collapse' : 'Expand'}
                    </button>

                    {/* Sidebar Menu */}
                    <nav className="space-y-5 flex flex-col items-center">
                        <SidebarItem
                            label="Dashboard"
                            isSidebarOpen={isSidebarOpen}
                            hasSubMenu={false}
                        />
                        <SidebarItem
                            label="My Listings"
                            isSidebarOpen={isSidebarOpen}
                            hasSubMenu={true}
                            openSubMenu={openSubMenu}
                            onClick={() => toggleSubMenu('My Listings')}
                            submenuItems={[
                                { label: 'Products' },
                                { label: 'Services' },
                            ]}
                        />
                        {/* <SidebarItem
                            label="Reports"
                            isSidebarOpen={isSidebarOpen}
                            hasSubMenu={true}
                            openSubMenu={openSubMenu}
                            onClick={() => toggleSubMenu('Reports')}
                            submenuItems={[
                                { label: 'Sales Report' },
                                { label: 'Expense Report' },
                                { label: 'Customer Report' },
                            ]}
                        /> */}
                        <SidebarItem
                            label="Settings"
                            isSidebarOpen={isSidebarOpen}
                            hasSubMenu={false}
                        />
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4">
                    <h1 className="text-2xl font-bold">Welcome to the Seller Dashboard</h1>
                    <p className="mt-4">Here is the main content area.</p>
                </main>
            </div>
        </div>
    );
};

// Sidebar Item Component
const SidebarItem = ({
    label,
    isSidebarOpen,
    hasSubMenu,
    openSubMenu,
    onClick,
    submenuItems = [],
}) => {
    return (
        <div>
            <button
                className="flex items-center w-full text-left focus:outline-none"
                onClick={onClick}
            >
                <span className="flex-1">{label}</span>
                {hasSubMenu && (
                    <span>
                        {openSubMenu[label] ? (
                            <ChevronDown className="w-4 h-4" />
                        ) : (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </span>
                )}
            </button>
            {hasSubMenu && openSubMenu[label] && (
                <div className={`ml-4 mt-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>
                    {submenuItems.map((item, index) => (
                        <div key={index} className="mt-1 pl-2">
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SellerSidebar;
