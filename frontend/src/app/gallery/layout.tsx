import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gallery | " + SITE_CONFIG.name,
  description:
    "View our premium veterinary facilities and happy pets at Pet Clinic Ghatkopar. See the care and comfort we provide to every pet.",
  openGraph: {
    title: "Gallery | " + SITE_CONFIG.name,
    description:
      "Explore our veterinary clinic facilities and see happy pets at Pet Clinic Ghatkopar.",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
