"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Heart } from "lucide-react";
import StarRating from "@/components/Rating/StarRating";
import { formatPrice } from "@/utils/priceFormat";
import { useWishlist } from "@/context/WishlistContext";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  gradient: string;
  rating?: number;
  reviewCount?: number;
};

export default function ProductCard({
  id,
  name,
  price,
  description,
  image,
  gradient,
  rating = 0,
  reviewCount = 0,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);

  const { toggleWishlist, isWishlisted } = useWishlist();

  // GSAP animations for card entrance & image float
  useGSAP(
    () => {
      if (!cardRef.current || !imageRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        );

        gsap.to(imageRef.current, {
          y: -8,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      return () => ctx.revert();
    },
    { scope: cardRef },
  );

  // Truncate long descriptions
  const truncateDescription = (text: string, limit: number) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  // Handle wishlist toggle with GSAP heart animation
  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    await toggleWishlist(id);

    // Animate heart bounce
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
    <div className="relative h-full flex flex-col">
      <div
        ref={cardRef}
        className={`relative rounded-3xl p-6 inset-0 flex-1 flex flex-col ${gradient}`}
      >
        {/* Product Image */}
        <div
          ref={imageRef}
          className="relative h-48 flex items-center justify-center"
        >
          <Image
            src={image}
            alt={name}
            width={180}
            height={180}
            className="object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Content Panel */}
        <div className="mt-4 flex-1 flex flex-col">
          {/* Product Info */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
              <StarRating rating={rating} reviewCount={reviewCount} size="sm" />
            </div>
            <div className="text-sm font-bold text-gray-900">
              {formatPrice(price)}
            </div>
          </div>

          {/* Description */}
          <div className="text-xs text-gray-600 mb-4">
            <p>{truncateDescription(description, 80)}</p>
          </div>

          {/* Buttons */}
          <div className="mt-auto flex justify-between px-4">
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistClick}
              className={`
                flex items-center gap-2
                backdrop-blur-md border px-4 py-2 rounded-full
                text-sm font-semibold
                transition-all duration-300
                ${
                  isWishlisted(id)
                    ? "bg-red-500 text-white border-red-500 shadow-lg"
                    : "bg-white/30 border-white/30 hover:bg-white/40"
                }
              `}
            >
              <Heart
                ref={heartRef}
                className={`w-4 h-4 transition-all duration-300 ${
                  isWishlisted(id) ? "fill-white" : ""
                }`}
              />
            </button>

            {/* View Details Button */}
            <Link
              href={`/products/${id}`}
              className="
                flex items-center gap-2
                bg-accent/30 backdrop-blur-md border border-white/30
                text-neutral px-4 py-2 rounded-full
                text-sm font-semibold
                hover:bg-accent/40 hover:scale-105 hover:shadow-lg
                transition-all duration-300
              "
            >
              View Details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
