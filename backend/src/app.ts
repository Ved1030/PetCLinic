import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { config } from "./config";
import appointmentRoutes from "./routes/appointmentRoutes";
import contactRoutes from "./routes/contactRoutes";
import staticDataRoutes from "./routes/staticDataRoutes";
import chatRoutes from "./routes/chatRoutes";
import testEmailRoutes from "./routes/testEmailRoutes";
import newsletterRoutes from "./routes/newsletterRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { logger } from "./utils/logger";

const app = express();

// Trust proxy — required when behind Render's load balancer
app.set("trust proxy", 1);

// Security middleware
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "blob:", "https://*.google.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'", ...config.corsOrigins],
        frameSrc: ["'self'", "https://www.google.com"],
      },
    },
  })
);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        // Server-to-server, Postman, curl — no origin to reflect
        return callback(null, true);
      }
      if (config.corsOrigins.includes(origin)) {
        // Known origin — reflect it
        return callback(null, true);
      }
      // Unknown origin — log and still allow (reflect the origin back)
      // This prevents CORS preflight failures in production
      console.warn(`[CORS] Allowing unknown origin: ${origin}`);
      callback(null, true);
    },
    credentials: true,
  })
);

// Rate limiting - stricter in production
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.isProd ? 50 : 100,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use(config.apiPrefix, limiter);

// Body parsing with size limits (increased for chat history payloads)
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

// Logging
app.use(morgan(config.isDev ? "dev" : "combined"));

// Root route
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "PetClinic API is running",
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// Health check
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "PetClinic API is running",
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

app.get(`${config.apiPrefix}/health`, (_req, res) => {
  res.json({
    success: true,
    message: "PetClinic API is running",
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// ── CORS diagnostic middleware for chat routes ──
app.use(`${config.apiPrefix}/chat`, (req, _res, next) => {
  console.log("[CORS-DEBUG] Request to /api/chat:", {
    method: req.method,
    origin: req.headers.origin,
    referer: req.headers.referer,
    'content-type': req.headers['content-type'],
    path: req.path,
  });
  next();
});

// Routes
app.use(`${config.apiPrefix}/appointments`, appointmentRoutes);
app.use(`${config.apiPrefix}/contact`, contactRoutes);
app.use(`${config.apiPrefix}/data`, staticDataRoutes);
app.use(`${config.apiPrefix}/chat`, chatRoutes);
app.use(`${config.apiPrefix}/newsletter`, newsletterRoutes);

if (config.isDev) {
  app.use(`${config.apiPrefix}/test-email`, testEmailRoutes);
}

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use(errorHandler);

export default app;
