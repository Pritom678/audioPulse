"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, Users, Award, Sparkles } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "30,000+",
    label: "Happy customers in our ratings and happy clients",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Customer satisfaction rate across all products",
  },
  {
    icon: Award,
    value: "50+",
    label: "Industry awards for audio excellence",
  },
];

const teamMembers = [
  {
    id: 1,
    avatar:
      "https://res.cloudinary.com/do3iu9q7d/image/upload/v1771156448/Oval_Face_Shape_Hairstyles_for_Men_y7ehjy.jpg",
  },
  {
    id: 2,
    avatar:
      "https://res.cloudinary.com/do3iu9q7d/image/upload/v1771156638/download_11_dv2oa5.jpg",
  },
  {
    id: 3,
    avatar:
      "https://res.cloudinary.com/do3iu9q7d/image/upload/v1771156639/18_Hairstyles_For_Thick_Wavy_Hair_You_ll_Love_i3c1sr.jpg",
  },
  {
    id: 4,
    avatar:
      "https://res.cloudinary.com/do3iu9q7d/image/upload/v1771156640/download_9_sdorpc.jpg",
  },
  {
    id: 5,
    avatar:
      "https://res.cloudinary.com/do3iu9q7d/image/upload/v1771156640/Emma_Laui_tjrie1.jpg",
  },
  {
    id: 6,
    avatar:
      "https://res.cloudinary.com/do3iu9q7d/image/upload/v1771156640/download_10_ohszln.jpg",
  },
  {
    id: 7,
    avatar:
      "https://res.cloudinary.com/do3iu9q7d/image/upload/v1771156640/A_Woman_Wearing_Glasses_And_A_White_Shirt_Is_Smiling_At_The_Camera_With_Her_fmouij.jpg",
  },
  {
    id: 8,
    avatar:
      "https://res.cloudinary.com/do3iu9q7d/image/upload/v1771156641/Portrait_of_a_confident_young_smart_looking_man___Premium_AI-generated_image_cfqtr0.jpg",
  },
];

export default function About() {
  const containerRef = useRef(null);
  const topStatRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const ratingRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 },
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.2)" },
          "-=0.2",
        )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3",
        )
        .fromTo(
          topStatRef.current,
          { opacity: 0, x: 50, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "back.out(1.3)" },
          "-=0.5",
        )
        .fromTo(
          ".avatar-item",
          { opacity: 0, scale: 0, rotation: 180 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: "back.out(2)",
          },
          "-=0.4",
        )
        .fromTo(
          image1Ref.current,
          { opacity: 0, y: 50, rotation: -10, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.5",
        )
        .fromTo(
          image2Ref.current,
          { opacity: 0, y: 50, rotation: 10, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.7",
        )
        .fromTo(
          ratingRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" },
          "-=0.3",
        )
        .fromTo(
          ".bottom-stat-card",
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.6,
            ease: "back.out(1.3)",
          },
          "-=0.4",
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.5)",
          },
          "-=0.3",
        );
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (image1Ref.current && image2Ref.current) {
      gsap.to(image1Ref.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(image2Ref.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-linear-to-b from-base-100 to-base-200 py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          {/* Left Section */}
          <div className="relative order-2 lg:order-1">
            {/* Top Stat Card */}
            <div
              ref={topStatRef}
              className="hidden sm:block absolute top-0 right-0 z-20 bg-white/50 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 border border-white/60 shadow-2xl max-w-[280px] sm:max-w-xs hover:scale-105 transition-transform duration-300"
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: "url('/noise.jpg')",
                  backgroundRepeat: "repeat",
                }}
              />
              <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_15px_rgba(255,255,255,0.4)] pointer-events-none" />

              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral mb-1">
                    {stats[0].value}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {stats[0].label}
                  </p>
                </div>
              </div>

              <div className="relative mt-4 flex items-center">
                <div className="flex -space-x-2">
                  {teamMembers.map((member, index) => (
                    <div
                      key={member.id}
                      className="avatar-item w-8 h-8 rounded-full backdrop-blur-sm border-2 border-white shadow-lg hover:scale-110 hover:z-50 transition-all duration-200 overflow-hidden relative"
                      style={{ zIndex: 10 - index }}
                    >
                      {/* Team member images */}
                      <Image
                        src={member.avatar}
                        fill
                        alt={`Team member ${index + 1}`}
                        className="object-cover"
                        quality={100}
                      />
                      {/* Fallback gradient if image not found */}
                      <div className="absolute inset-0 bg-linear-to-br from-primary/40 to-primary/70 flex items-center justify-center text-xs font-semibold text-white -z-10">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-32">
              {/* Image 1 */}
              <div className="relative">
                <div
                  ref={image1Ref}
                  className="relative bg-white/40 backdrop-blur-2xl rounded-3xl aspect-square overflow-hidden border border-white/60 shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 rounded-3xl opacity-[0.03] pointer-events-none z-10"
                    style={{
                      backgroundImage: "url('/noise.jpg')",
                      backgroundRepeat: "repeat",
                    }}
                  />
                  <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_15px_rgba(255,255,255,0.4)] pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-primary/10 z-10" />

                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1771155473/download_6_ygioe1.jpg"
                      fill
                      alt="Premium headphones"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div ref={ratingRef} className="mt-4 text-center">
                  <p className="text-sm font-semibold text-neutral mb-1">
                    Best ratings
                  </p>
                  <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                </div>
              </div>

              {/* Image 2 */}
              <div className="relative mt-12">
                <div
                  ref={image2Ref}
                  className="relative bg-white/40 backdrop-blur-2xl rounded-3xl aspect-square overflow-hidden border border-white/60 shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 rounded-3xl opacity-[0.03] pointer-events-none z-10"
                    style={{
                      backgroundImage: "url('/noise.jpg')",
                      backgroundRepeat: "repeat",
                    }}
                  />
                  <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_15px_rgba(255,255,255,0.4)] pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-primary/10 z-10" />

                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-linear-to-br from-primary/30 to-primary/50">
                    <div className="text-center z-20">
                      <Sparkles className="w-12 h-12 text-white/60 mx-auto mb-2" />
                      <Image
                        src={
                          "https://res.cloudinary.com/do3iu9q7d/image/upload/v1771156223/download_8_ipwmot.jpg"
                        }
                        fill
                        alt="images-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <p
                ref={subtitleRef}
                className="text-xs sm:text-sm uppercase tracking-wider text-primary/70 mb-3 font-semibold"
              >
                A BIT
              </p>
              <h1
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-6xl font-bold text-neutral mb-6 tracking-tight"
              >
                ABOUT US
              </h1>
              <p
                ref={descriptionRef}
                className="text-gray-600 leading-relaxed text-base sm:text-lg"
              >
                From the finest audio engineering to exceptional customer care,
                we deliver premium sound experiences. Our passion for audio
                excellence drives us to create products that transform how you
                listen. Every headphone is crafted with precision, tested for
                perfection, and designed to bring your music to life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.slice(1).map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bottom-stat-card relative bg-white/50 backdrop-blur-2xl rounded-3xl p-6 border border-white/60 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    <div
                      className="absolute inset-0 rounded-3xl opacity-[0.03] pointer-events-none"
                      style={{
                        backgroundImage: "url('/noise.jpg')",
                        backgroundRepeat: "repeat",
                      }}
                    />
                    <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_15px_rgba(255,255,255,0.4)] pointer-events-none" />

                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center mb-3 shadow-md">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral mb-2">
                        {stat.value}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <Link
                ref={ctaRef}
                href="/products"
                className="inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                EXPLORE MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
