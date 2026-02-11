"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";
import api from "@/lib/axios";
import { formatPrice } from "@/utils/priceFormat";

type Product = {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  brand?: string;
};

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (query: string) => void;
  value?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search products...",
  onSearch,
  value = "",
}) => {
  const [query, setQuery] = useState(value || "");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === "Enter") {
      // Only redirect on Enter key press
      onSearch?.(query);
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    onSearch?.("");
  };

  useEffect(() => {
    if (value !== undefined) {
      setQuery(value);
    }
  }, [value]);

  // Search API call
  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setLoading(true);
      setIsOpen(true);
      try {
        console.log("Searching for:", query); // Debug log
        const response = await api.get("/products/search", {
          params: { q: query, limit: 8 },
        });
        console.log("Search response:", response.data); // Debug log
        setResults(response.data.products || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("Input changed:", value); // Debug log
    setQuery(value);
    if (value.length >= 2) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setResults([]);
    }
  };

  const handleInputFocus = () => {
    if (query.length >= 2) {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div ref={searchRef} className="relative w-full max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white/90 backdrop-blur-sm"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results Dropdown - Rendered via portal to escape container constraints */}
      {isOpen &&
        createPortal(
          <div
            className="fixed bg-white border-2 border-blue-500 rounded-lg shadow-2xl max-h-96 overflow-y-auto z-[9999]"
            style={{
              top: searchRef.current?.getBoundingClientRect().bottom + 8 + "px",
              left: searchRef.current?.getBoundingClientRect().left + "px",
              width: searchRef.current?.getBoundingClientRect().width + "px",
              minHeight: "200px",
            }}
          >
            {loading ? (
              <div className="p-4 text-center text-gray-500">Searching...</div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No products found
              </div>
            ) : (
              <div className="py-2">
                {results.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product._id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={product.images[0] || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {product.category}{" "}
                        {product.brand && `• ${product.brand}`}
                      </p>
                    </div>

                    <div className="text-sm font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </div>
                  </Link>
                ))}

                {/* View all results option */}
                <button
                  onClick={() => {
                    onSearch?.(query);
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-3 hover:bg-gray-50 transition-colors text-sm text-primary font-medium border-t border-gray-100"
                >
                  View all results for &quot;{query}&quot;
                </button>
              </div>
            )}
          </div>,
          document.body,
        )}
    </>
  );
};

export default SearchBar;
