"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const FeatureGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    // Text animation
    tl.from(textRef.current?.children || [], {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
    });

    // Images animation
    tl.from(
      containerRef.current.querySelectorAll(".feature-image"),
      {
        opacity: 0,
        y: 40,
        scale: 0.96,
        duration: 1,
        ease: "power3.out",
        stagger: 0.18,
      },
      "-=0.4",
    );

    // Feature list animation
    tl.from(
      listRef.current?.children || [],
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.6",
    );
  }, []);

  return (
    <section className="bg-base-100 py-12 sm:py-16 lg:py-20 my-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section heading */}
        <div className="mb-12 sm:mb-16 lg:mb-20 flex items-center gap-3 sm:gap-4 lg:gap-6">
          <span className="h-px w-8 sm:w-12 lg:w-20 bg-neutral" />
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-neutral">
            Feature Selections
          </h2>
        </div>

        {/* Feature Grid */}
        <div
          ref={containerRef}
          className="
            grid grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-6 
            auto-rows-[180px]
            sm:auto-rows-[200px] 
            lg:auto-rows-[240px] 
            gap-3 sm:gap-4 lg:gap-6
          "
        >
          {/* Text Block */}
          <div
            ref={textRef}
            className="sm:col-span-2 lg:row-span-1 space-y-2 sm:space-y-3 lg:space-y-4 self-start p-4 sm:p-0"
          >
            <h3 className="text-base sm:text-lg lg:text-xl font-medium text-neutral">
              Crafted for Precision
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-neutral/70 leading-relaxed">
              A balance of acoustic engineering, comfort, and refined design —
              built for immersive everyday listening.
            </p>
          </div>

          {/* Image 1 – Square */}
          <div className="feature-image sm:col-span-2 lg:row-span-1 relative rounded-xl overflow-hidden min-h-[180px]">
            <Image
              src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1770279842/Golden_Sounds__Immerse_Yourself_in_JBL_y15a0b.jpg"
              alt="Headphone product"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 2 – Portrait */}
          <div className="feature-image sm:col-span-2 lg:row-span-2 relative rounded-xl overflow-hidden min-h-[180px]">
            <Image
              src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1770359440/Whether_you_re_an_over-ear_or_in-ear_fan_quality_noise_cancellation_is_here___Both_the_MW75_Headphones_and_MW09_Earphones_are_equipped_with_three_modes_of_ANC_so_you_only_hear_the_sound_you_want__fu2x4n.jpg"
              alt="Portrait headphone"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 3 – Landscape (left bottom) */}
          <div className="feature-image sm:col-span-2 lg:col-span-4 lg:row-span-1 relative rounded-xl overflow-hidden min-h-[180px]">
            <Image
              src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1770359440/Headphone_Poster____Headphone_Manipulation_qxlcxs.jpg"
              alt="Wide headphone shot"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 4 – Landscape (right bottom) */}
          <div className="feature-image sm:col-span-2 lg:row-span-1 relative rounded-xl overflow-hidden min-h-[180px]">
            <Image
              src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1770360691/download_2_zplsrz.jpg"
              alt="Additional product shot"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 5 */}
          <div className="feature-image sm:col-span-2 lg:row-span-1 relative rounded-xl overflow-hidden min-h-[180px]">
            <Image
              src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1770360691/AirPods_Max_Infographic_Premium_A_Content_for_Amazon_jt5tb5.jpg"
              alt="Additional product shot"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Feature List */}
          <div
            ref={listRef}
            className="sm:col-span-2 lg:row-span-1 space-y-3 sm:space-y-4 lg:space-y-6 self-end p-4 sm:p-0"
          >
            {[
              "Precision-tuned sound",
              "All-day comfort",
              "Minimal durable build",
              "Seamless connectivity",
            ].map((item) => (
              <div
                key={item}
                className="border-b border-base-300 pb-2 sm:pb-3 text-xs sm:text-sm text-neutral cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
