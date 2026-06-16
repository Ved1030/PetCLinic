export const SITE_CONFIG = {
  name: "THE OZONE VETS",
  tagline: "Advanced Veterinary Care With Compassion",
  description:
    "THE OZONE VETS provides advanced diagnostics, consultations, ozone therapy, acupuncture, pet grooming, boarding, and compassionate veterinary care for pets across Mumbai.",
  url: "https://theozonevets.com",
  ogImage: "/images/og-image.jpg",
  keywords: [
    "veterinary clinic",
    "pet care",
    "animal hospital",
    "vet services",
    "pet grooming",
    "pet boarding",
    "ozone therapy",
    "acupuncture pets",
    "THE OZONE VETS",
    "Dr. Komal",
    "pet clinic mumbai",
    "advanced veterinary care",
    "Andheri West vet",
    "Lokhandwala pet clinic",
  ],
} as const;

export const CONTACT_INFO = {
  address: "C3 SARANGA, Lokhandwala Complex Market, Bungalow, 3rd Cross Road, Opp. Cliff Tower, Andheri West, Mumbai 400053",
  phone: "+91 98204 45010",
  email: "hello@theozonevets.com",
  rating: "4.5",
  reviews: "178+",
  hours: {
    weekdays: "Mon - Sat: 10:00 AM - 8:00 PM",
    sunday: "Sunday: Closed",
  },
} as const;

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/theozonevets",
  instagram: "https://instagram.com/theozonevets",
  twitter: "https://twitter.com/theozonevets",
  youtube: "https://youtube.com/theozonevets",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
] as const;
