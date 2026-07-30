import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import { connectDB, getDbStatus } from "./config/db";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";

import bookingRoutes from "./routes/booking.routes";
import contactRoutes from "./routes/contact.routes";
import newsletterRoutes from "./routes/newsletter.routes";
import authRoutes from "./routes/auth.routes";
import adminBookingRoutes from "./routes/admin/booking.routes";
import adminTourRoutes from "./routes/admin/tour.routes";
import adminReviewRoutes from "./routes/admin/review.routes";
import adminBlogRoutes from "./routes/admin/blog.routes";
import adminGalleryRoutes from "./routes/admin/gallery.routes";
import adminProfileRoutes from "./routes/admin/profile.routes";
import adminSeoRoutes from "./routes/admin/seo.routes";
import adminSearchRoutes from "./routes/admin/search.routes";
import adminContactRoutes from "./routes/admin/contact.routes";
import adminSubscriberRoutes from "./routes/admin/subscriber.routes";
import adminStatsRoutes from "./routes/admin/stats.routes";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (_req, res) => {
  const db = getDbStatus();
  res.json({
    status: db.connected ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    database: db,
    uptime: process.uptime(),
  });
});

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later" },
});
app.use("/api/", publicLimiter);

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later" },
});
app.use("/api/admin", adminLimiter);

app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin/bookings", adminBookingRoutes);
app.use("/api/admin/tours", adminTourRoutes);
app.use("/api/admin/reviews", adminReviewRoutes);
app.use("/api/admin/blogs", adminBlogRoutes);
app.use("/api/admin/gallery", adminGalleryRoutes);
app.use("/api/admin/profile", adminProfileRoutes);
app.use("/api/admin/seo", adminSeoRoutes);
app.use("/api/admin/search", adminSearchRoutes);
app.use("/api/admin/contacts", adminContactRoutes);
app.use("/api/admin/subscribers", adminSubscriberRoutes);
app.use("/api/admin/stats", adminStatsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  connectDB().catch((err) => console.error("[DB] Initial connection error:", err));
  setImmediate(() => {
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
    });
  });
}

process.on("unhandledRejection", (reason) => {
  console.error("[UNHANDLED REJECTION]", reason);
});

if (process.env.NODE_ENV !== "test") {
  start().catch((err) => console.error("Failed to start server:", err));
}

export default app;
