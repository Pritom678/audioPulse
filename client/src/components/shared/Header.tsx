"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Logo from "./Logo";
import api from "@/lib/axios";

const navLinks = [
  { name: "Products", href: "/products" },
  { name: "Support", href: "/support" },
  { name: "About", href: "/about" },
];

const Header: React.FC = () => {
  const [authenticated, setAuthenticated] = React.useState(false);

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

  return (
    <header className="sticky top-0 z-30 w-full bg-base-100 border-b border-base-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <ul className="flex-1 flex justify-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-base font-medium px-3 py-2 rounded-full transition duration-150 hover:bg-base-200 focus:outline-none focus-visible:ring ring-base-300"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {authenticated ? (
            <>
              <Link
                href="/dashboard"
                className="btn btn-primary rounded-full px-6 py-2 text-base font-semibold transition duration-150 text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={async () => {
                  await api.post("/auth/logout");
                  window.location.reload();
                }}
                className="btn btn-outline rounded-full px-4 py-2 text-base font-semibold transition duration-150 text-neutral"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/signup"
              className="btn btn-primary rounded-full px-6 py-2 text-base font-semibold transition duration-150"
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
