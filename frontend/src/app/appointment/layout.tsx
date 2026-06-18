import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book Appointment | " + SITE_CONFIG.name,
  description:
    "Schedule an appointment with Dr. Ekta A. Thakkar at Pet Clinic Ghatkopar. Online booking for veterinary consultations, vaccinations, kidney care, and more.",
  openGraph: {
    title: "Book an Appointment | " + SITE_CONFIG.name,
    description:
      "Schedule your visit to Pet Clinic Ghatkopar for compassionate veterinary care.",
  },
};

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
