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
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="relative overflow-hidden rounded-[2rem] p-8 sm:p-12 lg:p-16"
          style={{
            background: "linear-gradient(135deg, #4A3A2A 0%, #5C4935 30%, #6B5740 50%, #5C4935 70%, #4A3A2A 100%)",
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #B98B5D, transparent 70%)" }} />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #B98B5D, transparent 70%)" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #B98B5D, transparent 60%)" }} />
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          </div>

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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/appointment">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center h-14 px-10 text-lg font-display font-semibold text-white rounded-2xl shadow-xl transition-all duration-300 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #B98B5D 0%, #C99A6A 50%, #B98B5D 100%)",
                    boxShadow: "0 10px 30px rgba(185,139,93,0.35), 0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  Book an Appointment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </Link>
              <a href={`tel:${CONTACT_INFO.phone}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center h-14 px-10 text-lg font-display font-semibold rounded-2xl transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
