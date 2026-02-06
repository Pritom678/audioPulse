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
      className="my-10 relative bg-gradient-to-tr from-primary/20 to-base-200 py-32 overflow-hidden rounded-2xl"
      style={{ perspective: 1200 }}
    >
      {/* Optional floating wave background */}
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,rgba(0,0,0,0.05),rgba(0,0,0,0.1),rgba(0,0,0,0.05))] bg-[length:200%_100%] animate-[wave_20s_linear_infinite]" />

      <div
        ref={ref}
        className="relative mx-auto max-w-4xl text-center space-y-6 z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-neutral">
          Experience AudioPluse Like Never Before
        </h2>
        <p className="text-neutral/70 text-lg md:text-xl">
          Discover premium sound, tailored for every moment and every mood.
        </p>
        <Link
          href={"/products"}
          className="btn bg-primary/30 backdrop-blur-md border border-white/30 hover:bg-primary/20 hover:scale-105 transition-all duration-300 rounded-full px-12 py-4 text-lg font-semibold text-white shadow-lg"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
