"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Plus, LogOut, Home } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { logout } from "@/utils/logout";

const navItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Add Product",
    href: "/admin/products/add",
    icon: Plus,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    toast.success("Logging out...");
    logout();
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
      {/* Logo - Links to Home */}
      <Link href="/" className="block mb-8 group">
        <div className="flex items-center gap-2">
          <Image
            alt="AudioPulse Logo"
            src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1770102930/logo_lvht9r.png"
            width={40}
            height={40}
            className="group-hover:scale-110 transition-transform duration-200"
          />
          <div>
            <h1 className="text-xl font-bold text-neutral group-hover:text-primary transition-colors duration-200">
              Audio<span className="text-primary">Pulse</span>
            </h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200" />

      {/* Back to Store */}
      <Link
        href="/"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 mb-2"
      >
        <Home className="w-5 h-5" />
        <span className="font-medium">Back to Store</span>
      </Link>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}
