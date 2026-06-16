import { Request, Response } from "express";
import { contactService } from "../services/contactService";
import { emailService } from "../services/emailService";
import { asyncHandler } from "../utils/asyncHandler";
import { logger } from "../utils/logger";

export const contactController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const message = await contactService.create(req.body);

    try {
      await Promise.allSettled([
        emailService.sendContactConfirmation(message),
        emailService.sendContactClinicNotification(message),
      ]);
    } catch (err) {
      logger.error("Failed to send contact notification emails:", err);
    }

    res.status(201).json({ success: true, data: message });
  }),

  getAll: asyncHandler(async (_req: Request, res: Response) => {
    const messages = await contactService.getAll();
    res.json({ success: true, data: messages });
  }),
};
