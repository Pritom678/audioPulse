"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
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

type ProductGridProps = {
  searchQuery?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
};

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();

        if (searchQuery) params.set("q", searchQuery);
        if (category) params.set("category", category);
        if (brand) params.set("brand", brand);
        if (minPrice) params.set("minPrice", minPrice.toString());
        if (maxPrice) params.set("maxPrice", maxPrice.toString());
        if (sortBy) params.set("sortBy", sortBy);

        const endpoint =
          searchQuery || category || brand || minPrice || maxPrice || sortBy
            ? "/products/search?" + params.toString()
            : "/products/";

        const res = await api.get(endpoint);

        if (
          searchQuery ||
          category ||
          brand ||
          minPrice ||
          maxPrice ||
          sortBy
        ) {
          setProducts(res.data.products || []);
        } else {
          setProducts(res.data || []);
        }
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, category, brand, minPrice, maxPrice, sortBy]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }
  console.log(products);
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard
          id={product._id}
          key={product._id}
          name={product.name}
          price={product.price}
          description={product.description}
          image={product.images[0]}
          gradient={gradients[index % gradients.length]}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      ))}
    </section>
  );
}
