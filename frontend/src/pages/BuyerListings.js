import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, MessageCircle, Bookmark, BookmarkCheck } from "lucide-react";
import SellerDashboardNavbar from "../components/SellerDashboardNavbar";

const BuyerListings = () => {
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [savedListings, setSavedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock Listings Data
  const mockListings = [
    {
      id: 1,
      title: "Web Developer Needed for E-commerce Site",
      description: "Looking for an experienced web developer to build a custom e-commerce platform...",
      type: "Service",
      category: "Technology",
      location: "Remote",
      budget: 5000,
      deadline: new Date(2023, 11, 31).toISOString(),
    },
    {
      id: 2,
      title: "Graphic Designer for Brand Identity",
      description: "Seeking a creative graphic designer to develop a complete brand identity package...",
      type: "Service",
      category: "Design",
      location: "Local",
      budget: 3000,
      deadline: new Date(2023, 10, 15).toISOString(),
    },
    {
      id: 3,
      title: "Content Writer for Tech Blog",
      description: "Need a skilled content writer to produce engaging articles for our tech blog...",
      type: "Service",
      category: "Writing",
      location: "Remote",
      budget: 1500,
      deadline: new Date(2023, 9, 30).toISOString(),
    },
  ];

  // Fetch mock listings based on search params
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const searchQuery = searchParams.get("search") || "";
        // Simulate API filter by search
        const filteredListings = mockListings.filter((listing) =>
          listing.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setListings(filteredListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchParams]);

  const toggleSaved = (listingId) => {
    setSavedListings((prev) =>
      prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId]
    );
  };

  const handleContact = (listingId) => {
    console.log("Contacting buyer for listing:", listingId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerDashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Buyer Listings</h1>
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No listings found matching your criteria.</p>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">{listing.title}</h2>
                  <button
                    className="text-gray-600"
                    onClick={() => toggleSaved(listing.id)}
                  >
                    {savedListings.includes(listing.id) ? (
                      <BookmarkCheck className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{listing.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>Budget: ${listing.budget}</span>
                  <span>Deadline: {new Date(listing.deadline).toLocaleDateString()}</span>
                </div>
                <button
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
                  onClick={() => handleContact(listing.id)}
                >
                  <MessageCircle className="h-4 w-4 mr-2 inline-block" />
                  Contact Buyer
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BuyerListings;
