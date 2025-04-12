"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

export function SearchBar({ className }) {
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
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search products and services..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.trim() && setShowSuggestions(true)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <button
          type="submit"
          className="ml-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
        >
          Search
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ul className="py-1">
            {suggestions.map((suggestion) => (
              <li key={`${suggestion.type}-${suggestion.id}`}>
                <Link
                  href={`/search?q=${encodeURIComponent(suggestion.title)}`}
                  className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm"
                  onClick={() => {
                    setQuery(suggestion.title);
                    setShowSuggestions(false);
                  }}
                >
                  <div className="flex items-center">
                    <span className="flex-1">{suggestion.title}</span>
                    <span className="text-xs text-gray-500 capitalize">
                      {suggestion.type}
                    </span>
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
