import { Request } from "express";

const isDev = (process.env.NODE_ENV || "development") === "development";

function timestamp(): string {
  return new Date().toISOString();
}

interface LogEntry {
  level: string;
  timestamp: string;
  message: string;
  requestId?: string;
  data?: unknown;
  error?: unknown;
}

function log(level: string, message: string, ...args: unknown[]): void {
  const entry: LogEntry = {
    level,
    timestamp: timestamp(),
    message,
  };

  if (args.length === 1 && args[0] instanceof Error) {
    entry.error = {
      name: (args[0] as Error).name,
      message: (args[0] as Error).message,
      ...(isDev ? { stack: (args[0] as Error).stack } : {}),
    };
  } else if (args.length > 0) {
    entry.data = args;
  }

  const output = JSON.stringify(entry);

  switch (level) {
    case "error":
      console.error(output);
      break;
    case "warn":
      console.warn(output);
      break;
    case "debug":
      if (isDev) console.debug(output);
      break;
    default:
      console.log(output);
  }
}

export const logger = {
  info: (message: string, ...args: unknown[]) => log("info", message, ...args),
  error: (message: string, ...args: unknown[]) => log("error", message, ...args),
  warn: (message: string, ...args: unknown[]) => log("warn", message, ...args),
  debug: (message: string, ...args: unknown[]) => log("debug", message, ...args),

  requestLogger: (req: Request, message: string, ...args: unknown[]) => {
    const reqId = (req as any).requestId || "unknown";
    log("info", `[${reqId}] ${message}`, ...args);
  },
};
