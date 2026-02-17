import Wishlist from "../model/wishlist.model.js";
export const toggleWishlist = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
        wishlist = new Wishlist({
            user: userId,
            products: [productId],
        });
        await wishlist.save();
        return res.json({ added: true, message: "Added to wishlist" });
    }
    const exists = wishlist.products.some((id) => id.toString() === productId);
    if (exists) {
        wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
        await wishlist.save();
        return res.json({ added: false, message: "Removed from wishlist" });
    }
    else {
        wishlist.products.push(productId);
        await wishlist.save();
        return res.json({ added: true, message: "Added to wishlist" });
    }
};
export const getWishlist = async (req, res) => {
    const userId = req.user._id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate("products");
    res.json(wishlist || { products: [] });
};
//# sourceMappingURL=wishlist.controller.js.map