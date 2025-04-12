"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { getUserDetails } from "@/lib/SessionManager"
import { ServiceOnlyGrid } from "@/components/data-grid"
import { motion } from "framer-motion"
import { useLocalStorage } from 'usehooks-ts'
import {
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
import { ArrowLeft, Search, ArrowDownUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"

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

export default function ServicesPage() {
  const [userDetails, setUserDetails] = useState(getUserDetails())
  const userId = userDetails?.userId || null
  const [type] = useLocalStorage("type", "buyer")

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categoryItems, setCategoryItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("recent")

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const recordVisit = async () => {
    try {
      const token = localStorage.getItem("token")
      let userId = null
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]))
        userId = payload.id
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/webvisits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId || null,
          userAgent: navigator.userAgent,
          page: 5,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
    } catch (error) {
      console.error("Error recording visit:", error)
    }
  }

  useEffect(() => {
    recordVisit()
  }, [])

  const fetchServicesByCategory = async (category) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-listings/fetch-category/${category}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch category services. Status: ${response.status}`)
      }

      const data = await response.json()

      if (data && data.data) {
        setCategoryItems(data.data)
      } else {
        setCategoryItems([])
      }
    } catch (error) {
      console.error("Error fetching services:", error)
      setError(error.message)
      setCategoryItems([])
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    fetchServicesByCategory(category)
  }

  const handleBackClick = () => {
    setSelectedCategory(null)
    setCategoryItems([])
  }

  // Get colors based on type
  const primaryColor = type === "buyer" ? "#872CE4" : "#F58014"
  const secondaryColor = type === "buyer" ? "#9F5AE5" : "#FF9D4D"
  const lightBgClass = type === "buyer" ? "from-violet-50 to-white" : "from-orange-50 to-white"

  // Filter services by search query
  const filteredItems = searchQuery
    ? categoryItems.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : categoryItems

  // Sort services
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "recent") {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    } else {
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
    }
  })

  return (
    <div className={`min-h-screen bg-gradient-to-br ${lightBgClass}`}>
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[250px_1fr] md:gap-8 md:py-8">
        <SidebarNav />
        <motion.main
          className="flex w-full flex-col gap-8 p-4 md:p-0"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-800">Services</h1>
                <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
              </div>
            </div>
            <div
              className="h-1 w-20 rounded-full"
              style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, transparent)` }}
            ></div>
          </motion.div>

          {/* Show Categories Only When No Category Is Selected */}
          {!selectedCategory ? (
            <>
              {/* Service Categories */}
              <motion.section variants={itemVariants}>
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mr-3">Service Categories</h2>
                  <div
                    className="h-px flex-grow bg-gradient-to-r opacity-30 rounded-full"
                    style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, transparent)` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {serviceCategories.map((category, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex aspect-square flex-col items-center justify-center gap-3 rounded-xl overflow-hidden cursor-pointer shadow-sm"
                      onClick={() => handleCategoryClick(category.name)}
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
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Services Only Grid */}
              <motion.section variants={itemVariants}>
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mr-3">Featured Services</h2>
                  <div
                    className="h-px flex-grow bg-gradient-to-r opacity-30 rounded-full"
                    style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, transparent)` }}
                  ></div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
                  <ServiceOnlyGrid userId={userId} />
                </div>
              </motion.section>
            </>
          ) : (
            <>
              {/* Back Button */}
              <motion.div variants={itemVariants}>
                <Button
                  className="mb-6 px-6 py-2 rounded-full border shadow-sm flex items-center gap-2 transition-all duration-300 text-white hover:scale-105"
                  onClick={handleBackClick}
                  style={{ backgroundColor: primaryColor }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Categories
                </Button>
              </motion.div>

              {/* Filter Section */}
              <motion.div
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-5 mb-6"
              >
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  {/* Search Bar */}
                  <div className="relative w-full md:w-64">
                    <SearchBar 
                      className="w-full" 
                      onSearch={(value) => setSearchQuery(value)}
                    />
                  </div>

                  {/* Sort Order */}
                  <div className="flex items-center gap-2">
                    <ArrowDownUp className="h-4 w-4 text-gray-500" />
                    <div className="relative">
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-0"
                        style={{
                          boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                          focusRing: primaryColor,
                        }}
                      >
                        <option value="recent">Most Recent</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Selected Category Items */}
              <motion.section variants={itemVariants}>
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mr-3">Services in {selectedCategory}</h2>
                  <div
                    className="h-px flex-grow bg-gradient-to-r opacity-30 rounded-full"
                    style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, transparent)` }}
                  ></div>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center py-20 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
                    <div
                      className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                      style={{ borderColor: primaryColor }}
                    ></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
                    <p className="text-red-500 mb-4">Error loading services: {error}</p>
                    <Button
                      onClick={() => fetchServicesByCategory(selectedCategory)}
                      className="px-6 py-2 text-white rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {sortedItems && sortedItems.length > 0 ? (
                      sortedItems.map((item, index) => (
                        <motion.div key={item._id || index} variants={itemVariants}>
                          <ServiceCard
                            _id={item._id}
                            title={item.title}
                            images={item.images || ""}
                            rate={item.rate}
                            category={item.category}
                            pricingModel={item.pricingModel}
                            status={item.status}
                          />
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-center col-span-full py-16 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 text-gray-500">
                        No services found for {selectedCategory}.
                      </p>
                    )}
                  </motion.div>
                )}
              </motion.section>
            </>
          )}
        </motion.main>
      </div>

      {/* Add blob animations similar to dashboard page */}
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
