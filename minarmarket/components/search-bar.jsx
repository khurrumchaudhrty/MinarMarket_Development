"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

export function SearchBar({ className, onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  // Debounce the search to prevent too many API calls
  const debouncedSearch = useDebouncedCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/search/quick-search?q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();

      if (data.success && data.suggestions) {
        setSuggestions(data.suggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  useEffect(() => {
    // Add click event listener to handle clicks outside the component
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      debouncedSearch(value);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
      setShowSuggestions(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative w-full flex items-center">
          <Search className="absolute left-3 z-10 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search products and services..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.trim() && setShowSuggestions(true)}
            className="w-full h-9 pl-10 pr-16 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="absolute right-0 h-full bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-r-md"
          >
            Search
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ul className="py-1">
            {suggestions.map((suggestion) => (
              <li key={suggestion}>
                <Link
                  href={`/search?q=${encodeURIComponent(suggestion)}`}
                  className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm"
                  onClick={() => {
                    setQuery(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  <div className="flex items-center">
                    <span className="flex-1">{suggestion}</span>
                    
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isLoading && (
        <div className="absolute top-full mt-1 w-full bg-white rounded-md shadow-lg py-2 px-4 text-center">
          <span className="text-sm text-gray-500">Searching...</span>
        </div>
      )}
    </div>
  );
}
