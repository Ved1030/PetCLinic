import { Request, Response } from "express";
import { chatService } from "../services/chatService";
import { asyncHandler } from "../utils/asyncHandler";

export const chatController = {
  sendMessage: asyncHandler(async (req: Request, res: Response) => {
    const { message, history } = req.body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      res.status(400).json({ success: false, message: "Message is required" });
      return;
    }

    const sanitizedHistory = Array.isArray(history)
      ? history.filter(
          (m: unknown) =>
            typeof m === "object" &&
            m !== null &&
            "role" in m &&
            "content" in m &&
            typeof (m as { role: unknown }).role === "string" &&
            typeof (m as { content: unknown }).content === "string"
        ).slice(-20)
      : [];

    const response = await chatService.sendMessage(message.trim(), sanitizedHistory);

    res.json({
      success: true,
      data: {
        message: response,
        timestamp: new Date().toISOString(),
      },
    });
  }),
};
