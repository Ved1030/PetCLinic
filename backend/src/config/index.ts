import dotenv from "dotenv";

dotenv.config();

function validateEnv(): void {
  const requiredVars: string[] = [];

  if (process.env.NODE_ENV === "production") {
    requiredVars.push(
      "EMAIL_HOST",
      "EMAIL_USER",
      "EMAIL_PASS"
    );
  }

  const missing = requiredVars.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    console.warn(
      `[CONFIG] Missing required environment variables in production: ${missing.join(", ")}`
    );
  }

  // Log Sarvam key presence (don't require it — mock mode kicks in)
  if (process.env.SARVAM_API_KEY) {
    console.log("[CONFIG] SARVAM_API_KEY is set — AI mode enabled");
  } else {
    console.warn("[CONFIG] SARVAM_API_KEY is NOT set — chatbot will use local fallback responses");
  }

  if (process.env.SARVAM_API_URL) {
    console.log(`[CONFIG] SARVAM_API_URL = ${process.env.SARVAM_API_URL}`);
  } else {
    console.log("[CONFIG] SARVAM_API_URL not set — will use default https://api.sarvam.ai/v1/chat");
  }

  // Log frontend URL
  console.log(`[CONFIG] FRONTEND_URL = ${process.env.FRONTEND_URL || "not set"}`);
  console.log(`[CONFIG] NODE_ENV = ${process.env.NODE_ENV || "not set"}`);
}

validateEnv();

function parseCorsOrigins(): string[] {
  const raw = process.env.CORS_ORIGIN;
  if (!raw) return ["http://localhost:3000", "https://petclinic-drekta.vercel.app", "https://www.petclinic-drekta.vercel.app", "https://petclinicghatkopar.vercel.app", "https://petclinicghatkopar.com"];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigins: parseCorsOrigins(),
  apiPrefix: process.env.API_PREFIX || "/api",
  isDev: (process.env.NODE_ENV || "development") === "development",
  isProd: process.env.NODE_ENV === "production",
  sarvamApiKey: process.env.SARVAM_API_KEY || "",
  sarvamApiUrl: process.env.SARVAM_API_URL || "https://api.sarvam.ai/v1/chat",
  emailHost: process.env.EMAIL_HOST || "",
  emailPort: parseInt(process.env.EMAIL_PORT || "587", 10),
  emailUser: process.env.EMAIL_USER || "",
  emailPass: process.env.EMAIL_PASS || "",
  emailFrom: process.env.EMAIL_FROM || "noreply@petclinicghatkopar.com",
  clinicEmail: process.env.CLINIC_EMAIL || "info@petclinicghatkopar.com",
  whatsappNumber: process.env.WHATSAPP_NUMBER || "+919820465733",
};
