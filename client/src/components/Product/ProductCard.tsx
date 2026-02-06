"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Heart } from "lucide-react";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  gradient: string;
};

export default function ProductCard({
  id,
  name,
  price,
  description,
  image,
  gradient,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useGSAP(
    () => {
      if (!cardRef.current || !imageRef.current) return;

      const ctx = gsap.context(() => {
        // Entrance animation
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        );

        // Gentle image float
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

  return (
    <div className="relative rounded-2xl bg-black/10 backdrop-blur-md overflow-visible">
      <div
        ref={cardRef}
        className={`relative rounded-3xl p-6 inset-0 ${gradient}`}
      >
        {/* Product Image */}
        <div
          ref={imageRef}
          className="relative -mt-3 h-52 flex items-center justify-center"
        >
          <Image
            src={image}
            alt={name}
            width={240}
            height={240}
            priority={false}
            className="object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Content Panel */}
        <div className="mt-4 rounded-2xl bg-white/85 backdrop-blur-sm p-4 pb-16 relative">
          {/* Product Info */}
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
            <span className="text-sm font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
          </div>

          <p className="text-xs text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Buttons container at bottom inside the card */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
            {/* Wishlist button (left) */}
            <button
              aria-label="Add product to wishlist"
              className="
                flex items-center gap-2
                bg-white/30 backdrop-blur-md border border-white/30
                text-netural px-4 py-2 rounded-full
                text-sm font-semibold
                hover:bg-white/40 hover:scale-105 hover:shadow-lg
                transition-all duration-300
              "
            >
              <Heart className="w-4 h-4" />
            </button>

            {/* View Details button (right) */}
            <Link
              href={`/products/${id}`}
              aria-label={`View details for ${name}`}
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
