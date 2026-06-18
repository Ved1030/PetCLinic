import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Services | " + SITE_CONFIG.name,
  description:
    "Comprehensive veterinary services including consultations, vaccinations, diagnostics, kidney care, dialysis support, and emergency guidance at Pet Clinic Ghatkopar.",
  openGraph: {
    title: "Veterinary Services | " + SITE_CONFIG.name,
    description:
      "Explore our full range of veterinary services for your beloved pets.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
