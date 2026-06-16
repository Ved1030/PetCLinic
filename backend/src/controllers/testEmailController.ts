import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { emailService, verifyEmailConnection } from "../services/emailService";
import { logger } from "../utils/logger";

export const testEmailController = {
  sendTest: asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({
        success: false,
        message: "A valid email address is required in the request body",
      });
      return;
    }

    logger.info(`TEST EMAIL: Starting test email delivery to ${email}`);

    const testAppointment = {
      id: `test_${Date.now()}`,
      petName: "Test Pet",
      petType: "Dog",
      breed: "Test Breed",
      ownerName: "Test Owner",
      email: email,
      phone: "9876543210",
      service: "Veterinary Consultation",
      date: new Date().toISOString().split("T")[0],
      time: "10:00",
      reason: "Test appointment - please ignore",
      status: "booked" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const errors: string[] = [];

    try {
      logger.info("TEST EMAIL: Sending confirmation...");
      await emailService.sendConfirmation(testAppointment);
      logger.info("TEST EMAIL: Confirmation sent");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      errors.push(`confirmation: ${msg}`);
      logger.error("TEST EMAIL FAILED (confirmation):", err);
    }

    try {
      logger.info("TEST EMAIL: Sending clinic notification...");
      await emailService.sendClinicNotification(testAppointment);
      logger.info("TEST EMAIL: Clinic notification sent");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      errors.push(`clinic_notification: ${msg}`);
      logger.error("TEST EMAIL FAILED (clinic notification):", err);
    }

    if (errors.length === 0) {
      logger.info(`TEST EMAIL: Successfully delivered to ${email}`);
      res.json({
        success: true,
        message: `Test email sent successfully to ${email}. Please check your inbox (and spam folder).`,
      });
    } else {
      logger.warn(`TEST EMAIL: Partial/failed delivery to ${email}: ${errors.join("; ")}`);
      res.status(500).json({
        success: false,
        message: "Test email delivery had errors",
        errors,
      });
    }
  }),

  verifyConnection: asyncHandler(async (_req: Request, res: Response) => {
    const verified = await verifyEmailConnection();
    if (verified) {
      res.json({ success: true, message: "SMTP connection verified successfully" });
    } else {
      res.status(500).json({
        success: false,
        message: "SMTP connection verification failed. Check EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS in .env",
      });
    }
  }),
};
