import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | " + SITE_CONFIG.name,
  description:
    "Led by Dr. Ekta A. Thakkar, Pet Clinic Ghatkopar provides comprehensive veterinary consultations, diagnostics, treatment, kidney care, and compassionate care for pets.",
  openGraph: {
    title: "About Pet Clinic, Ghatkopar | " + SITE_CONFIG.name,
    description:
      "Learn about our veterinary team, values, and commitment to compassionate pet care.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
