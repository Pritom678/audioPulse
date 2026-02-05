import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";


const app = express();
const PORT = 8080;
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.use("/auth", authRoutes);
app.use('/products', productRoutes)


await connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
