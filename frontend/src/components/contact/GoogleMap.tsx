"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Phone, Clock } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

const CLINIC_ADDRESS = {
  line1: "C3 SARANGA, Lokhandwala Complex Market",
  line2: "BUNGLOW, 3rd Cross Rd, Opp. Cliff Tower",
  line3: "Swami Samarth Nagar, Lokhandwala Complex",
  line4: "Andheri West, Mumbai 400053",
};

const FULL_ADDRESS = [
  "C3 SARANGA, Lokhandwala Complex Market",
  "BUNGLOW, 3rd Cross Rd, Opp. Cliff Tower",
  "Swami Samarth Nagar, Lokhandwala Complex",
  "Andheri West, Mumbai",
  "Maharashtra 400053",
].join(", ");

const MAPS_URL = `https://maps.google.com/?q=${encodeURIComponent(FULL_ADDRESS)}`;

export default function GoogleMap() {
  return (
    <motion.div
      variants={fadeInUp}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FAF7F2] via-white to-[#F5EFE5] border border-[#EFE7DD] shadow-luxury-lg group"
      style={{ borderRadius: "24px" }}
    >
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-[#B98B5D]/10 via-[#A67A4A]/5 to-transparent pointer-events-none" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, #B98B5D 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }} />

      <div className="relative p-6 sm:p-8">
        {/* Header with icon */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B98B5D] to-[#A67A4A] flex items-center justify-center shadow-lg shadow-[#B98B5D]/20 shrink-0">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-[#4A3A2A]">
              THE OZONE VETS
            </h3>
            <p className="text-xs text-[#7B6A58] font-medium tracking-wide uppercase mt-0.5">
              Premium Veterinary Clinic
            </p>
          </div>
        </div>

        {/* Address card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-[#EFE7DD] p-5 mb-5 space-y-1.5">
          <p className="text-sm font-medium text-[#4A3A2A] leading-relaxed">
            {CLINIC_ADDRESS.line1}
          </p>
          <p className="text-sm text-[#7B6A58] leading-relaxed">
            {CLINIC_ADDRESS.line2}
          </p>
          <p className="text-sm text-[#7B6A58] leading-relaxed">
            {CLINIC_ADDRESS.line3}
          </p>
          <p className="text-sm text-[#7B6A58] leading-relaxed">
            {CLINIC_ADDRESS.line4}
          </p>
        </div>

        {/* Quick info row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EFE7DD] flex-1">
            <Phone className="w-4 h-4 text-[#B98B5D] shrink-0" />
            <span className="text-sm text-[#4A3A2A] font-medium">+91 98204 45010</span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EFE7DD] flex-1">
            <Clock className="w-4 h-4 text-[#B98B5D] shrink-0" />
            <span className="text-sm text-[#4A3A2A] font-medium">Mon–Sat, 10AM–8PM</span>
          </div>
        </div>

        {/* CTA */}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button
            size="lg"
            className="w-full rounded-2xl bg-gradient-to-r from-[#B98B5D] to-[#A67A4A] text-white font-semibold shadow-lg shadow-[#B98B5D]/25 hover:shadow-[#B98B5D]/40 hover:from-[#A67A4A] hover:to-[#8A633D] transition-all duration-300 h-12"
          >
            <Navigation className="w-5 h-5 mr-2" />
            Get Directions
          </Button>
        </a>

        {/* Hint */}
        <p className="text-[11px] text-[#B98B5D]/60 text-center mt-3">
          Opens in Google Maps
        </p>
      </div>
    </motion.div>
  );
}
