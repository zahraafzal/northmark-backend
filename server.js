import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectDB from "./config/database.js";

// Load env
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Security
app.use(helmet());
app.use(
  cors({
    origin: "*", // Allow all origins for development (file:// protocol support)
    credentials: true,
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api/", limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";
import reviewRoutes from "./routes/reviews.js";
import newsletterRoutes from "./routes/newsletter.js";

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/newsletter", newsletterRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "🚀 NORTHMARK API Running",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      auth: "/api/auth",
      orders: "/api/orders",
      reviews: "/api/reviews",
      newsletter: "/api/newsletter",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   🚀 NORTHMARK API Server Running   ║
╠═══════════════════════════════════════╣
║   Port: ${PORT}                        ║
║   Mode: ${process.env.NODE_ENV}      ║
║   URL:  http://localhost:${PORT}      ║
╚═══════════════════════════════════════╝
  `);
});
