"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Award, Stethoscope, Star } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const stats = [
  { icon: Award, value: "178+", label: "Google Reviews" },
  { icon: Star, value: "4.5★", label: "Clinic Rating" },
  { icon: Heart, value: "1000+", label: "Happy Pets" },
  { icon: Stethoscope, value: "Advanced", label: "Veterinary Care" },
];

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden bg-gradient-to-r from-[#4A3A2A] via-[#5A4A38] to-[#4A3A2A]"
    >
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #B98B5D 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-[#B98B5D]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-[#B98B5D]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-width relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="inline-flex p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm mb-4 border border-white/5">
                  <Icon className="w-6 h-6 text-[#B98B5D]" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-[#D8C9B3]/70">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
