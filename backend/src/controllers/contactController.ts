import { Request, Response } from "express";
import { contactService } from "../services/contactService";
import { asyncHandler } from "../utils/asyncHandler";

export const contactController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const message = await contactService.create(req.body);
    res.status(201).json({ success: true, data: message });
  }),

  getAll: asyncHandler(async (_req: Request, res: Response) => {
    const messages = await contactService.getAll();
    res.json({ success: true, data: messages });
  }),
};
