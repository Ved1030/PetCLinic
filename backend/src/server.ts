import app from "./app";
import { config } from "./config";
import { logger } from "./utils/logger";
import { verifyEmailConnection } from "./services/emailService";

const server = app.listen(config.port, async () => {
  logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
  logger.info(`API available at http://localhost:${config.port}${config.apiPrefix}`);
  logger.info(`Health check at http://localhost:${config.port}${config.apiPrefix}/health`);

  if (config.emailHost && config.emailUser && config.emailPass) {
    logger.info("Email SMTP credentials found — verifying connection...");
    const verified = await verifyEmailConnection();
    if (verified) {
      logger.info("SMTP connection verified successfully on startup");
    } else {
      logger.warn("SMTP connection verification failed on startup — emails will not be sent until fixed");
    }
  } else {
    logger.warn("Email SMTP not configured (EMAIL_HOST, EMAIL_USER, EMAIL_PASS are empty)");
    logger.warn("Set these values in .env to enable email delivery");
    logger.warn("Until then, emails will be logged as [EMAIL MOCK] and NOT actually sent");
  }
});

// Graceful shutdown
const shutdown = (signal: string) => {
  logger.info(`${signal} received. Shutting down gracefully...`);
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

export default server;
