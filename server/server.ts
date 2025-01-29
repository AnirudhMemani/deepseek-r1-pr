
import express, { Request, Response, NextFunction } from "express";
import { config } from "./config";
import { authenticateWebhook } from "./middleware/auth";
import { handleWebhook } from "./routes/webhook";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

const app = express();

// Middleware
app.use(express.json());
app.use(authenticateWebhook);

// Routes
app.post("/webhook", handleWebhook);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error("Unhandled error", { error: err.message });
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = config.PORT;
app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
