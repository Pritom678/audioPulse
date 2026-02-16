"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type LoadingProps = {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
};

const Loading = ({
  size = "md",
  text = "Loading",
  fullScreen = false,
}: LoadingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);

  // Size configurations
  const sizeConfig = {
    sm: {
      bars: 4,
      barWidth: "w-1.5",
      barHeight: 20,
      gap: "gap-1.5",
      textSize: "text-xs",
    },
    md: {
      bars: 5,
      barWidth: "w-2",
      barHeight: 30,
      gap: "gap-2",
      textSize: "text-sm",
    },
    lg: {
      bars: 6,
      barWidth: "w-2.5",
      barHeight: 40,
      gap: "gap-2.5",
      textSize: "text-base",
    },
  };

  const config = sizeConfig[size];

  useGSAP(() => {
    if (!containerRef.current) return;

    // Fade in container
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.2)" },
    );

    // Animate bars with wave effect
    barsRef.current.forEach((bar, i) => {
      if (bar) {
        gsap.to(bar, {
          scaleY: 1.8,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.12,
        });
      }
    });
  }, []);

  const content = (
    <div ref={containerRef} className="flex flex-col items-center gap-4">
      {/* Animated Sound Bars */}
      <div className={`flex items-end ${config.gap} h-16`}>
        {[...Array(config.bars)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) barsRef.current[i] = el;
            }}
            className={`${config.barWidth} rounded-full origin-bottom bg-gradient-to-t from-primary via-primary/80 to-primary/60`}
            style={{ height: config.barHeight }}
          />
        ))}
      </div>

      {/* Loading Text */}
      {text && (
        <p
          className={`${config.textSize} tracking-wider text-gray-600 font-medium animate-pulse`}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
