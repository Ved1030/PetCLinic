"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { CONTACT_INFO } from "@/lib/constants";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-width">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="relative overflow-hidden rounded-[2rem] p-8 sm:p-12 lg:p-16"
          style={{
            background: "linear-gradient(165deg, #2D2218 0%, #4A3A2A 15%, #5C4935 30%, #7A6548 45%, #8A633D 52%, #7A6548 60%, #5C4935 75%, #4A3A2A 88%, #2D2218 100%)",
          }}
        >
          {/* Warm ambient backlight */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 45% at 50% 35%, rgba(185,139,93,0.35) 0%, rgba(138,99,61,0.15) 40%, transparent 65%)" }} />

          {/* Vignette overlay */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 50%, rgba(45,34,24,0.3) 100%)" }} />

          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, #C99A6A, transparent 70%)" }} />
            <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #B98B5D, transparent 70%)" }} />
            <div className="absolute top-1/3 -left-24 w-80 h-80 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #D8C9B3, transparent 70%)" }} />
            <div className="absolute bottom-1/3 -right-24 w-[350px] h-[350px] rounded-full opacity-[0.08] blur-3xl" style={{ background: "radial-gradient(circle, #FAF7F2, transparent 70%)" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06] blur-3xl" style={{ background: "radial-gradient(circle, #D8C9B3, transparent 60%)" }} />
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px 256px" }} />
          </div>

          {/* Glass edge highlights */}
          <div className="absolute inset-0 rounded-[2rem] pointer-events-none" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.06)" }} />
          <div className="absolute top-0 left-[15%] right-[15%] h-[1px] opacity-25" style={{ background: "linear-gradient(90deg, transparent, rgba(216,201,179,0.6), transparent)" }} />
          <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] opacity-15" style={{ background: "linear-gradient(90deg, transparent, rgba(216,201,179,0.4), transparent)" }} />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="inline-flex p-3.5 rounded-2xl mb-6 border border-white/10" style={{ backgroundColor: "rgba(185,139,93,0.15)" }}>
              <Calendar className="w-6 h-6 text-[#B98B5D]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4 leading-[1.1]">
              Give Your Pet the Premium Care They Deserve
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: "rgba(216,201,179,0.7)" }}>
              Schedule an appointment with Dr. Komal and experience compassionate,
              expert veterinary care at our luxury facility.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
              <Link href="/appointment" className="w-full sm:w-auto">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center w-full sm:w-auto h-14 px-8 sm:px-10 text-base sm:text-lg font-display font-semibold text-white rounded-2xl shadow-xl transition-all duration-300 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #B98B5D 0%, #C99A6A 50%, #B98B5D 100%)",
                    boxShadow: "0 10px 30px rgba(185,139,93,0.35), 0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  Book an Appointment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.span>
              </Link>
              <a href={`tel:${CONTACT_INFO.phone}`} className="w-full sm:w-auto">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center w-full sm:w-auto h-14 px-8 sm:px-10 text-base sm:text-lg font-display font-semibold rounded-2xl transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </motion.span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
