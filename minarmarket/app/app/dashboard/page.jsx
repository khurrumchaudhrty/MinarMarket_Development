
// "use client";

// import { Header } from "@/components/header";
// import { SidebarNav } from "@/components/sidebar-nav";
// import { ProductCard } from "@/components/product-card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { getUserDetails } from "@/lib/SessionManager";
// import { useEffect, useState } from "react";
// import { ProductGrid } from "@/components/data-grid";
// import {
//   FaLaptop, FaTshirt, FaBook, FaShoePrints, FaCouch, FaPumpSoap, FaGamepad, FaBox,
//   FaCut, FaWrench, FaHammer, FaBolt, FaLeaf, FaUtensils, FaBroom, FaCode, FaPaintBrush, FaTools
// } from "react-icons/fa";
// import { ServiceCard } from "@/components/product-card";


// const productCategories = [
//   { name: "Electronics", icon: <FaLaptop /> },
//   { name: "Clothing", icon: <FaTshirt /> },
//   { name: "Books", icon: <FaBook /> },
//   { name: "Footwear", icon: <FaShoePrints /> },
//   { name: "Furniture", icon: <FaCouch /> },
//   { name: "Beauty and Personal Care", icon: <FaPumpSoap /> },
//   { name: "Toys", icon: <FaGamepad /> },
//   { name: "Other", icon: <FaBox /> },
// ];

// const serviceCategories = [
//   { name: "Haircut", icon: <FaCut /> },
//   { name: "Plumbing", icon: <FaWrench /> },
//   { name: "Carpentry", icon: <FaHammer /> },
//   { name: "Electrical", icon: <FaBolt /> },
//   { name: "Gardening", icon: <FaLeaf /> },
//   { name: "Catering", icon: <FaUtensils /> },
//   { name: "House Help", icon: <FaBroom /> },
//   { name: "Web Development", icon: <FaCode /> },
//   { name: "Design", icon: <FaPaintBrush /> },
//   { name: "Other", icon: <FaTools /> },
// ];


// export default function DashboardPage() {
//   const [userDetails, setUserDetails] = useState(getUserDetails());
//   const userId = userDetails?.userId || null; // Extract userId safely

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [categoryItems, setCategoryItems] = useState([]);
//   const [categoryType, setCategoryType] = useState(null); // "product" or "service"

//   const fetchProductsByCategory = async (category) => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/product-listings/fetch-category/${category}`,
//         {
//           method: "POST", // Change to POST to send body data
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: userId || null, // Send userId in body
//           }),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to fetch products");

//       const data = await response.json();
//       // console.log("Data:", data);
//       setCategoryItems(data.data || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setCategoryItems([]); // Ensure it doesn't retain old data
//     }
//   };


//   // Function to fetch services by category
//   const fetchServicesByCategory = async (category) => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/service-listings/fetch-category/${category}`,
//         {
//           method: "POST", // Change to POST to send body data
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: userId || null, // Send userId in body
//           }),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to fetch services");

//       const data = await response.json();
//       // console.log("Data:", data);
//       setCategoryItems(data.data || []);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//       setCategoryItems([]); // Ensure it doesn't retain old data
//     }
//   };

//   // Handle category click
//   const handleCategoryClick = (category, type) => {
//     setSelectedCategory(category);
//     setCategoryType(type);

//     if (type === "product") {
//       fetchProductsByCategory(category);
//     } else if (type === "service") {
//       fetchServicesByCategory(category);
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col px-4">
//       <Header />
//       <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-4 md:py-6">
//         <SidebarNav />
//         <main className="flex w-full flex-col gap-8">

//           {/* Product Categories Section */}
//           <section>
//             <h2 className="mb-6 text-2xl font-bold">Product Categories</h2>
//             <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-8">
//               {productCategories.map((category, index) => (
//                 <div
//                   key={index}
//                   className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border bg-card text-card-foreground cursor-pointer hover:bg-gray-200"
//                   onClick={() => handleCategoryClick(category.name, "product")}
//                 >
//                   <div className="relative flex items-center justify-center w-16 h-16 text-3xl text-gray-700">
//                     {category.icon}
//                   </div>
//                   <span className="text-xs">{category.name}</span>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Service Categories Section */}
//           <section>
//             <h2 className="mb-6 text-2xl font-bold">Service Categories</h2>
//             <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-8">
//               {serviceCategories.map((category, index) => (
//                 <div
//                   key={index}
//                   className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border bg-card p-4 text-card-foreground cursor-pointer hover:bg-gray-200"
//                   onClick={() => handleCategoryClick(category.name, "service")}
//                 >

//                   <div className="relative flex items-center justify-center w-16 h-16 text-3xl text-gray-700">
//                     {category.icon}
//                   </div>

//                   <span className="text-xs">{category.name}</span>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Conditional Rendering: Show Category Items or Product Grid */}
//           {selectedCategory ? (
//             <section>
//               <h2 className="mb-6 text-2xl font-bold">
//                 {categoryType === "product" ? "Products" : "Services"} in {selectedCategory}
//               </h2>
//               <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//                 {categoryItems.length > 0 ? (
//                   categoryItems.map((item, index) => <ServiceCard key={item.id || index} _id={item._id}
//                     title={item.title}
//                     images={item.images || ''}
//                     rate={item.rate}
//                     category={item.category}
//                     pricingModel={item.pricingModel}
//                     status={item.status} />)
//                 ) : (
//                   <p className="text-center col-span-full">No {categoryType === "product" ? "products" : "services"} found for {selectedCategory}.</p>
//                 )}
//               </div>
//             </section>
//           ) : (
//             <ProductGrid userId={userId} />
//           )}

//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import { Header } from "@/components/header";
import { SidebarNav } from "@/components/sidebar-nav";
import { ProductCard } from "@/components/product-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserDetails } from "@/lib/SessionManager";
import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/data-grid";
import {
  FaLaptop, FaTshirt, FaBook, FaShoePrints, FaCouch, FaPumpSoap, FaGamepad, FaBox,
  FaCut, FaWrench, FaHammer, FaBolt, FaLeaf, FaUtensils, FaBroom, FaCode, FaPaintBrush, FaTools
} from "react-icons/fa";
import { ServiceCard } from "@/components/product-card";

const productCategories = [
  { name: "Electronics", icon: <FaLaptop /> },
  { name: "Clothing", icon: <FaTshirt /> },
  { name: "Books", icon: <FaBook /> },
  { name: "Footwear", icon: <FaShoePrints /> },
  { name: "Furniture", icon: <FaCouch /> },
  { name: "Beauty and Personal Care", icon: <FaPumpSoap /> },
  { name: "Toys", icon: <FaGamepad /> },
  { name: "Other", icon: <FaBox /> },
];

const serviceCategories = [
  { name: "Haircut", icon: <FaCut /> },
  { name: "Plumbing", icon: <FaWrench /> },
  { name: "Carpentry", icon: <FaHammer /> },
  { name: "Electrical", icon: <FaBolt /> },
  { name: "Gardening", icon: <FaLeaf /> },
  { name: "Catering", icon: <FaUtensils /> },
  { name: "House Help", icon: <FaBroom /> },
  { name: "Web Development", icon: <FaCode /> },
  { name: "Design", icon: <FaPaintBrush /> },
  { name: "Other", icon: <FaTools /> },
];

export default function DashboardPage() {
  const [userDetails, setUserDetails] = useState(getUserDetails());
  const userId = userDetails?.userId || null;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);
  const [categoryType, setCategoryType] = useState(null);

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product-listings/fetch-category/${category}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setCategoryItems(data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setCategoryItems([]);
    }
  };

  const fetchServicesByCategory = async (category) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/service-listings/fetch-category/${category}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
      if (!response.ok) throw new Error("Failed to fetch services");
      const data = await response.json();
      setCategoryItems(data.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      setCategoryItems([]);
    }
  };

  const handleCategoryClick = (category, type) => {
    setSelectedCategory(category);
    setCategoryType(type);
    type === "product" ? fetchProductsByCategory(category) : fetchServicesByCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    setCategoryItems([]);
    setCategoryType(null);
  };

  return (
    <div className="flex min-h-screen flex-col px-4">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-4 md:py-6">
        <SidebarNav />
        <main className="flex w-full flex-col gap-8">

          {/* Show Categories Only When No Category Is Selected */}
          {!selectedCategory ? (
            <>
              {/* Product Categories */}
              <section>
                <h2 className="mb-6 text-2xl font-bold">Product Categories</h2>
                <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-8">
                  {productCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border bg-card text-card-foreground cursor-pointer hover:bg-gray-200"
                      onClick={() => handleCategoryClick(category.name, "product")}
                    >
                      <div className="relative flex items-center justify-center w-16 h-16 text-3xl text-gray-700">
                        {category.icon}
                      </div>
                      <span className="text-xs">{category.name}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Service Categories */}
              <section>
                <h2 className="mb-6 text-2xl font-bold">Service Categories</h2>
                <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-8">
                  {serviceCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border bg-card p-4 text-card-foreground cursor-pointer hover:bg-gray-200"
                      onClick={() => handleCategoryClick(category.name, "service")}
                    >
                      <div className="relative flex items-center justify-center w-16 h-16 text-3xl text-gray-700">
                        {category.icon}
                      </div>
                      <span className="text-xs">{category.name}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Default Product Grid */}
              <ProductGrid userId={userId} />
            </>
          ) : (
            <>
              {/* Back Button */}
              <button
                className="mb-4 px-4 py-2 bg-gray-300 rounded-md w-fit hover:bg-gray-400"
                onClick={handleBackClick}
              >
                ← Back to Categories
              </button>

              {/* Selected Category Items */}
              <section>
                <h2 className="mb-6 text-2xl font-bold">
                  {categoryType === "product" ? "Products" : "Services"} in {selectedCategory}
                </h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {categoryItems.length > 0 ? (
                    categoryItems.map((item, index) => (
                      <ServiceCard
                        key={item.id || index}
                        _id={item._id}
                        title={item.title}
                        images={item.images || ""}
                        rate={item.rate}
                        category={item.category}
                        pricingModel={item.pricingModel}
                        status={item.status}
                      />
                    ))
                  ) : (
                    <p className="text-center col-span-full">
                      No {categoryType === "product" ? "products" : "services"} found for {selectedCategory}.
                    </p>
                  )}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
