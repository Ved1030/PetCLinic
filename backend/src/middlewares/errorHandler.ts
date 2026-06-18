import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

const isDev = (process.env.NODE_ENV || "development") === "development";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.statusCode === 500 && !isDev ? { error: "Internal server error" } : {}),
      ...(isDev && err.statusCode === 500 ? { stack: err.stack } : {}),
    });
    return;
  }

  if (err.name === "ZodError") {
    res.status(400).json({
      success: false,
      message: "Validation error",
      errors: (err as any).errors,
    });
    return;
  }

  logger.error("Unhandled error:", err);

  res.status(500).json({
    success: false,
    message: isDev ? err.message : "Internal server error",
    ...(isDev ? { stack: err.stack } : {}),
  });
};
