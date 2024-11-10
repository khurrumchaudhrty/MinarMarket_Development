const SellerDashboardNavbar = () => {
  return (
    <nav className="bg-dashboardGray border-gray-200">
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
            className="text-white bg-buttonGreen hover:scale-110 animate duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
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
  );
};

export default SellerDashboardNavbar;
