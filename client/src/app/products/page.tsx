"use client";

import React, { useState } from "react";
import ProductGrid from "@/components/Product/ProductGrid";
import Container from "@/components/Shared/Container";

const sortOptions = [
  { value: "", label: "Sort by", disabled: true },
  { value: "createdAt", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const ProductsPage: React.FC = () => {
  const [sortBy, setSortBy] = useState("");

  return (
    <Container>
      <main className="py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <h1 className="text-3xl font-bold text-center lg:text-left mb-4 lg:mb-0">
            Our Products
          </h1>

          {/* Sort Dropdown */}
          <div className="flex justify-center lg:justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="text-gray-700"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ProductGrid sortBy={sortBy} />
      </main>
    </Container>
  );
};

export default ProductsPage;
