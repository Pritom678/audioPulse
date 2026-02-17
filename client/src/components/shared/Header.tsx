"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import UserSidebar from "./UserSidebar";
import api from "@/lib/axios";
import { Search, Menu } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { name: "Products", href: "/products" },
  { name: "Support", href: "/support" },
  { name: "About", href: "/about" },
];

const Header: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        setAuthenticated(res.status === 200);
      } catch {
        setAuthenticated(false);
      }
    };

    checkAuth();
  }, []); // Add empty dependency array to run only once on mount

  // Handle outside click to collapse search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        // Only collapse if search is empty
        if (searchQuery.trim() === "") {
          setIsSearchExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchQuery]);

  // Search API call
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await api.get(`/products/search?q=${searchQuery}`);
        setSearchResults(response.data.products || []);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape" && searchQuery.trim() === "") {
      setIsSearchExpanded(false);
    }
  };

  const glassBase =
    "backdrop-blur-md  rounded-full px-4 py-2 " +
    "text-base font-medium transition-all duration-200 " +
    "focus:outline-none focus-visible:ring ring-primary/30";

  const glassInactive =
    "bg-white/10 hover:bg-primary/20 hover:shadow-lg text-neutral hover:text-primary";

  const glassActive = "bg-primary/30 shadow-lg text-primary border-primary/30";

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-base-100/70 backdrop-blur-lg border-b border-base-300">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          {/* Logo and Search Bar - Left Side */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 flex-1">
            <Logo />

            {/* Clean Search Bar with Results */}
            <div
              ref={searchRef}
              className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            >
              <div
                className={`flex items-center bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg transition-all duration-300 ease-in-out ${
                  isSearchExpanded
                    ? "w-full sm:w-40 md:w-48 lg:w-64"
                    : "w-20 sm:w-24 md:w-32 lg:w-40"
                }`}
                onClick={handleSearchClick}
              >
                <Search className="w-4 h-4 text-gray-400 ml-2 sm:ml-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search..."
                  className={`flex-1 bg-transparent outline-none px-2 py-2 text-xs sm:text-sm ${
                    isSearchExpanded ? "cursor-text" : "cursor-pointer"
                  }`}
                  autoFocus={isSearchExpanded}
                  readOnly={!isSearchExpanded}
                />
              </div>

              {/* Expanded Search Bar - Absolute Position */}
              {isSearchExpanded && (
                <div className="absolute top-full left-0 z-50 w-full sm:w-40 md:w-48 lg:w-64">
                  <div className="flex items-center bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg w-full">
                    <Search className="w-4 h-4 text-gray-400 ml-2 sm:ml-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      placeholder="Search..."
                      className="flex-1 bg-transparent outline-none px-2 py-2 text-xs sm:text-sm cursor-text"
                      autoFocus
                    />
                  </div>

                  {/* Search Results Dropdown */}
                  {searchQuery.trim().length >= 2 && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                      {isLoading ? (
                        <div className="p-4 text-center text-gray-500">
                          Searching...
                        </div>
                      ) : searchResults.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No products found
                        </div>
                      ) : (
                        <div className="py-2">
                          {searchResults.map((product: any) => (
                            <Link
                              key={product._id}
                              href={`/products/${product._id}`}
                              className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                              onClick={() => {
                                setSearchQuery("");
                                setIsSearchExpanded(false);
                              }}
                            >
                              <div className="w-10 h-10 rounded bg-gray-100 shrink-0">
                                <Image
                                  src={product.images[0] || "/placeholder.png"}
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="object-cover rounded"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                  {product.name}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  ${product.price.toFixed(2)}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links - Center */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-6 mr-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`border border-white/20 ${glassBase} ${
                      isActive ? glassActive : glassInactive
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Side - Auth Actions */}
          <div className="flex items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              {authenticated ? (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
              ) : (
                <Link
                  href="/signup"
                  className={`${glassBase} ${
                    pathname === "/signup"
                      ? glassActive
                      : "border border-accent bg-white/20 text-primary hover:bg-primary/40 hover:text-white"
                  } px-4 sm:px-6`}
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* User Sidebar - Only when authenticated */}
      {authenticated && (
        <UserSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}
    </>
  );
};

export default Header;
