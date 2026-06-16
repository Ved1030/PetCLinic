import { Router } from "express";
import { staticDataController } from "../controllers/staticDataController";

const router = Router();

router.get("/services", staticDataController.getServices);
router.get("/gallery", staticDataController.getGallery);
router.get("/testimonials", staticDataController.getTestimonials);
router.get("/stats", staticDataController.getStats);
router.get("/faqs", staticDataController.getFAQs);

export default router;
