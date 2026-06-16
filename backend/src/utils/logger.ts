const isDev = (process.env.NODE_ENV || "development") === "development";

function timestamp(): string {
  return new Date().toISOString();
}

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    console.log(JSON.stringify({ level: "info", timestamp: timestamp(), message, ...(args.length ? { data: args } : {}) }));
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(JSON.stringify({ level: "error", timestamp: timestamp(), message, ...(args.length ? { data: args } : {}) }));
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(JSON.stringify({ level: "warn", timestamp: timestamp(), message, ...(args.length ? { data: args } : {}) }));
  },
  debug: (message: string, ...args: unknown[]) => {
    if (isDev) console.debug(JSON.stringify({ level: "debug", timestamp: timestamp(), message, ...(args.length ? { data: args } : {}) }));
  },
};
