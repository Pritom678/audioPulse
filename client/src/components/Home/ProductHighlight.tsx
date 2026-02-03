"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ProductHighlight = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!imageRef.current) return;
    gsap.from(imageRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="bg-base-200 py-24">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-neutral">
            AudioPluse Pro Headphones
          </h2>
          <p className="text-neutral">
            Engineered for clarity, comfort, and immersive sound.
          </p>
          <button className="btn btn-outline rounded-full">Learn more</button>
        </div>

        <div
          ref={imageRef}
          className="h-72 rounded-2xl bg-base-100 border border-base-300"
        />
      </div>
    </section>
  );
};

export default ProductHighlight;
