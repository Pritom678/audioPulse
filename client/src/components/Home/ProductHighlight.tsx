"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ProductHighlight = () => {
  const videoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!videoRef.current) return;
    gsap.from(videoRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="bg-base-200 py-24">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
        {/* Text content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-neutral">
            AudioPluse Pro Headphones
          </h2>
          <p className="text-neutral">
            Engineered for clarity, comfort, and immersive sound.
          </p>
          <button className="btn btn-outline rounded-full">Learn more</button>
        </div>

        {/* Video content */}
        <div
          ref={videoRef}
          className="relative h-72 w-full rounded-2xl overflow-hidden shadow-lg"
        >
          <video
            src="https://res.cloudinary.com/do3iu9q7d/video/upload/v1770280579/mixkit-woman-takes-her-headphones-to-listen-to-music-51134-hd-ready_nshuxe.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductHighlight;
