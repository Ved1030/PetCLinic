import { Router } from "express";
import { chatController } from "../controllers/chatController";
import { validate } from "../middlewares/validate";
import { chatMessageSchema } from "../validators/chat";

const router = Router();

router.post("/", validate(chatMessageSchema), chatController.sendMessage);

export default router;
