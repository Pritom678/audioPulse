"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const AudioExperience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgOneRef = useRef<HTMLDivElement>(null);
  const imgTwoRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Floating wave animation
    gsap.to(waveRef.current, {
      backgroundPositionX: "-200%",
      duration: 18,
      ease: "linear",
      repeat: -1,
    });

    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    tl.from(textRef.current?.children || [], {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
    })
      .from(
        imgOneRef.current,
        {
          opacity: 0,
          y: 80,
          rotate: -12,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        imgTwoRef.current,
        {
          opacity: 0,
          y: 100,
          rotate: 8,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );
  }, []);

  // Hover handlers for 3D pop-out
  const handleHover3D = (
    ref: React.RefObject<HTMLDivElement>,
    rotate: number,
    scale: number,
    z: number,
    rotateY = 0,
    rotateX = 0
  ) => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotate,
      scale,
      z,
      rotateY,
      rotateX,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-tr from-primary/30 to-base-200 py-40 my-5 overflow-hidden rounded-2xl"
      style={{ perspective: 1200 }} // Enables 3D effect
    >
      {/* Animated sound wave background */}
      <div
        ref={waveRef}
        className="
          absolute inset-0 
          opacity-60
          bg-[linear-gradient(90deg,rgba(0,0,0,0.2),rgba(0,0,0,0.4),rgba(0,0,0,0.2))]
          bg-[length:200%_100%]
        "
      />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl text-center space-y-6 z-20">
        <div ref={textRef}>
          <h2 className="text-3xl font-semibold text-neutral">
            Designed for how you listen
          </h2>
          <p className="text-neutral/80">
            From music to movies, AudioPluse adapts to every moment.
          </p>
        </div>
      </div>

      {/* Floating Images */}
      <div className="pointer-events-auto">
        {/* Image 1 – top right with 3D pop-out */}
        <div
          ref={imgOneRef}
          className="absolute top-16 right-10 w-64 z-10"
          onMouseEnter={() => handleHover3D(imgOneRef, -8, 1.1, 60, 15, -5)}
          onMouseLeave={() => handleHover3D(imgOneRef, -12, 1, 0, 0, 0)}
        >
          <Image
            src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1770363508/titled2_ihv9lr.png"
            alt="Headphone floating"
            width={400}
            height={400}
            className="object-contain drop-shadow-xl"
          />
        </div>

        {/* Image 2 – bottom left with 3D pop-out */}
        <div
          ref={imgTwoRef}
          className="absolute bottom-20 left-10 w-72 z-10"
          onMouseEnter={() => handleHover3D(imgTwoRef, 12, 1.1, 60, -15, 5)}
          onMouseLeave={() => handleHover3D(imgTwoRef, 8, 1, 0, 0, 0)}
        >
          <Image
            src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1770363509/titled_liu37c.png"
            alt="Headphone angled"
            width={450}
            height={450}
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default AudioExperience;
