import { Router } from "express";
import { appointmentController } from "../controllers/appointmentController";
import { validate } from "../middlewares/validate";
import { createBookingSchema, updateAppointmentStatusSchema, updateAppointmentSchema } from "../validators/appointment";

const router = Router();

router.get("/", appointmentController.getAll);
router.get("/slots", appointmentController.getSlots);
router.get("/:id", appointmentController.getById);
router.post("/", validate(createBookingSchema), appointmentController.create);
router.put("/:id/status", validate(updateAppointmentStatusSchema), appointmentController.updateStatus);
router.put("/:id", validate(updateAppointmentSchema), appointmentController.update);
router.delete("/:id", appointmentController.delete);

export default router;
