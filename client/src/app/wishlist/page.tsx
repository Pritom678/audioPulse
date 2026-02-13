"use client";

import { useEffect, useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import api from "@/lib/axios";
import Link from "next/link";
import StarRating from "@/components/Rating/StarRating";
import { formatPrice } from "@/utils/priceFormat";
import Image from "next/image";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (wishlist.length === 0) {
        setProducts([]);
        return;
      }

      try {
        const requests = wishlist.map((id) => api.get(`/products/${id}`));
        const responses = await Promise.all(requests);
        setProducts(responses.map((res) => res.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [wishlist]);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="group relative flex flex-col bg-white rounded-3xl shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full flex items-center justify-center mb-4">
                <Image
                  src={product.images[0] || "/placeholder.png"}
                  fill
                  alt={product.name}
                  className="object-contain h-full w-full rounded-xl drop-shadow-lg"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-accent transition-colors">
                  {product.name}
                </h2>

                <StarRating
                  rating={product.rating || 0}
                  reviewCount={product.reviewCount || 0}
                  size="sm"
                />

                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
