import { Request, Response } from "express";
import { appointmentService } from "../services/appointmentService";
import { emailService } from "../services/emailService";
import { asyncHandler } from "../utils/asyncHandler";
import { logger } from "../utils/logger";

export const appointmentController = {
  getAll: asyncHandler(async (_req: Request, res: Response) => {
    const appointments = await appointmentService.getAll();
    res.json({ success: true, data: appointments });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const appointment = await appointmentService.getById(req.params.id);
    if (!appointment) {
      res.status(404).json({ success: false, message: "Appointment not found" });
      return;
    }
    res.json({ success: true, data: appointment });
  }),

  getSlots: asyncHandler(async (req: Request, res: Response) => {
    const { date } = req.query;
    if (!date || typeof date !== "string") {
      res.status(400).json({ success: false, message: "Date query parameter is required (YYYY-MM-DD)" });
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(400).json({ success: false, message: "Invalid date format. Use YYYY-MM-DD" });
      return;
    }
    const slots = await appointmentService.getSlots(date);
    res.json({ success: true, data: slots });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    logger.info("BOOKING RECEIVED: Processing new appointment booking");

    const appointment = await appointmentService.create(req.body);
    logger.info(`APPOINTMENT SAVED: id=${appointment.id}, pet=${appointment.petName}, owner=${appointment.ownerName}, service=${appointment.service}, date=${appointment.date}, time=${appointment.time}`);

    let emailSent = false;
    let emailError: string | null = null;

    try {
      logger.info("EMAIL GENERATION STARTED: Sending confirmation email to user");
      await emailService.sendConfirmation(appointment);
      logger.info("EMAIL GENERATION STARTED: Sending clinic notification email");
      await emailService.sendClinicNotification(appointment);
      emailSent = true;
      logger.info("EMAIL DELIVERY RESPONSE: Both emails sent successfully");
    } catch (err) {
      emailError = err instanceof Error ? err.message : "Unknown email error";
      logger.error("EMAIL ERROR: Failed to send email notifications:", err);
    }

    res.status(201).json({
      success: true,
      data: appointment,
      meta: {
        emailSent,
        emailError,
      },
    });
  }),

  updateStatus: asyncHandler(async (req: Request, res: Response) => {
    const { status } = req.body;
    const appointment = await appointmentService.update(req.params.id, { status });
    if (!appointment) {
      res.status(404).json({ success: false, message: "Appointment not found" });
      return;
    }
    res.json({ success: true, data: appointment });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const appointment = await appointmentService.update(req.params.id, req.body);
    if (!appointment) {
      res.status(404).json({ success: false, message: "Appointment not found" });
      return;
    }
    res.json({ success: true, data: appointment });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const deleted = await appointmentService.delete(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: "Appointment not found" });
      return;
    }
    res.json({ success: true, message: "Appointment deleted" });
  }),
};
