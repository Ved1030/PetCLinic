import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | " + SITE_CONFIG.name,
  description:
    "Get in touch with Pet Clinic Ghatkopar. Visit us at Pant Nagar, Ghatkopar East, Mumbai or call +91 98204 65733 for appointments and inquiries.",
  openGraph: {
    title: "Contact Pet Clinic, Ghatkopar | " + SITE_CONFIG.name,
    description:
      "Reach out to Pet Clinic Ghatkopar for veterinary care appointments and inquiries.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
