import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import wishlistRoutes from "./routes/wishlist.js";
import adminRoutes from "./routes/admin.js";
const app = express();
const PORT = 8080;
app.use(cookieParser());
// Allow multiple origins for CORS
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:3000",
    "https://audiopluse.vercel.app",
    "https://audiopulse.vercel.app",
].filter(Boolean);
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.log("Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello from the server!");
});
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/admin", adminRoutes);
await connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map