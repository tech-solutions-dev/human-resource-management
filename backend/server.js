const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const { sequelize } = require("./config/database");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const departmentRoutes = require("./routes/departments");
const leaveRoutes = require("./routes/leaves");
const transferRoutes = require("./routes/transfers");
const reportRoutes = require("./routes/reports");

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    error: "Too Many Requests",
    message: "Too many requests from this IP, please try again later.",
  },
});

app.use(limiter);

// Logging middleware
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/reports", reportRoutes);

// Error handler
app.use(errorHandler);
// Static file serving for uploads
app.use("/upload", express.static("uploads"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ success: true, status: "OK", timestamp: new Date() });
});

// Sync DB and start server
const PORT = process.env.PORT || 3001;
(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  await sequelize.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully");
  await sequelize.close();
  process.exit(0);
});

module.exports = app;
