import apiClient from "@/lib/axios";
import type {
  ApiResponse,
  AppointmentFormData,
  ContactFormData,
  NewsletterFormData,
  Service,
  GalleryItem,
  Testimonial,
  FAQ,
  TimeSlot,
  Appointment,
  ChatMessage,
} from "@/types";

// Static Data
export const fetchServices = async (): Promise<Service[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<Service[]>>("/data/services");
    return data?.data ?? [];
  } catch {
    return [];
  }
};

export const fetchGallery = async (): Promise<GalleryItem[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<GalleryItem[]>>("/data/gallery");
    return data?.data ?? [];
  } catch {
    return [];
  }
};

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<Testimonial[]>>("/data/testimonials");
    return data?.data ?? [];
  } catch {
    return [];
  }
};

export const fetchStats = async (): Promise<Record<string, number>> => {
  try {
    const { data } = await apiClient.get<ApiResponse<Record<string, number>>>("/data/stats");
    return data?.data ?? {};
  } catch {
    return {};
  }
};

export const fetchFAQs = async (): Promise<FAQ[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<FAQ[]>>("/data/faqs");
    return data?.data ?? [];
  } catch {
    return [];
  }
};

// Appointments
export const createAppointment = async (formData: AppointmentFormData) => {
  const payload = {
    ...formData,
    phone: formData.phone,
  };
  const { data } = await apiClient.post("/appointments", payload);
  return data;
};

export const fetchSlots = async (date: string): Promise<TimeSlot[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<TimeSlot[]>>(`/appointments/slots?date=${date}`);
    return data?.data ?? [];
  } catch {
    return [];
  }
};

export const fetchAppointment = async (id: string): Promise<Appointment | null> => {
  try {
    const { data } = await apiClient.get<ApiResponse<Appointment>>(`/appointments/${id}`);
    return data?.data ?? null;
  } catch {
    return null;
  }
};

// Chat
export const sendChatMessage = async (
  message: string,
  history: ChatMessage[]
): Promise<string> => {
  try {
    const { data } = await apiClient.post<ApiResponse<{ message: string; timestamp: string }>>("/chat", {
      message,
      history: history.map((m) => ({ role: m.role, content: m.content })),
    });
    return data?.data?.message ?? "I'm sorry, I couldn't process that request. Please try again.";
  } catch {
    return "I'm having trouble connecting right now. Please try again or call us at +91 98204 65733.";
  }
};

// Contact
export const submitContact = async (formData: ContactFormData) => {
  const { data } = await apiClient.post("/contact", formData);
  return data;
};

// Newsletter
export const subscribeNewsletter = async (formData: NewsletterFormData) => {
  const { data } = await apiClient.post("/newsletter", formData);
  return data;
};

// Health Check
export const healthCheck = async (): Promise<boolean> => {
  try {
    const { data } = await apiClient.get("/health");
    return data?.success ?? false;
  } catch {
    return false;
  }
};
