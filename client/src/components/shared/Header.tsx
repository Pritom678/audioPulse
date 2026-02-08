"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import api from "@/lib/axios";

const navLinks = [
  { name: "Products", href: "/products" },
  { name: "Support", href: "/support" },
  { name: "About", href: "/about" },
];

const Header: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        setAuthenticated(res.status === 200);
      } catch {
        setAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const glassBase =
    "backdrop-blur-md  rounded-full px-4 py-2 " +
    "text-base font-medium transition-all duration-200 " +
    "focus:outline-none focus-visible:ring ring-primary/30";

  const glassInactive = "bg-white/10 hover:bg-primary/20 hover:shadow-lg text-neutral hover:text-primary";

  const glassActive = "bg-primary/30 shadow-lg text-primary border-primary/30";

  return (
    <header className="sticky top-0 z-30 w-full bg-base-100/70 backdrop-blur-lg border-b border-base-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {/* Nav Links */}
        <ul className="flex-1 flex justify-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`border border-white/20 ${glassBase} ${
                    isActive ? glassActive : glassInactive
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Auth Actions */}
        <div className="flex items-center gap-3">
          {authenticated ? (
            <>
              <Link
                href="/dashboard"
                className={`border border-white/20 ${glassBase} ${
                  pathname === "/dashboard"
                    ? glassActive
                    : "bg-primary/20 hover:bg-primary/30 text-primary"
                } px-6`}
              >
                Dashboard
              </Link>

              <button
                onClick={async () => {
                  await api.post("/auth/logout");
                  window.location.reload();
                }}
                className={`border border-white/20 ${glassBase} bg-red-500/10 text-red-500 hover:bg-red-500/20`}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/signup"
              className={`${glassBase} ${
                pathname === "/signup"
                  ? glassActive
                  : "border border-accent bg-white/20 text-primary hover:bg-primary/40 hover:text-white"
              } px-6`}
            >
              Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
