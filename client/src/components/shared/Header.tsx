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
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Handle scroll effect for header transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside click to collapse search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        // Collapse search if empty
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
      <header
        className={`
          w-full transition-all duration-300 ease-in-out
          ${
            isScrolled
              ? "fixed top-0 left-0 right-0 z-50 bg-base-100/80 backdrop-blur-xl border-b border-base-300/50 shadow-lg"
              : "relative bg-base-100 border-b border-base-300"
          }
        `}
      >
        <nav className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          {/* Left Side - Logo and Search */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1">
            {/* Logo */}
            <div className="shrink-0">
              <Logo />
            </div>

            {/* Search Bar - Desktop */}
            <div
              ref={searchRef}
              className="relative hidden md:block max-w-xs lg:max-w-sm"
            >
              <div
                className={`flex items-center bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg transition-all duration-300 ease-in-out cursor-pointer ${
                  isSearchExpanded ? "w-64 lg:w-80" : "w-32"
                }`}
                onClick={handleSearchClick}
              >
                <Search className="w-4 h-4 text-gray-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search..."
                  className={`flex-1 bg-transparent outline-none px-3 py-2 text-sm transition-all duration-300 ${
                    isSearchExpanded
                      ? "cursor-text opacity-100"
                      : "cursor-pointer opacity-0 w-0 px-0"
                  }`}
                  readOnly={!isSearchExpanded}
                />
              </div>

              {/* Search Results Dropdown */}
              {isSearchExpanded && searchQuery.trim().length >= 2 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      Searching...
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No products found
                    </div>
                  ) : (
                    <div className="py-2">
                      {searchResults.map(
                        (product: {
                          _id: string;
                          name: string;
                          images: string[];
                          price: number;
                        }) => (
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
                        ),
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <ul className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`border border-white/20 text-sm px-4 py-2 rounded-full ${glassBase} ${
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
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>

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
                className={`${glassBase} text-sm px-4 sm:px-6 py-2 rounded-full ${
                  pathname === "/signup"
                    ? glassActive
                    : "border border-accent bg-white/20 text-primary hover:bg-primary/40 hover:text-white"
                }`}
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Sign Up</span>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Search Bar */}
        {isSearchExpanded && (
          <div className="md:hidden px-4 pb-4">
            <div className="relative">
              <div className="flex items-center bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg">
                <Search className="w-4 h-4 text-gray-400 ml-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent outline-none px-3 py-2 text-sm"
                  autoFocus
                />
              </div>

              {/* Mobile Search Results */}
              {searchQuery.trim().length >= 2 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                  {isLoading ? (
                    <div className="p-3 text-center text-gray-500 text-sm">
                      Searching...
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="p-3 text-center text-gray-500 text-sm">
                      No products found
                    </div>
                  ) : (
                    <div className="py-1">
                      {searchResults.map(
                        (product: {
                          _id: string;
                          name: string;
                          images: string[];
                          price: number;
                        }) => (
                          <Link
                            key={product._id}
                            href={`/products/${product._id}`}
                            className="flex items-center gap-2 p-2 hover:bg-gray-50 transition-colors"
                            onClick={() => {
                              setSearchQuery("");
                              setIsSearchExpanded(false);
                            }}
                          >
                            <div className="w-8 h-8 rounded bg-gray-100 shrink-0">
                              <Image
                                src={product.images[0] || "/placeholder.png"}
                                alt={product.name}
                                width={32}
                                height={32}
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-medium text-gray-900 truncate">
                                {product.name}
                              </h4>
                              <p className="text-xs text-gray-500">
                                ${product.price.toFixed(2)}
                              </p>
                            </div>
                          </Link>
                        ),
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        <div className="lg:hidden border-t border-base-300">
          <ul className="flex items-center justify-around px-4 py-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-primary/20 text-primary font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
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
