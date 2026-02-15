"use client";

import api from "@/lib/axios";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/priceFormat";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useWishlist } from "@/context/WishlistContext";
import Loading from "../Shared/Loading";

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
  const [showFullDescription, setShowFullDescription] = useState(false);
  const router = useRouter();

  const container = useRef(null);
  const heartRef = useRef<SVGSVGElement>(null);

  const { wishlist, toggleWishlist, isWishlisted } = useWishlist();

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  const truncateDescription = (text: string, limit: number) =>
    text.length <= limit ? text : text.slice(0, limit) + "...";

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${productId}`);
      setProduct(res.data);
      setActiveImage(res.data.images?.[0] || null);
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  // 🔥 GSAP Animations
  useGSAP(
    () => {
      // Main image entrance
      gsap.from(".product-image", {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
      });

      // Text stagger animation
      gsap.from(".product-info > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Thumbnails slide
      gsap.from(".thumb", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      });

      // Floating animation
      gsap.to(".product-image", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: container },
  );

  if (loading || !product) {
    return (
      <Loading className="flex flex-col items-center justify-center" />
    );
  }

  const handleAddToCart = async () => {
    try {
      await api.post("/cart/", {
        productId: product._id,
        quantity: 1,
      });
      toast.success("Added to cart 🛒");
      router.push("/cart/");
    } catch {
      toast.error("Login required");
    }
  };

  const handleWishlistClick = () => {
    toggleWishlist(product._id);
    toast.success(
      isWishlisted(product._id)
        ? "Removed from wishlist ❤️"
        : "Added to wishlist ❤️",
    );

    // GSAP bounce animation
    if (heartRef.current) {
      gsap.fromTo(
        heartRef.current,
        { scale: 0.8 },
        {
          scale: 1.4,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        },
      );
    }
  };

  return (
    <div
      ref={container}
      className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-primary/40 via-secondary/30 to-primary/50 py-10"
    >
      {/* Glass Container */}
      <div className="w-full max-w-6xl py-20 px-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl">
        <div className="grid md:grid-cols-3 gap-12">
          {/* LEFT THUMBNAILS */}
          <div className="flex md:flex-col gap-4 items-center">
            {product.images.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(img)}
                className={`thumb w-20 h-20 bg-white/20 backdrop-blur-md cursor-pointer flex items-center justify-center border rounded-xl transition ${
                  activeImage === img ? "border-white" : "border-white/30"
                }`}
              >
                <Image
                  src={img}
                  alt="thumb"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* CENTER IMAGE */}
          <div className="flex items-center justify-center">
            {activeImage && (
              <Image
                src={activeImage}
                alt={product.name}
                width={500}
                height={500}
                className="product-image object-contain drop-shadow-2xl"
                priority
              />
            )}
          </div>

          {/* RIGHT INFO */}
          <div className="product-info flex flex-col justify-center space-y-6 text-neutral">
            <h1 className="text-4xl font-semibold tracking-wide">
              {product.name}
            </h1>

            <p className="text-xl font-medium">{formatPrice(product.price)}</p>

            <div className="text-neutral leading-relaxed opacity-90">
              {showFullDescription
                ? product.description || ""
                : truncateDescription(product.description || "", 150)}

              {product.description && product.description.length > 150 && (
                <button
                  onClick={toggleDescription}
                  className="ml-2 underline text-sm"
                >
                  {showFullDescription ? "Show less" : "Show more"}
                </button>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="px-8 py-3 rounded-xl font-semibold text-white bg-primary/70 backdrop-blur-md border border-white/30 hover:bg-primary/80 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? "Buy Now" : "Out of Stock"}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlistClick}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isWishlisted(product._id)
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              >
                <Heart
                  ref={heartRef}
                  className={`w-5 h-5 ${
                    isWishlisted(product._id) ? "fill-white text-white" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
