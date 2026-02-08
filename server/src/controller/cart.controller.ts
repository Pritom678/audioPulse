import type { Request, Response } from "express";
import Cart from "../model/cart.model.js";

export const addToCart = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { productId, quantity = 1 } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [{ product: productId, quantity }],
    });
  } else {
    const item = cart.items.find((i) => i.product.toString() === productId);

    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
  }
  await cart.save();
  res.status(200).json({ success: true });
};

export const getCart = async (req: Request, res: Response) => {
  res.set("Cache-Control", "no-store");
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product",
  );

  res.json(cart || { items: [] });
};


// Remove item
export const removeFromCart = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  res.json({ success: true, cart });
};

// Update quantity
export const updateCartQuantity = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const { quantity } = req.body; // number

  const cart = await Cart.findOne({ user: userId });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;

  await cart.save();

  res.json({ success: true, cart });
};
