import { z } from "zod";

export const chatMessageSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message must be under 2000 characters"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .max(20)
    .optional(),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
