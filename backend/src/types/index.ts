export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Appointment {
  id: string;
  petName: string;
  petType: string;
  breed: string;
  ownerName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  reason?: string;
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

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  petName: string;
  petType: string;
  message: string;
  createdAt: string;
}

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
