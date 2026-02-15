"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // === Entrance Fade ===
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power3.out" },
    );

    // === Equalizer Bars Animation ===
    barsRef.current.forEach((bar, i) => {
      gsap.to(bar, {
        scaleY: "random(0.4, 1.2)",
        duration: "random(0.6,1.2)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.05,
      });
    });

    // === Floating Music Bubble ===
    if (bubbleRef.current) {
      gsap.to(bubbleRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // === Glass Glow Pulse ===
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        scale: 1.05,
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-xl z-50"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Soft Purple Glow */}
        <div
          ref={glowRef}
          className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/40 via-secondary-500/30 to-accent-400/30 blur-3xl"
        />

        {/* Glass Card */}
        <div className="relative w-64 h-80 rounded-3xl bg-white/10  flex flex-col items-center justify-center gap-6">
          {/* Equalizer */}
          <div className="flex items-end gap-2 h-16">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) barsRef.current[i] = el;
                }}
                className="w-2 bg-gradient-to-t from-pink-500 to-cyan-400 rounded-full origin-bottom"
                style={{ height: 40 }}
              />
            ))}
          </div>

          {/* Music Bubble */}
          <div
            ref={bubbleRef}
            className="absolute top-8 right-6 px-4 py-2 rounded-full bg-purple-500/60 backdrop-blur-md text-white text-sm"
          >
            ♪
          </div>

          {/* Loading Text */}
          <p className="text-white/80 text-sm tracking-wide">
            Loading your sound...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
