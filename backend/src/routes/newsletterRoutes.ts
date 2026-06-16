import { Router } from "express";
import { newsletterController } from "../controllers/newsletterController";
import { validate } from "../middlewares/validate";
import { newsletterSchema } from "../validators/appointment";

const router = Router();

router.post("/", validate(newsletterSchema), newsletterController.subscribe);

export default router;
