import dotenv from "dotenv";

dotenv.config();

function validateEnv(): void {
  const requiredVars: string[] = [];

  if (process.env.NODE_ENV === "production") {
    requiredVars.push(
      "SARVAM_API_KEY",
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
