import { z } from "zod";

export const createAppointmentSchema = z.object({
  petName: z.string().min(1, "Pet name is required").max(100),
  petType: z.string().min(1, "Pet type is required").max(50),
  breed: z.string().min(1, "Breed is required").max(100),
  ownerName: z.string().min(1, "Owner name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  service: z.string().min(1, "Service is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
  reason: z.string().max(1000).optional(),
});

export const createBookingSchema = z.object({
  petName: z.string().min(1, "Pet name is required").max(100),
  petType: z.string().min(1, "Pet type is required").max(50),
  breed: z.string().min(1, "Breed is required").max(100),
  ownerName: z.string().min(1, "Owner name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  service: z.string().min(1, "Service is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
  reason: z.string().max(1000).optional(),
});

export const contactMessageSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  petName: z.string().min(1, "Pet name is required").max(100),
  petType: z.string().min(1, "Pet type is required").max(50),
  message: z.string().min(1, "Message is required").max(2000),
});

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(["available", "booked", "cancelled", "completed", "no_show"]),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type UpdateAppointmentStatusInput = z.infer<typeof updateAppointmentStatusSchema>;
