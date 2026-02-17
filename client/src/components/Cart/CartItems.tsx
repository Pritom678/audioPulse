"use client";

import api from "@/lib/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { formatPrice } from "@/utils/priceFormat";
import Loading from "@/components/Shared/Loading";

interface Product {
  _id: string;
  name: string;
  price: string;
  images?: string[];
}

interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

interface Cart {
  _id?: string;
  items: CartItem[];
}

const CartItems = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log("=== CartItems Component Mounted ===");

  const fetchCart = async () => {
    console.log("Fetching cart...");
    try {
      const { data } = await api.get("/cart");
      console.log("Cart data received:", data);
      setCart(data);
      setError(null);
    } catch (err: any) {
      console.error("Cart fetch error:", err);
      if (err.response?.status === 401) {
        console.log("401 error - user not authenticated");
        setError("Please log in to view your cart");
      } else {
        setError("Failed to load cart. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("CartItems useEffect running");
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loading size="lg" text="Loading cart..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-center text-red-500 mb-4">{error}</p>
        {error.includes("log in") && (
          <a
            href="/login"
            className="px-6 py-3 rounded-xl font-semibold text-white
              bg-primary/70 backdrop-blur-md border border-white/30
              hover:bg-primary/80 hover:shadow-xl
              transition-all duration-200"
          >
            Go to Login
          </a>
        )}
      </div>
    );
  }

  if (!cart || cart.items.length === 0)
    return <p className="text-center mt-10">Your cart is empty 🛒</p>;

  /* -------------------- CALCULATIONS -------------------- */

  const subtotal = cart.items.reduce(
    (sum, i) => sum + Number(i.product.price) * i.quantity,
    0,
  );
  const discount = subtotal * 0.1;
  const delivery = 50;
  const total = subtotal - discount + delivery;

  /* -------------------- QUANTITY -------------------- */

  const handleQuantityChange = async (productId: string, qty: number) => {
    if (qty < 1 || !cart) return;

    setAnimatingId(productId);
    const prevCart = structuredClone(cart);

    setCart({
      ...cart,
      items: cart.items.map((item) =>
        item.product._id === productId ? { ...item, quantity: qty } : item,
      ),
    });

    try {
      await api.put(`/cart/${productId}`, { quantity: qty });
    } catch {
      setCart(prevCart);
    } finally {
      setTimeout(() => setAnimatingId(null), 200);
    }
  };

  /* -------------------- REMOVE -------------------- */

  const handleRemove = async (productId: string) => {
    if (!cart) return;

    setRemovingId(productId);
    const prevCart = structuredClone(cart);

    setTimeout(() => {
      setCart({
        ...cart,
        items: cart.items.filter((item) => item.product._id !== productId),
      });
    }, 200);

    try {
      await api.delete(`/cart/${productId}`);
    } catch {
      setCart(prevCart);
    } finally {
      setRemovingId(null);
    }
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 bg-base-200 rounded-xl border border-white/30 backdrop-blur-md">
          <div className="p-4 sm:p-5 border-b border-white/20">
            <h2 className="font-semibold text-lg">Products</h2>
          </div>

          <div className="divide-y divide-white/90">
            {cart.items.map((item) => {
              const itemTotal = Number(item.product.price) * item.quantity;

              return (
                <div
                  key={item._id}
                  className={`
                    flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5
                    transition-all duration-300
                    ${
                      removingId === item.product._id
                        ? "opacity-0 translate-x-6"
                        : "opacity-100"
                    }
                  `}
                >
                  {/* PRODUCT */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <Image
                      src={item.product.images?.[0] || "/placeholder.png"}
                      alt={item.product.name}
                      width={60}
                      height={60}
                      className="rounded-xl object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base">
                        {item.product.name}
                      </p>
                      <p className="text-sm sm:text-base text-gray-500">
                        {formatPrice(Number(item.product.price))}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">
                      Quantity:
                    </label>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                      >
                        <span className="text-xs sm:text-sm font-medium">
                          −
                        </span>
                      </button>
                      <span className="text-sm sm:text-base font-medium w-8 sm:w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                      >
                        <span className="text-xs sm:text-sm font-medium">
                          +
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => handleRemove(item.product._id)}
                    className="text-red-500 hover:text-red-600 transition-colors p-2 sm:p-3"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-base-200 rounded-xl border border-white/30 p-6 h-fit backdrop-blur-md">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount (10%)</span>
              <span>- {formatPrice(discount)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{formatPrice(delivery)}</span>
            </div>

            <div
              className={`
                border-t border-white/20 pt-3 flex justify-between font-semibold
                transition-all duration-300
                ${animatingId ? "scale-105 text-primary" : ""}
              `}
            >
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <button
            className="mt-6 w-full px-6 py-3 rounded-xl font-semibold text-white
              bg-primary/70 backdrop-blur-md border border-white/30
              hover:bg-primary/80 hover:shadow-xl
              transition-all duration-200"
          >
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
