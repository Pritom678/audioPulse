"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

type WishlistContextType = {
  wishlist: string[];
  loading: boolean;
  toggleWishlist: (productId: string) => Promise<void>;
  isWishlisted: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await api.get("/wishlist/");
        const ids = data.products.map((p: any) => p._id);
        setWishlist(ids);
      } catch (error: any) {
        if (error.response?.status !== 401) {
          console.error("Wishlist fetch error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const toggleWishlist = async (productId: string) => {
    try {
      // Optimistic update
      const alreadyExists = wishlist.includes(productId);

      if (alreadyExists) {
        setWishlist((prev) => prev.filter((id) => id !== productId));
      } else {
        setWishlist((prev) => [...prev, productId]);
      }

      const { data } = await api.post("/wishlist/toggle", {
        productId,
      });

      if (data.added) {
        toast.success("Added to wishlist ❤️");
      } else {
        toast.success("Removed from wishlist");
      }
    } catch (error: any) {
      toast.error("Please login first");
    }
  };

  const isWishlisted = (productId: string) =>
    wishlist.includes(productId);

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, toggleWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return context;
};
