"use client"

import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { getUserDetails } from "@/lib/SessionManager"
import { useState, useEffect } from "react"
import { ProductGrid } from "@/components/data-grid"
import {
  FaLaptop,
  FaTshirt,
  FaBook,
  FaShoePrints,
  FaCouch,
  FaPumpSoap,
  FaGamepad,
  FaBox,
  FaCut,
  FaWrench,
  FaHammer,
  FaBolt,
  FaLeaf,
  FaUtensils,
  FaBroom,
  FaCode,
  FaPaintBrush,
  FaTools,
} from "react-icons/fa"
import { ServiceCard } from "@/components/product-card"
import { ProductCard } from "@/components/product-card"
import { ArrowLeft, Sparkles } from "lucide-react"

const productCategories = [
  { name: "Electronics", icon: <FaLaptop /> },
  { name: "Clothing", icon: <FaTshirt /> },
  { name: "Books", icon: <FaBook /> },
  { name: "Footwear", icon: <FaShoePrints /> },
  { name: "Furniture", icon: <FaCouch /> },
  { name: "Beauty and Personal Care", icon: <FaPumpSoap /> },
  { name: "Toys", icon: <FaGamepad /> },
  { name: "Other", icon: <FaBox /> },
]

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
]

export default function DashboardPage() {
  const [userDetails, setUserDetails] = useState(getUserDetails())
  const userId = userDetails?.userId || null
  const [type, setType] = useState("buyer") // Default value
  // const [mounted, setMounted] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categoryItems, setCategoryItems] = useState([])
  const [categoryType, setCategoryType] = useState(null)

  // Initialize type from localStorage after component mounts
  // useEffect(() => {
  //   setMounted(true)
  //   // Get localStorage values only after component is mounted on client
  //   if (typeof window !== "undefined") {
  //     const storedType = localStorage.getItem("type")
  //     if (storedType) {
  //       setType(storedType)
  //     }
  //   }
  // }, [])

  // // Subscribe to type-change events from other components
  // useEffect(() => {
  //   const handleTypeChange = (e) => {
  //     setType(e.detail.type)
  //   }
    
  //   window.addEventListener('user-type-changed', handleTypeChange)
    
  //   return () => {
  //     window.removeEventListener('user-type-changed', handleTypeChange)
  //   }
  // }, [])

  

  const handleTypeChange = (newType) => {
    setType(newType)
    
    // Update localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("type", newType)
      
      // Dispatch a custom event to notify other components
      const event = new CustomEvent('user-type-changed', { 
        detail: { type: newType } 
      })
      window.dispatchEvent(event)
    }
  }

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-listings/fetch-category/${category}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })
      if (!response.ok) throw new Error("Failed to fetch products")
      const data = await response.json()
      setCategoryItems(data.data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      setCategoryItems([])
    }
  }

  const fetchServicesByCategory = async (category) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-listings/fetch-category/${category}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })
      if (!response.ok) throw new Error("Failed to fetch services")
      const data = await response.json()
      setCategoryItems(data.data || [])
    } catch (error) {
      console.error("Error fetching services:", error)
      setCategoryItems([])
    }
  }

  const handleCategoryClick = (category, type) => {
    setSelectedCategory(category)
    setCategoryType(type)
    type === "product" ? fetchProductsByCategory(category) : fetchServicesByCategory(category)
  }

  const handleBackClick = () => {
    setSelectedCategory(null)
    setCategoryItems([])
    setCategoryType(null)
  }

  // Get colors based on type
  const primaryColor = type === "buyer" ? "#872CE4" : "#F58014"
  const secondaryColor = type === "buyer" ? "#9F5AE5" : "#FF9D4D"
  const lightBgClass = type === "buyer" ? "from-violet-50 to-white" : "from-orange-50 to-white"
  const accentBgClass = type === "buyer" ? "bg-violet-100" : "bg-orange-100"

  // if (!mounted) {
  //   return null;
  // }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${lightBgClass}`}>
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[250px_1fr] md:gap-8 md:py-8">
        <SidebarNav />
        <main className="flex w-full flex-col gap-8 p-4 md:p-0">
          {/* Show Categories Only When No Category Is Selected */}
          {!selectedCategory ? (
            <>
              {/* Welcome Section */}
              <section className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                  <span className="text-[#872CE4]" style={{ color: primaryColor }}>
                    {type === "buyer" ? "Buyer" : "Seller"}
                  </span>{" "}
                  Dashboard
                </h1>
                <div
                  className="h-1 w-20 bg-gradient-to-r rounded-full mt-4"
                  style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
                ></div>
              </section>

              {/* Product Categories */}
              <section>
                <div className="flex items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mr-3">Product Categories</h2>
                  <div
                    className="h-px flex-grow bg-gradient-to-r opacity-30 rounded-full"
                    style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, transparent)` }}
                  ></div>
                  <Sparkles className="ml-2 h-5 w-5" style={{ color: primaryColor }} />
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
                  {productCategories.map((category, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex aspect-square flex-col items-center justify-center gap-3 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-sm`}
                        onClick={() => handleCategoryClick(category.name, "product")}
                        style={{
                          background:
                            index % 2 === 0
                              ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                              : `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`,
                        }}
                      >
                        <div className="relative flex items-center justify-center w-12 h-12 text-3xl text-white">
                          {category.icon}
                        </div>
                        <span className="text-sm text-white font-medium">{category.name}</span>
                      </div>
                    )
                  })}
                </div>
              </section>

              {/* Service Categories */}
              <section>
                <div className="flex items-center mb-8 mt-12">
                  <h2 className="text-2xl font-bold text-gray-800 mr-3">Service Categories</h2>
                  <div
                    className="h-px flex-grow bg-gradient-to-r opacity-30 rounded-full"
                    style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, transparent)` }}
                  ></div>
                  <Sparkles className="ml-2 h-5 w-5" style={{ color: primaryColor }} />
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
                  {serviceCategories.map((category, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex aspect-square flex-col items-center justify-center gap-3 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-sm`}
                        onClick={() => handleCategoryClick(category.name, "service")}
                        style={{
                          background:
                            index % 2 === 0
                              ? `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`
                              : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                        }}
                      >
                        <div className="relative flex items-center justify-center w-12 h-12 text-3xl text-white">
                          {category.icon}
                        </div>
                        <span className="text-sm text-white font-medium">{category.name}</span>
                      </div>
                    )
                  })}
                </div>
              </section>

              {/* Default Product Grid */}
              <section className="pb-12">
                <div className="flex items-center mb-8 mt-12">
                  <h2 className="text-2xl font-bold text-gray-800 mr-3">
                    {type === "buyer" ? "Recent Listings" : "Recent Listings"}
                  </h2>
                  <div
                    className="h-px flex-grow bg-gradient-to-r opacity-30 rounded-full"
                    style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, transparent)` }}
                  ></div>
                  <Sparkles className="ml-2 h-5 w-5" style={{ color: primaryColor }} />
                </div>
                <ProductGrid userId={userId} />
              </section>
            </>
          ) : (
            <>
              {/* Back Button */}
              <button
                className="mb-8 px-6 py-2 rounded-full border shadow-sm flex items-center gap-2 transition-all duration-300 text-white hover:scale-105"
                onClick={handleBackClick}
                style={{ backgroundColor: primaryColor }}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Categories
              </button>

              {/* Selected Category Items */}
              <section className="pb-12">
                <div className="flex items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mr-3">
                    {categoryType === "product" ? "Products" : "Services"} in {selectedCategory}
                  </h2>
                  <div
                    className="h-px flex-grow bg-gradient-to-r opacity-30 rounded-full"
                    style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, transparent)` }}
                  ></div>
                  <Sparkles className="ml-2 h-5 w-5" style={{ color: primaryColor }} />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categoryItems.length > 0 ? (
                    categoryItems.map((item, index) =>
                      categoryType === "product" ? (
                        <ProductCard
                          key={item.id || index}
                          _id={item._id}
                          title={item.title}
                          images={item.images || ""}
                          price={item.price}
                          category={item.category}
                          status={item.status}
                        />
                      ) : (
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
                      ),
                    )
                  ) : (
                    <p className="text-center col-span-full text-gray-500 bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-violet-100 shadow-sm">
                      No {categoryType === "product" ? "products" : "services"} found for {selectedCategory}.
                    </p>
                  )}
                </div>
              </section>
            </>
          )}
        </main>
      </div>

      {/* Add blob animations similar to home page */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl animate-blob opacity-[0.03]"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl animate-blob animation-delay-2000 opacity-[0.03]"
          style={{ backgroundColor: secondaryColor }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl animate-blob animation-delay-4000 opacity-[0.03]"
          style={{ backgroundColor: type === "buyer" ? "rgb(216, 180, 254)" : "rgb(255, 207, 159)" }}
        ></div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

