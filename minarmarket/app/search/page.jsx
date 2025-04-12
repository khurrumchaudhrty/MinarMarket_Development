"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/product-card";
import { ServiceCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState({ products: [], services: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(query);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (!query) return;
    
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/search/search?q=${encodeURIComponent(query)}`
        );
        const data = await response.json();

        if (data.success) {
          setSearchResults({
            products: data.results.products || [],
            services: data.results.services || []
          });
        } else {
          setError(data.message || "Failed to fetch results");
          setSearchResults({ products: [], services: [] });
        }
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("An error occurred while fetching search results");
        setSearchResults({ products: [], services: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    // Update URL with new search query
    const url = new URL(window.location);
    url.searchParams.set("q", searchInput);
    window.history.pushState({}, "", url);
    
    // Manually trigger a fetch since we've changed the URL but not navigated
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/search/search?q=${encodeURIComponent(
            searchInput
          )}`
        );
        const data = await response.json();

        if (data.success) {
          setSearchResults({
            products: data.results.products || [],
            services: data.results.services || []
          });
        } else {
          setError(data.message || "Failed to fetch results");
          setSearchResults({ products: [], services: [] });
        }
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("An error occurred while fetching search results");
        setSearchResults({ products: [], services: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  };

  // Calculate total results
  const totalResults = searchResults.products.length + searchResults.services.length;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Results</h1>
          
          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search products and services..."
                className="pl-9"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-purple-600 mb-4" />
            <p className="text-lg text-gray-500">Searching for &quot;{query}&quot;...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                {totalResults === 0
                  ? `No results found for "${query}"`
                  : `Found ${totalResults} results for "${query}"`}
              </p>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">
                  All ({totalResults})
                </TabsTrigger>
                <TabsTrigger value="products">
                  Products ({searchResults.products.length})
                </TabsTrigger>
                <TabsTrigger value="services">
                  Services ({searchResults.services.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-8">
                {totalResults === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-500">No results found</p>
                    <p className="text-gray-400 mt-2">Try searching with different keywords</p>
                  </div>
                ) : (
                  <>
                    {searchResults.products.length > 0 && (
                      <div>
                        <h2 className="text-2xl font-semibold mb-4">Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {searchResults.products.map((product) => (
                            <ProductCard key={product._id} {...product} />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {searchResults.services.length > 0 && (
                      <div>
                        <h2 className="text-2xl font-semibold mb-4">Services</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {searchResults.services.map((service) => (
                            <ServiceCard key={service._id} {...service} />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="products">
                {searchResults.products.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-500">No product results found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {searchResults.products.map((product) => (
                      <ProductCard key={product._id} {...product} />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="services">
                {searchResults.services.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-500">No service results found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {searchResults.services.map((service) => (
                      <ServiceCard key={service._id} {...service} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
      
      <SiteFooter />
    </div>
  );
}
