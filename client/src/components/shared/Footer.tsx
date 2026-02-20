import React from "react";
import Logo from "./Logo";

const navLinks = [
  { name: "Products", href: "/products" },
  { name: "Support", href: "/support" },
  { name: "About", href: "/about" },
];

const Footer: React.FC = () => (
  <footer className="bg-base-200 border-t border-base-300 w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
      <div className="text-center sm:text-left">
        <Logo />
        <p className="mt-4 text-sm sm:text-base text-base-content/70 max-w-xs mx-auto sm:mx-0">
          <span className="text-primary">AudioPluse</span> creates beautifully
          designed headphones and speakers that deliver pure sound, refined
          comfort, and everyday simplicity.
        </p>
      </div>
      <nav
        aria-label="Footer navigation"
        className="flex flex-col gap-2 text-center sm:text-left"
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm sm:text-base font-medium px-3 py-2 rounded-full transition duration-150 hover:bg-base-300 focus:outline-none focus-visible:ring ring-base-300"
          >
            {link.name}
          </a>
        ))}
      </nav>
      <div className="flex flex-col justify-end items-center sm:items-start md:items-end text-center sm:text-left md:text-right">
        <span className="text-xs sm:text-sm text-base-content/60">
          &copy; {new Date().getFullYear()} AudioPluse. All rights reserved.
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
