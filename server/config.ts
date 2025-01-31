
import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables
dotenv.config();

// Define configuration schema
export const Config = z.object({
  PORT: z.number().min(1, "Must be a valid port"),
  WEBHOOK_SECRET: z.string().min(1, "Webhook secret is required"),
  GOOGLE_JWT_KEY: z.string().min(1, "Google JWT key is required"),
});

// Validate environment variables
export const config = Config.parse(process.env);
