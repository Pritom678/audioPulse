"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const CallToAction = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      opacity: 0,
      y: 30,
      scale: 0.97,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      className="my-6 sm:my-8 lg:my-10 relative bg-gradient-to-tr from-primary/20 to-base-200 py-16 sm:py-24 lg:py-32 overflow-hidden rounded-2xl"
      style={{ perspective: 1200 }}
    >
      {/* Optional floating wave background */}
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,rgba(0,0,0,0.05),rgba(0,0,0,0.1),rgba(0,0,0,0.05))] bg-[length:200%_100%] animate-[wave_20s_linear_infinite]" />

      <div
        ref={ref}
        className="relative mx-auto max-w-4xl text-center space-y-4 sm:space-y-6 z-10 px-4 sm:px-6"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral">
          Experience AudioPluse Like Never Before
        </h2>
        <p className="text-neutral/70 text-base sm:text-lg md:text-xl">
          Discover premium sound, tailored for every moment and every mood.
        </p>
        <Link
          href={"/products"}
          className="inline-flex items-center justify-center gap-2 btn bg-primary/50 backdrop-blur-md border border-white/30 hover:bg-primary/40 hover:scale-105 transition-all duration-300 rounded-full px-8 sm:px-10 lg:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
