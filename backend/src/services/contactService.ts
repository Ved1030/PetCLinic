import { ContactMessage } from "../types";

const messages: ContactMessage[] = [];

export const contactService = {
  async getAll(): Promise<ContactMessage[]> {
    return messages.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async create(data: Omit<ContactMessage, "id" | "createdAt">): Promise<ContactMessage> {
    const message: ContactMessage = {
      ...data,
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    messages.push(message);
    return message;
  },
};
