"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Loading from "@/components/Shared/Loading";
import api from "@/lib/axios";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  stock: number;
  isActive: boolean;
  rating?: number;
  reviewCount?: number;
};

type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrev: boolean;
};

type ProductGridProps = {
  searchQuery?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
};

const PRODUCTS_PER_PAGE = 9;

const gradients = [
  "bg-gradient-to-br from-white-100/90 via-blue-400/70 to-indigo-600/40",
  "bg-gradient-to-br from-white-100/90 via-rose-400/70 to-pink-600/40",
  "bg-gradient-to-br from-white-100/90 via-emerald-400/70 to-teal-600/40",
  "bg-gradient-to-br from-white-100/90 via-orange-400/70 to-amber-500/40",
];

export default function ProductGrid({
  searchQuery,
  category,
  brand,
  minPrice,
  maxPrice,
  sortBy,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, category, brand, minPrice, maxPrice, sortBy]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        // Always include pagination params
        params.set("page", currentPage.toString());
        params.set("limit", PRODUCTS_PER_PAGE.toString());

        // Add filter params
        if (searchQuery) params.set("q", searchQuery);
        if (category) params.set("category", category);
        if (brand) params.set("brand", brand);
        if (minPrice) params.set("minPrice", minPrice.toString());
        if (maxPrice) params.set("maxPrice", maxPrice.toString());
        if (sortBy) params.set("sortBy", sortBy);

        const endpoint =
          searchQuery || category || brand || minPrice || maxPrice || sortBy
            ? "/products/search?" + params.toString()
            : "/products?" + params.toString();

        const res = await api.get(endpoint);

        // Handle different response structures
        if (
          searchQuery ||
          category ||
          brand ||
          minPrice ||
          maxPrice ||
          sortBy
        ) {
          setProducts(res.data.products || []);
          // Build pagination info from backend response
          if (res.data.totalPages) {
            const currentPage = res.data.currentPage || 1;
            const totalPages = res.data.totalPages;
            const totalProducts = res.data.total || 0;
            setPagination({
              currentPage,
              totalPages,
              totalProducts,
              hasNext: currentPage < totalPages,
              hasPrev: currentPage > 1,
            });
          } else {
            setPagination(null);
          }
        } else {
          // Regular products endpoint - create pagination manually
          const allProducts = res.data || [];
          const totalProducts = allProducts.length;
          const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
          const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
          const endIndex = startIndex + PRODUCTS_PER_PAGE;
          const paginatedProducts = allProducts.slice(startIndex, endIndex);

          setProducts(paginatedProducts);

          if (totalPages > 1) {
            setPagination({
              currentPage,
              totalPages,
              totalProducts,
              hasNext: currentPage < totalPages,
              hasPrev: currentPage > 1,
            });
          } else {
            setPagination(null);
          }
        }
      } catch (err) {
        console.error("Failed to load products", err);
        setProducts([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, category, brand, minPrice, maxPrice, sortBy, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    if (!pagination || pagination.totalPages <= 1) return [];

    const { currentPage, totalPages } = pagination;
    const pages: number[] = [];

    // Always show first page
    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) pages.push(-1); // -1 represents ellipsis
    }

    // Show pages around current page
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Always show last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) pages.push(-1); // -1 represents ellipsis
      pages.push(totalPages);
    }

    return pages;
  };

  const getShowingText = () => {
    if (!pagination) return "";
    const start = (pagination.currentPage - 1) * PRODUCTS_PER_PAGE + 1;
    const end = Math.min(
      pagination.currentPage * PRODUCTS_PER_PAGE,
      pagination.totalProducts,
    );
    return `Showing ${start}–${end} of ${pagination.totalProducts} products`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loading size="lg" text="Loading products..." />
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No products found</p>;
  }

  return (
    <div>
      {/* Products Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={product._id} className="h-full">
            <ProductCard
              id={product._id}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.images[0]}
              gradient={gradients[index % gradients.length]}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </div>
        ))}
      </section>

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-12 flex flex-col items-center gap-4">
          {/* Showing text */}
          <p className="text-sm text-gray-600">{getShowingText()}</p>

          {/* Pagination buttons */}
          <div className="flex items-center gap-2">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrev}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((pageNum, index) => (
              <div key={index}>
                {pageNum === -1 ? (
                  // Ellipsis
                  <span className="px-4 py-2 text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      pageNum === currentPage
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                )}
              </div>
            ))}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNext}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
