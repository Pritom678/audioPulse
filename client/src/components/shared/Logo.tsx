'use client';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".logo",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
    );
  });
  return (
    <Link href={"/"} className="logo flex items-center gap-1">
      <Image alt="logo-care" src={"https://res.cloudinary.com/do3iu9q7d/image/upload/v1770102930/logo_lvht9r.png"} width={50} height={40} />
      <h2 className="text-xl font-bold">
        Audio<span className="text-primary">Pulse</span>{" "}
      </h2>
    </Link>
  );
};

export default Logo;