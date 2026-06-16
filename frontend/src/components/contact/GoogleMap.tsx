"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

const MAP_EMBED_URL = "https://www.google.com/maps?q=C3+SARANGA+Lokhandwala+Complex+Market+BUNGLOW+3rd+Cross+Rd+opp.+Cliff+Tower+Andheri+West+Mumbai+400053&output=embed";
const DIRECTIONS_URL = "https://www.google.com/maps/search/?api=1&query=C3+SARANGA+Lokhandwala+Complex+Market+BUNGLOW+3rd+Cross+Rd+opp.+Cliff+Tower+Andheri+West+Mumbai+400053";

export default function GoogleMap() {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="relative overflow-hidden rounded-3xl shadow-luxury-lg bg-[#F5EFE5] border border-[#EFE7DD] group"
      style={{ borderRadius: "24px" }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5EFE5] z-10 gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#B98B5D]/10 animate-ping" />
            <MapPin className="w-8 h-8 text-[#B98B5D] relative z-10" />
          </div>
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-[#B98B5D] animate-spin" />
            <span className="text-sm text-[#7B6A58] font-medium">Loading map...</span>
          </div>
        </div>
      )}

      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={MAP_EMBED_URL}
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            border: 0,
            borderRadius: "24px",
          }}
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          onLoad={() => setLoaded(true)}
          title="THE OZONE VETS Clinic Location - Google Maps"
          aria-label="Interactive map showing THE OZONE VETS clinic location in Andheri West, Mumbai"
        />
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2 z-20">
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="default"
            size="sm"
            className="rounded-xl shadow-lg shadow-black/10 bg-white text-[#4A3A2A] hover:bg-[#FAF7F2] border border-[#EFE7DD] gap-2"
          >
            <Navigation className="w-4 h-4" />
            <span className="hidden sm:inline">Get Directions</span>
          </Button>
        </a>
      </div>

      <div className="absolute top-4 left-4 z-20">
        <div className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm border border-[#EFE7DD] flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#B98B5D]" />
          <span className="text-[11px] font-semibold text-[#4A3A2A] tracking-wide">
            THE OZONE VETS
          </span>
        </div>
      </div>
    </motion.div>
  );
}
