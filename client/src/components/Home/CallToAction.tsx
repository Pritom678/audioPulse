"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CallToAction = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      opacity: 0,
      scale: 0.97,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="bg-base-100 py-24">
      <div ref={ref} className="mx-auto max-w-4xl text-center space-y-6">
        <h2 className="text-2xl font-semibold text-neutral">
          Experience AudioPluse
        </h2>
        <button className="btn btn-primary rounded-full px-10">Shop Now</button>
      </div>
    </section>
  );
};

export default CallToAction;
