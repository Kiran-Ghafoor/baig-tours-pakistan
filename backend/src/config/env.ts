import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const REQUIRED_VARS = ["MONGODB_URI", "JWT_SECRET"] as const;
const missing = REQUIRED_VARS.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

export const env = {
  port: parseInt(process.env.PORT ?? "4000", 10),
  nodeEnv: process.env.NODE_ENV ?? "development",
  mongodbUri: process.env.MONGODB_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",

  // SMTP (Nodemailer)
  smtpHost: process.env.SMTP_HOST ?? "",
  smtpPort: parseInt(process.env.SMTP_PORT ?? "587", 10),
  smtpSecure: process.env.SMTP_SECURE === "true",
  smtpUser: process.env.SMTP_USER ?? "",
  smtpPass: process.env.SMTP_PASS ?? "",

  // Email
  emailFrom: process.env.EMAIL_FROM ?? "noreply@baigtourspakistan.pk",
  companyEmail: process.env.COMPANY_EMAIL ?? "info@baigtourspakistan.pk",
  companyName: process.env.COMPANY_NAME ?? "Baig Tours Pakistan",

  // Sanity
  sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  sanityApiToken: process.env.SANITY_API_TOKEN ?? "",
};
