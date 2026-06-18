import { Request, Response } from "express";
import { chatService } from "../services/chatService";

export const chatController = {
  sendMessage: async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("[chatController] sendMessage hit");
      console.log("[chatController] Request body:", JSON.stringify({ message: req.body?.message?.substring(0, 100), hasHistory: !!req.body?.history, historyLength: req.body?.history?.length }));

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

      console.log("[chatController] Calling chatService.sendMessage");
      const response = await chatService.sendMessage(message.trim(), sanitizedHistory);
      console.log("[chatController] chatService responded successfully");

      res.json({
        success: true,
        data: {
          message: response,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error("[chatController] Unhandled error in sendMessage:", errMsg);

      // Never allow the chat endpoint to crash — always return 200 with fallback
      res.json({
        success: true,
        data: {
          message: "Our assistant is currently unavailable. Please call us at +91 98204 65733 for immediate assistance. We're available Mon-Sat, 10 AM - 8 PM.",
          timestamp: new Date().toISOString(),
        },
      });
    }
  },
};
