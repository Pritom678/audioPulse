"use client";

import api from "@/lib/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  category: string;
  brand?: string;
  stock: number;
  isActive: boolean;
}

interface ProductDetailsProps {
  productId: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${productId}`);
        setProduct(res.data);
        setActiveImage(res.data.images?.[0] || null);
      } catch (err) {
        console.error("Fetch product error:", err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  /* -------------------- UI STATES -------------------- */

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center text-gray-500">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center text-red-500">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Images */}
        <div className="w-full md:w-1/2">
          {activeImage ? (
            <Image
              src={activeImage}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-[420px] object-contain rounded-xl bg-white"
              priority
            />
          ) : (
            <div className="w-full h-[420px] bg-gray-200 flex items-center justify-center rounded-xl">
              No Image
            </div>
          )}

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`border rounded-lg p-1 transition ${
                    activeImage === img
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name}-${idx}`}
                    width={80}
                    height={80}
                    className="object-contain rounded"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4 md:w-1/2">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          {product.brand && (
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
          )}

          <p className="text-gray-700">{product.description}</p>

          <p className="text-3xl font-semibold text-primary">
            ${product.price.toFixed(2)}
          </p>

          <p
            className={`font-medium ${
              product.isActive ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.isActive ? "In Stock" : "Unavailable"}
          </p>

          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          <p className="text-sm text-gray-400">Category: {product.category}</p>

          <button
            disabled={!product.isActive || product.stock === 0}
            className="
              mt-6 px-6 py-3 rounded-lg text-white font-semibold
              bg-primary hover:bg-primary-dark
              disabled:opacity-50 disabled:cursor-not-allowed
              transition
            "
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
