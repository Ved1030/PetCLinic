import { Router } from "express";
import { testEmailController } from "../controllers/testEmailController";

const router = Router();

router.post("/", testEmailController.sendTest);
router.get("/verify", testEmailController.verifyConnection);

export default router;
