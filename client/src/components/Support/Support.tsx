"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Headphones,
  Package,
  RefreshCw,
  Wrench,
  ShoppingCart,
  Truck,
  Shield,
  MessageCircle,
  Search,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";

const categories = [
  {
    icon: Headphones,
    title: "Audio",
    description: "Sound quality & setup",
  },
  {
    icon: Package,
    title: "Products",
    description: "Specs & compatibility",
  },
  {
    icon: Truck,
    title: "Shipping",
    description: "Delivery & tracking",
  },
  {
    icon: ShoppingCart,
    title: "Orders",
    description: "Order status & history",
  },
  {
    icon: RefreshCw,
    title: "Returns",
    description: "Return policy & process",
  },
  {
    icon: Shield,
    title: "Warranty",
    description: "Coverage & claims",
  },
  {
    icon: Wrench,
    title: "Technical",
    description: "Troubleshooting help",
  },
  {
    icon: MessageCircle,
    title: "Support",
    description: "Live chat & contact",
  },
];

const quickLinks = [
  {
    title: "Customer Support",
    links: [
      "Where is My Order?",
      "Warranties",
      "30-Day Guarantee",
      "Limitation of Liability",
    ],
  },
  {
    title: "Refunds & Returns",
    links: [
      "How To Replace My Device?",
      "How To Return My Device?",
      "Refund Policy",
    ],
  },
  {
    title: "About Us",
    links: ["Our Story", "Careers", "Press Kit", "Contact Information"],
  },
];

export default function Support() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const searchRef = useRef(null);
  const categoriesRef = useRef(null);
  const linksRef = useRef(null);
  const ctaRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Hero section animation
      tl.fromTo(
        heroRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          searchRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3",
        )
        .fromTo(
          ".category-card",
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: {
              amount: 0.4,
              from: "start",
            },
            duration: 0.5,
            ease: "back.out(1.2)",
          },
          "-=0.2",
        )
        .fromTo(
          ".quick-link-section",
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.5,
          },
          "-=0.3",
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-base-200 to-base-100"
    >
      {/* Hero Section with Search */}
      <div className="relative bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-20 px-6 overflow-hidden">
        {/* Background decoration - Top Left */}
        <div className="absolute bottom-10 left-20 opacity-10">
          <Image
            src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1770393143/title3_jwghlb.png"
            alt=""
            width={300}
            height={300}
            className="object-contain -rotate-19"
          />
        </div>

        {/* Background decoration - Top Right */}
        <div className="absolute top-10 right-20 opacity-10">
          <Image
            src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1770393142/title4_w7t4p5.png"
            alt=""
            width={300}
            height={300}
            className="object-contain rotate-12"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1
            ref={heroRef}
            className="text-5xl md:text-6xl font-semibold text-neutral mb-6 tracking-tight"
          >
            HELP CENTER
          </h1>

          {/* Search Bar */}
          <div ref={searchRef} className="relative max-w-xl mx-auto">
            <div className="relative flex items-center bg-white/90 backdrop-blur-sm border border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Search className="w-5 h-5 text-gray-400 ml-6" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Help Center"
                className="flex-1 bg-transparent outline-none px-4 py-4 text-base text-neutral placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div ref={categoriesRef} className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                className="category-card group relative bg-white/40 backdrop-blur-xl rounded-2xl p-8 border border-white/50 hover:border-primary/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                {/* Subtle noise texture overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: "url('/noise.jpg')",
                    backgroundRepeat: "repeat",
                  }}
                />

                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_10px_rgba(255,255,255,0.3)] pointer-events-none" />

                <div className="relative flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 shadow-md">
                    <Icon className="w-7 h-7 text-gray-700 group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-neutral mb-1">
                      {category.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {category.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Links Section */}
      <div ref={linksRef} className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {quickLinks.map((section, index) => (
            <div key={index} className="quick-link-section">
              <h3 className="text-lg font-semibold text-primary mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button className="text-sm text-gray-600 hover:text-primary transition-colors duration-200 text-left">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div ref={ctaRef} className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-br from-primary/10 via-white to-primary/5 rounded-3xl p-12 border border-primary/20 shadow-xl">
          <h2 className="text-3xl font-semibold text-neutral mb-4">
            Still Need Help?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Our support team is ready to assist you with any questions or
            concerns about your audio experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <Mail className="w-5 h-5" />
              <span>Email Support</span>
            </button>

            <button className="group relative inline-flex items-center justify-center gap-3 bg-white border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
              <Phone className="w-5 h-5" />
              <span>Call Us</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
