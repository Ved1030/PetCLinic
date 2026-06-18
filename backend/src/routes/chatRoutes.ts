import { Router, Request, Response } from "express";
import { chatController } from "../controllers/chatController";
import { validate } from "../middlewares/validate";
import { chatMessageSchema } from "../validators/chat";

const router = Router();

// Health test endpoint — verify chat route is reachable
router.get("/test", (_req: Request, res: Response) => {
  console.log("[chatRoutes] GET /api/chat/test hit");
  res.json({
    success: true,
    message: "Chat service reachable",
    timestamp: new Date().toISOString(),
  });
});

// Main chat endpoint
router.post("/", (req: Request, res: Response, next) => {
  console.log("[chatRoutes] POST /api/chat hit");
  console.log("[chatRoutes] Request body keys:", Object.keys(req.body));
  next();
}, validate(chatMessageSchema), chatController.sendMessage);

export default router;
