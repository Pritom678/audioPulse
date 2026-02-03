"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const AudioExperience = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      opacity: 0,
      y: 40,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="bg-base-200 py-32">
      <div ref={ref} className="mx-auto max-w-3xl text-center space-y-6">
        <h2 className="text-3xl font-semibold text-neutral">
          Designed for how you listen
        </h2>
        <p className="text-neutral">
          From music to movies, AudioPluse adapts to every moment.
        </p>
      </div>
    </section>
  );
};

export default AudioExperience;
