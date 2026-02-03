import React from "react";
import Logo from "./Logo";

const navLinks = [
  { name: "Products", href: "/products" },
  { name: "Support", href: "/support" },
  { name: "About", href: "/about" },
];

const Footer: React.FC = () => (
  <footer className="bg-base-200 border-t border-base-300 w-full">
    <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <Logo />
        <p className="mt-4 text-base text-base-content/70 max-w-xs">
          <span className="text-primary">AudioPluse</span> creates beautifully
          designed headphones and speakers that deliver pure sound, refined
          comfort, and everyday simplicity.
        </p>
      </div>
      <nav aria-label="Footer navigation" className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-base font-medium px-3 py-2 rounded-full transition duration-150 hover:bg-base-300 focus:outline-none focus-visible:ring ring-base-300"
          >
            {link.name}
          </a>
        ))}
      </nav>
      <div className="flex flex-col justify-end items-start md:items-end">
        <span className="text-sm text-base-content/60">
          &copy; {new Date().getFullYear()} AudioPluse. All rights reserved.
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
