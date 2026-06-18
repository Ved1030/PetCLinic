export const SITE_CONFIG = {
  name: "Pet Clinic, Ghatkopar",
  tagline: "Compassionate Veterinary Care For Your Beloved Pets",
  description:
    "Led by Dr. Ekta A. Thakkar, Pet Clinic Ghatkopar provides comprehensive veterinary consultations, diagnostics, treatment, kidney care, dialysis support, preventive healthcare, and compassionate care for pets across Mumbai.",
  url: "https://petclinicghatkopar.com",
  ogImage: "/images/logo.png",
  keywords: [
    "veterinary clinic",
    "pet care",
    "animal hospital",
    "vet services",
    "pet clinic",
    "kidney care",
    "dialysis support",
    "Pet Clinic Ghatkopar",
    "Dr. Ekta A. Thakkar",
    "pet clinic mumbai",
    "veterinary care",
    "Ghatkopar East vet",
    "Pant Nagar pet clinic",
  ],
} as const;

export const CONTACT_INFO = {
  address: "Shop No. 4 & 5, Indrayani CHS, General Arun Kumar Vaidya Udyan, Shri Dattaguru Mandir Marg, Opp. ARUN, Pant Nagar, Ghatkopar East, Mumbai, Maharashtra 400077",
  phone: "+91 98204 65733",
  email: "info@petclinicghatkopar.com",
  rating: "4.1",
  reviews: "142+",
  hours: {
    weekdays: "Mon - Sat: 10:00 AM - 8:00 PM",
    sunday: "Sunday: Closed",
  },
} as const;

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/petclinicghatkopar",
  instagram: "https://instagram.com/petclinicghatkopar",
  twitter: "https://twitter.com/petclinicghatkopar",
  youtube: "https://youtube.com/petclinicghatkopar",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
] as const;
