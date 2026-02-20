"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const ProductHighlight = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(textRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
    }).from(
      videoRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.4",
    );
  }, []);

  return (
    <section className="bg-gradient-to-tr from-primary/10 to-base-200 py-12 sm:py-16 lg:py-24 rounded-2xl px-4 sm:px-6">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* Text content */}
        <div
          ref={textRef}
          className="space-y-4 sm:space-y-5 text-center md:text-left flex-1"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral">
            AudioPluse Pro Headphones
          </h2>
          <p className="text-sm sm:text-base text-neutral/80 max-w-md mx-auto md:mx-0">
            Engineered for clarity, comfort, and immersive sound.
          </p>

          {/* Glass Button */}
          <Link
            href="/about"
            className="inline-block relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full backdrop-blur-md bg-primary/10 border border-white/40 text-neutral font-medium shadow-lg transition-all duration-300 hover:bg-primary/20 hover:scale-105 text-sm sm:text-base"
          >
            Learn more
          </Link>
        </div>

        {/* Video content */}
        <div
          ref={videoRef}
          className="relative h-56 sm:h-64 md:h-72 w-full md:flex-1 rounded-2xl overflow-hidden shadow-xl"
        >
          <video
            src="https://res.cloudinary.com/do3iu9q7d/video/upload/v1770280579/mixkit-woman-takes-her-headphones-to-listen-to-music-51134-hd-ready_nshuxe.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/25 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default ProductHighlight;
