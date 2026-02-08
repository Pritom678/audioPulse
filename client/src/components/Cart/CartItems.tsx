"use client";
import api from "@/lib/axios";
import React, { useEffect, useState } from "react";

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

  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart/");
      setCart(data);
    } catch (error) {
      console.error("Failed to load cart", error);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading cart...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return <div className="text-center mt-10">Your cart is empty 🛒</div>;
  }

  const handleRemove = async (productId: string) => {
    try {
      await api.delete(`/cart/${productId}`);
      fetchCart(); // refresh cart
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = async (productId: string, newQty: number) => {
    if (newQty < 1) return; // optional: min 1

    try {
      await api.put(`/cart/${productId}`, { quantity: newQty });
      fetchCart(); // refresh cart
    } catch (error) {
      console.error(error);
    }
  };

  const total = cart.items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Cart</h1>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border rounded-lg p-4"
          >
            <div>
              <h2 className="font-medium">{item.product.name}</h2>
              <p className="text-sm text-gray-500">
                Price: ${item.product.price}
              </p>
              <p className="text-sm">Quantity: {item.quantity}</p>
            </div>

            <p className="font-semibold">
              ${Number(item.product.price) * Number(item.quantity)}
            </p>
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 mt-2">
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() =>
                  handleQuantityChange(item.product._id, item.quantity - 1)
                }
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() =>
                  handleQuantityChange(item.product._id, item.quantity + 1)
                }
              >
                +
              </button>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="font-semibold">
                ${Number(item.product.price) * item.quantity}
              </p>
              <button
                className="text-red-500 text-sm underline"
                onClick={() => handleRemove(item.product._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <p className="text-lg font-semibold">Total: ${total}</p>
      </div>
    </div>
  );
};

export default CartItems;
