import mongoose from "mongoose";
import { env } from "./env";

const MAX_RETRIES = 5;
const RETRY_BASE_DELAY_MS = 1000;

let isConnected = false;

export function getDbStatus(): { connected: boolean; state: string } {
  const states: Record<number, string> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  return {
    connected: mongoose.connection.readyState === 1,
    state: states[mongoose.connection.readyState] ?? "unknown",
  };
}

export async function connectDB(): Promise<void> {
  if (isConnected) return;

  const uri = env.mongodbUri;
  if (!uri) {
    console.warn("MONGODB_URI is not set — server will run in degraded mode");
    return;
  }

  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    attempt++;
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      isConnected = true;
      console.log(`Connected to MongoDB (attempt ${attempt})`);
      return;
    } catch (error) {
      const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
      console.error(
        `MongoDB connection attempt ${attempt}/${MAX_RETRIES} failed — retrying in ${delay}ms`
      );
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }

  console.warn("MongoDB not available — server running in degraded mode (database-dependent features unavailable)");
}

mongoose.connection.on("error", (err) => {
  console.error("MongoDB runtime error:", err.message);
  isConnected = false;
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
  isConnected = false;
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
  isConnected = true;
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination");
  process.exit(0);
});
