import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { logger } from "../utils/logger";

const subscribers: string[] = [];

export const newsletterController = {
  subscribe: asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (subscribers.includes(email)) {
      res.status(200).json({ success: true, message: "Email already subscribed" });
      return;
    }

    subscribers.push(email);
    logger.info(`Newsletter subscription: ${email}`);

    res.status(201).json({ success: true, message: "Successfully subscribed to newsletter" });
  }),
};
