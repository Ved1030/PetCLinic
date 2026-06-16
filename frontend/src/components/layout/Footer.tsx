"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowUpRight, Star } from "lucide-react";
import { CONTACT_INFO, SOCIAL_LINKS, NAV_LINKS } from "@/lib/constants";

const footerLinks = [
  {
    title: "Quick Links",
    links: NAV_LINKS.map((l) => ({ label: l.label, href: l.href })),
  },
  {
    title: "Services",
    links: [
      { label: "Veterinary Consultations", href: "/services" },
      { label: "Pet Grooming", href: "/services#grooming" },
      { label: "Pet Boarding", href: "/services#boarding" },
      { label: "Ozone Therapy", href: "/services" },
      { label: "Acupuncture", href: "/services" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#4A3A2A] text-[#D8C9B3] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B98B5D]/50 to-transparent" />
      </div>

      <div className="max-width relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 py-12 sm:py-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center justify-center w-9 h-9 rounded-2xl bg-gradient-to-br from-[#B98B5D] to-[#B98B5D] shadow-lg shadow-[#B98B5D]/20">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="6" cy="6" r="2.5" />
                    <circle cx="18" cy="6" r="2.5" />
                    <circle cx="12" cy="14" r="4" />
                  </svg>
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-[17px] font-display font-bold text-white leading-none">
                  THE OZONE VETS
                </span>
                <span className="text-[10px] text-[#D8C9B3]/70 tracking-[0.18em] uppercase font-medium mt-0.5">
                  Dr. Komal
                </span>
              </div>
            </Link>
            <p className="text-sm text-[#D8C9B3]/80 leading-relaxed mb-6">
              Advanced veterinary care with compassion. Providing ozone therapy, acupuncture,
              pet grooming, boarding, and expert consultations for your beloved pets.
            </p>
            <div className="flex gap-3">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#B98B5D] flex items-center justify-center transition-all duration-300 group border border-white/5 hover:border-[#B98B5D]/30"
                  aria-label={platform}
                >
                  <span className="text-xs font-bold uppercase text-[#D8C9B3]/70 group-hover:text-white transition-colors">
                    {platform.charAt(0)}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-white font-display font-semibold mb-5">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#D8C9B3]/70 hover:text-[#B98B5D] transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-white font-display font-semibold mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-[#B98B5D] shrink-0" />
                <span className="text-sm text-[#D8C9B3]/80">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B98B5D] shrink-0" />
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-sm text-[#D8C9B3]/80 hover:text-[#B98B5D] transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B98B5D] shrink-0" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-[#D8C9B3]/80 hover:text-[#B98B5D] transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-[#B98B5D] shrink-0" />
                <div className="text-sm text-[#D8C9B3]/80">
                  <p>{CONTACT_INFO.hours.weekdays}</p>
                  <p>{CONTACT_INFO.hours.sunday}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Star className="w-4 h-4 text-[#B98B5D] shrink-0" />
                <div className="text-sm text-[#D8C9B3]/80">
                  <span className="font-semibold">{CONTACT_INFO.rating}★</span>
                  <span className="mx-1">·</span>
                  <span>{CONTACT_INFO.reviews} Reviews</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#D8C9B3]/60">
              &copy; {new Date().getFullYear()} THE OZONE VETS. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-[#D8C9B3]/60">
              <Link href="/" className="hover:text-[#B98B5D] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="hover:text-[#B98B5D] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
