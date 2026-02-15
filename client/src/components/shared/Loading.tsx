"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Fade in
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    // Continuous smooth looping wave
    barsRef.current.forEach((bar, i) => {
      gsap.to(bar, {
        scaleY: 1.6,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1,
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-background z-50"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Sound Bars */}
        <div className="flex items-end gap-2 h-16">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) barsRef.current[i] = el;
              }}
              className="w-2 rounded-full origin-bottom bg-gradient-to-t from-primary to-secondary"
              style={{ height: 30 }}
            />
          ))}
        </div>

        <p className="text-sm tracking-widest text-foreground/70 uppercase">
          Loading
        </p>
      </div>
    </div>
  );
};

export default Loading;
