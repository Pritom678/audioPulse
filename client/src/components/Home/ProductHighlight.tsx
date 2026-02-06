"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
      "-=0.4"
    );
  }, []);

  return (
    <section className="bg-gradient-to-tr from-primary/10 to-base-200 py-24 rounded-2xl">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
        {/* Text content */}
        <div ref={textRef} className="space-y-5">
          <h2 className="text-3xl font-semibold text-neutral">
            AudioPluse Pro Headphones
          </h2>
          <p className="text-neutral/80 max-w-md">
            Engineered for clarity, comfort, and immersive sound.
          </p>

          {/* Glass Button */}
          <button className="relative px-6 py-3 rounded-full backdrop-blur-md bg-primary/10 border border-white/40 text-neutral font-medium shadow-lg transition-all duration-300 hover:bg-primary/20 hover:scale-105">
            Learn more
          </button>
        </div>

        {/* Video content */}
        <div
          ref={videoRef}
          className="relative h-72 w-full rounded-2xl overflow-hidden shadow-xl"
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
