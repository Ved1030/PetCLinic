import { Request, Response } from "express";
import { staticDataService } from "../services/staticDataService";
import { asyncHandler } from "../utils/asyncHandler";

export const staticDataController = {
  getServices: asyncHandler(async (_req: Request, res: Response) => {
    const services = await staticDataService.getServices();
    res.json({ success: true, data: services });
  }),

  getGallery: asyncHandler(async (_req: Request, res: Response) => {
    const gallery = await staticDataService.getGallery();
    res.json({ success: true, data: gallery });
  }),

  getTestimonials: asyncHandler(async (_req: Request, res: Response) => {
    const testimonials = await staticDataService.getTestimonials();
    res.json({ success: true, data: testimonials });
  }),

  getStats: asyncHandler(async (_req: Request, res: Response) => {
    const stats = await staticDataService.getStats();
    res.json({ success: true, data: stats });
  }),

  getFAQs: asyncHandler(async (_req: Request, res: Response) => {
    const faqs = await staticDataService.getFAQs();
    res.json({ success: true, data: faqs });
  }),
};
