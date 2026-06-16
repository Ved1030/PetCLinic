export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  before?: string;
  after?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  petName: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface AppointmentFormData {
  petName: string;
  petType?: string;
  breed?: string;
  ownerName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  reason?: string;
}

export interface Appointment extends AppointmentFormData {
  id: string;
  status: "available" | "booked" | "cancelled" | "completed" | "no_show";
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  time: string;
  display: string;
  status: "available" | "booked" | "unavailable" | "past";
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  petName: string;
  petType: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  meta?: {
    emailSent?: boolean;
    emailError?: string | null;
  };
}
