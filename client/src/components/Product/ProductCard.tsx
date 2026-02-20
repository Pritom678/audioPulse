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
        className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 inset-0 flex-1 flex flex-col ${gradient}`}
      >
        {/* Wishlist Button - Top Left */}
        <button
          onClick={handleWishlistClick}
          className={`
            absolute top-3 left-3 sm:top-4 sm:left-4 z-10
            flex items-center justify-center
            w-9 h-9 sm:w-10 sm:h-10
            backdrop-blur-md border rounded-full
            transition-all duration-300
            hover:scale-110
            ${
              isWishlisted(id)
                ? "bg-red-500 text-white border-red-500 shadow-lg"
                : "bg-white/40 border-white/50 hover:bg-white/60 text-gray-700"
            }
          `}
          title={isWishlisted(id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            ref={heartRef}
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
              isWishlisted(id) ? "fill-white" : ""
            }`}
          />
        </button>

        {/* Product Image */}
        <div
          ref={imageRef}
          className="relative h-40 sm:h-48 flex items-center justify-center"
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
        <div className="mt-3 sm:mt-4 flex-1 flex flex-col">
          {/* Product Info */}
          <div className="flex justify-between items-start mb-2 gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">
                {name}
              </h3>
              <StarRating rating={rating} reviewCount={reviewCount} size="sm" />
            </div>
            <div className="text-sm sm:text-base font-bold text-gray-900 shrink-0">
              {formatPrice(price)}
            </div>
          </div>

          {/* Description */}
          <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-1">
            <p className="line-clamp-2 sm:line-clamp-3">
              {truncateDescription(description, 80)}
            </p>
          </div>

          {/* View Details Button */}
          <div className="mt-auto">
            <Link
              href={`/products/${id}`}
              className="
                flex items-center justify-center gap-2
                bg-accent/30 backdrop-blur-md border border-white/30
                text-neutral px-4 py-2 rounded-full
                text-xs sm:text-sm font-semibold
                hover:bg-accent/40 hover:scale-105 hover:shadow-lg
                transition-all duration-300
                w-full
              "
            >
              View Details
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
