"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

const headphones = [
  {
    id: "1",
    name: "JBL Tune 510BT",
    description: "Wireless comfort with signature JBL bass.",
    image:
      "https://res.cloudinary.com/do3iu9q7d/image/upload/v1770275871/headphone6_ovq0mj.png",
  },
  {
    id: "2",
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation experience.",
    image:
      "https://res.cloudinary.com/do3iu9q7d/image/upload/v1770275870/headphone4_dgaiox.png",
  },
  {
    id: "3",
    name: "Bose QuietComfort 45",
    description: "Premium sound engineered for all-day comfort.",
    image:
      "https://res.cloudinary.com/do3iu9q7d/image/upload/v1770275860/headphone1_zqf70f.png",
  },
  {
    id: "4",
    name: "AudioPlus X1",
    description: "Crystal-clear audio with a modern aesthetic.",
    image:
      "https://res.cloudinary.com/do3iu9q7d/image/upload/v1770275870/headphone3_oqol6n.png",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const radius = 120;

  useEffect(() => {
    if (!imageRef.current || !textRef.current) return;

    const images = Array.from(imageRef.current.children) as HTMLElement[];
    const tl = gsap.timeline({ repeat: -1 });

    images.forEach((img, index) => {
      tl.set(images, { opacity: 0 });

      tl.fromTo(
        img,
        { opacity: 0, x: radius, y: -radius },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: "power2.out",
          onStart: () => {
            setCurrent(index);

            const [title, desc, btn] = textRef.current!.children;

            gsap.fromTo(
              [title, desc, btn],
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
              },
            );
          },
        },
      );

      tl.to({}, { duration: 2 });

      tl.to(img, {
        opacity: 0,
        x: radius,
        y: radius,
        duration: 1,
        ease: "power2.in",
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="bg-white py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-16">
      <div className="relative max-w-7xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden">
        {/* GLASS BACKGROUND */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-primary/50 backdrop-blur-[32px]" />
          <div className="absolute inset-0 bg-linear-to-br from-primary/50 via-white/20 to-transparent" />
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-white/70" />
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl shadow-[inset_0_1px_20px_rgba(255,255,255,0.35)]" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "url('/noise.jpg')",
              backgroundRepeat: "repeat",
            }}
          />
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.12)]" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-20 lg:gap-16 px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-24">
          {/* LEFT TEXT + BUTTON */}
          <div
            ref={textRef}
            className="w-full lg:max-w-xl text-center lg:text-left"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-neutral">
              {headphones[current].name}
            </h1>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-neutral/80">
              {headphones[current].description}
            </p>

            {/* 🧊 GLASS BUTTON */}
            <Link
              href={"/products"}
              className="group relative mt-6 sm:mt-8 lg:mt-20 inline-flex items-center gap-2 rounded-full px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-white/25 backdrop-blur-xl ring-1 ring-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
            >
              {/* Noise */}
              <span
                className="absolute inset-0 rounded-full opacity-[0.06]"
                style={{
                  backgroundImage: "url('/noise.jpg')",
                  backgroundRepeat: "repeat",
                }}
              />

              <span className="relative text-sm sm:text-base lg:text-lg font-medium text-neutral">
                Explore Collection
              </span>

              <span className="relative text-base sm:text-lg lg:text-xl">
                →
              </span>
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div
            ref={imageRef}
            className="relative w-full max-w-[180px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[450px] h-36 sm:h-48 md:h-64 lg:h-80 xl:h-96 flex items-center justify-center shrink-0"
          >
            {headphones.map((hp) => (
              <div
                key={hp.id}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <Image
                  src={hp.image}
                  alt={hp.name}
                  width={450}
                  height={450}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
