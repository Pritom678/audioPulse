"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

  console.log(id);
  return (
    <div className="relative rounded-2xl bg-black/10 backdrop-blur-md">
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
        <div className="mt-4 rounded-2xl bg-white/85 backdrop-blur-sm p-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
            <span className="text-sm font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
          </div>

          <p className="text-xs text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex gap-2">
            <button
              aria-label="Add product to wishlist"
              className="
                flex-1 py-2 rounded-full border border-white/30
                text-xs font-semibold tracking-wide text-black
                hover:bg-white hover:text-black
                hover:scale-105 hover:shadow-md
                transition-all duration-200
              "
            >
              ADD TO WISHLIST
            </button>

            <Link
              href={`/products/${id}`}
              aria-label={`View details for ${name}`}
              className="
                flex-1 py-2 rounded-full border border-primary
                text-xs font-semibold tracking-wide text-white bg-primary
                hover:bg-primary-dark
                hover:scale-105 hover:shadow-md
                text-center
                transition-all duration-200
              "
            >
              VIEW DETAILS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
