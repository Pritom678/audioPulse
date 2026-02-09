"use client";

import api from "@/lib/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

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

  const fetchCart = async () => {
    const { data } = await api.get("/cart");
    setCart(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;
  if (!cart || cart.items.length === 0)
    return <p className="text-center mt-10">Your cart is empty 🛒</p>;

  /* -------------------- CALCULATIONS -------------------- */

  const subtotal = cart.items.reduce(
    (sum, i) => sum + Number(i.product.price) * i.quantity,
    0
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
        item.product._id === productId
          ? { ...item, quantity: qty }
          : item
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
        items: cart.items.filter(
          (item) => item.product._id !== productId
        ),
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
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 bg-base-200 rounded-xl border border-white/30 backdrop-blur-md">
          <div className="p-5 border-b border-white/20">
            <h2 className="font-semibold text-lg">Products</h2>
          </div>

          <div className="divide-y divide-white/90">
            {cart.items.map((item) => {
              const itemTotal =
                Number(item.product.price) * item.quantity;

              return (
                <div
                  key={item._id}
                  className={`
                    flex flex-col md:flex-row md:items-center justify-between gap-4 p-5
                    transition-all duration-300
                    ${
                      removingId === item.product._id
                        ? "opacity-0 translate-x-6"
                        : "opacity-100"
                    }
                  `}
                >
                  {/* PRODUCT */}
                  <div className="flex items-center gap-4 flex-1">
                    <Image
                      src={item.product.images?.[0] || "/placeholder.png"}
                      alt={item.product.name}
                      width={72}
                      height={72}
                      className="rounded-xl object-cover"
                    />

                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        ${item.product.price}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity - 1
                        )
                      }
                      className="w-9 h-9 rounded-lg bg-white/40 hover:bg-white/60 transition"
                    >
                      −
                    </button>

                    <span
                      className={`
                        min-w-[28px] text-center font-medium
                        transition-all duration-200
                        ${
                          animatingId === item.product._id
                            ? "scale-125 opacity-60"
                            : ""
                        }
                      `}
                    >
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity + 1
                        )
                      }
                      className="w-9 h-9 rounded-lg bg-white/40 hover:bg-white/60 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* PRICE + REMOVE */}
                  <div className="flex items-center gap-6">
                    <p
                      className={`
                        font-semibold min-w-[80px] text-right
                        transition-all duration-200
                        ${
                          animatingId === item.product._id
                            ? "scale-110 text-primary"
                            : ""
                        }
                      `}
                    >
                      ${itemTotal}
                    </p>

                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
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
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount (10%)</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${delivery}</span>
            </div>

            <div
              className={`
                border-t border-white/20 pt-3 flex justify-between font-semibold
                transition-all duration-300
                ${animatingId ? "scale-105 text-primary" : ""}
              `}
            >
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
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
