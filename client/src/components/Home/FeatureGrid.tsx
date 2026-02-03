"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const features = [
  "Precision-tuned sound",
  "All-day comfort",
  "Minimal, durable design",
  "Seamless connectivity",
];

const FeatureGrid = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current.children, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
    });
  }, []);
  return (
    <section className="bg-base-100 py-24">
      <div
        ref={ref}
        className="mx-auto max-w-5xl grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center"
      >
        {features.map((feature) => (
          <div key={feature} className="p-6 rounded-2xl border border-base-300">
            <p className="text-sm font-medium text-neutral">{feature}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
