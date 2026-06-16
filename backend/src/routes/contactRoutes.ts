import { Router } from "express";
import { contactController } from "../controllers/contactController";
import { validate } from "../middlewares/validate";
import { contactMessageSchema } from "../validators/appointment";

const router = Router();

router.get("/", contactController.getAll);
router.post("/", validate(contactMessageSchema), contactController.create);

export default router;
