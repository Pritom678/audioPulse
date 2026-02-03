"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current.children, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="bg-base-100 py-32">
      <div ref={ref} className="mx-auto max-w-4xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-neutral">
          Pure sound. Thoughtfully designed.
        </h1>
        <p className="text-base text-neutral">
          Premium headphones and speakers crafted for everyday listening.
        </p>
        <button className="btn btn-primary rounded-full px-8">
          Shop Audio
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
