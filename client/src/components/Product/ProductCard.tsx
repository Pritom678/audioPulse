"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type ProductCardProps = {
  name: string;
  price: number;
  description: string;
  image: string;
  gradient: string;
};

export default function ProductCard({
  name,
  price,
  description,
  image,
  gradient,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current || !imageRef.current) return;

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
  }, []);

  return (
    <div className="relative rounded-2xl bg-black/10 backdrop-blur-md">
      <div
        ref={cardRef}
        className={`relative rounded-3xl p-6 inset-0 ${gradient} `}
      >
        {/* Product Image (slightly popping out) */}
        <div
          ref={imageRef}
          className="relative -mt-3 h-52 flex items-center justify-center hover"
        >
          <Image
            src={image}
            alt={name}
            width={240}
            height={240}
            className="object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content Panel */}
        <div className="mt-4 rounded-2xl bg-white/85 backdrop-blur-sm p-4 ">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
            <span className="text-sm font-bold text-gray-900">${price}</span>
          </div>

          <p className="text-xs text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>

          <button
            className="
  w-full py-2 rounded-full border border-white/30
  text-xs font-semibold tracking-wide text-black
  hover:bg-white hover:text-black
  hover:scale-105 hover:shadow-md
  transition-colors duration-200
"
          >
            ADD TO WISHLIST
          </button>
        </div>
      </div>
    </div>
  );
}
