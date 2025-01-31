
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export const authenticateWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signature = req.header("Google-Signature");
    const timestamp = req.header("Google-Timestamp");
    
    if (!signature || !timestamp) {
      logger.warn("Missing Google-Signature or Google-Timestamp header");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify JWT signature
    const decoded = verify(signature, process.env.GOOGLE_JWT_KEY as string, {
      algorithms: ["ES256"],
      header: { alg: "ES256" },
    });

    if (typeof decoded !== "object" || !decoded.iat) {
      logger.warn("Invalid JWT payload");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify timestamp is recent (within 5 minutes)
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime - decoded.iat > 300) {
      logger.warn("Expired timestamp");
      return res.status(401).json({ error: "Unauthorized" });
    }

    next();
  } catch (error) {
    logger.error("Webhook authentication failed", { error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
