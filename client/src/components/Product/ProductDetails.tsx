"use client";

import api from "@/lib/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      const res = await api.get(`/products/${productId}`);
      setProduct(res.data);
      setActiveImage(res.data.images?.[0] || null);
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading || !product) {
    return (
      <div className="py-20 text-center text-gray-500">Loading product...</div>
    );
  }

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setAdding(true);

      await api.post("/cart/", {
        productId: product._id,
        quantity: 1,
      });

      toast.success("Added to cart 🛒");
      router.push("/cart/");
    } catch (error) {
      console.error("Add to cart failed", error);
      toast.error("Please login to add items to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      className=" min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-primary/40 via-secondary/30 to-primary/50
    "
    >
      {/* Glass Card */}
      <div
        className="my-10 w-full max-w-4xl rounded-3xl overflow-hidden
        bg-white/20 backdrop-blur-xl border border-white/20 shadow-2xl
      "
      >
        <div className="grid md:grid-cols-2">
          {/* IMAGE SIDE */}
          <div
            className="relative flex items-center justify-center p-10
            bg-gradient-to-br from-primary/60 to-secondary/60
          "
          >
            {activeImage && (
              <Image
                src={activeImage}
                alt={product.name}
                width={420}
                height={420}
                className="object-contain drop-shadow-2xl"
                priority
              />
            )}

            {/* Wishlist */}
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full
              bg-white/20 backdrop-blur-md border border-white/30
              flex items-center justify-center
              hover:bg-white/30 transition
            "
            >
              <Heart className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* INFO SIDE */}
          <div className="p-8 flex flex-col gap-4 text-base-content">
            <h1 className="text-2xl font-bold">{product.name}</h1>

            {/* Pills */}
            <div className="flex gap-2">
              <span
                className="px-3 py-1 text-xs rounded-full
                bg-white/20 backdrop-blur border border-white/30
              "
              >
                EU38
              </span>
              <span
                className="px-3 py-1 text-xs rounded-full
                bg-white/20 backdrop-blur border border-white/30
              "
              >
                BLACK / WHITE
              </span>
            </div>

            <p className="text-sm opacity-80 leading-relaxed text-neutral">
              {product.description}
            </p>

            {/* PRICE + BUTTON */}
            <div className="mt-auto flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase opacity-60">Price</p>
                <p className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Glass Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.isActive || product.stock === 0}
                className="
                  px-6 py-3 rounded-xl font-semibold text-white
                  bg-primary/70 backdrop-blur-md border border-white/30
                  hover:bg-primary/80 hover:shadow-xl
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                "
              >
                {product.stock > 0 ? "Add to cart" : "Out of stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
