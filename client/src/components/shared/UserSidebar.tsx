"use client";

import Link from "next/link";
import { ShoppingCart, Heart, LogOut, X } from "lucide-react";
import api from "@/lib/axios";

type UserSidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const UserSidebar: React.FC<UserSidebarProps> = ({ isOpen, onToggle }) => {
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-md shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 z-50" : "translate-x-full -z-10"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Account</h2>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Sidebar Content */}
        <nav className="p-4 space-y-2">
          <Link
            href="/cart"
            onClick={onToggle}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">Cart</span>
          </Link>

          <Link
            href="/wishlist"
            onClick={onToggle}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Heart className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">Wishlist</span>
          </Link>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default UserSidebar;
