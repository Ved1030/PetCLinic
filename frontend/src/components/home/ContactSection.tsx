"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Clock, Mail, Navigation } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const DIRECTIONS_URL = "https://www.google.com/maps/search/?api=1&query=Shop+No.+4+%26+5+Indrayani+CHS+General+ArunKumar+Vaidya+Udyan+Pant+Nagar+Ghatkopar+East+Mumbai+400077";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section ref={ref} id="contact" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#E9DDD0]/30 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#C1915B]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-width relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex px-5 py-2 rounded-full bg-[#F8F5F1] border border-[rgba(190,150,100,0.15)] text-[#C1915B] text-sm font-semibold tracking-wide mb-5">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-[-0.02em] text-[#3A2C22] mb-4 leading-[1.1]">
            Visit Our Clinic
          </h2>
          <p className="text-lg text-[#7B6A58] leading-relaxed">
            We&apos;d love to hear from you. Reach out to us or visit our premium facility in Ghatkopar East.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Left Column: Clinic Detail */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex"
          >
            {/* Clinic Detail Card */}
            <motion.div
              variants={cardVariants}
              className="flex-1 rounded-[24px] bg-[#F8F5F1] border border-[rgba(190,150,100,0.15)] overflow-hidden flex flex-col"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}
            >
              {/* Clinic Header */}
              <div className="flex items-center gap-3 px-6 pt-6 pb-0">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(193,145,91,0.12)" }}
                >
                  <MapPin className="w-5 h-5 text-[#C1915B]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3A2C22] leading-tight">The Pet Clinic</h3>
                  <p className="text-[11px] uppercase tracking-[1.5px] text-[#C1915B] font-semibold">Premium Veterinary Clinic</p>
                </div>
              </div>

              {/* Address Box */}
              <div className="mx-6 mt-5 p-5 bg-white rounded-[16px] border border-[rgba(190,150,100,0.1)]">
                <p className="text-[14px] font-medium text-[#3A2C22] leading-relaxed">Shop No. 4 & 5, Indrayani CHS</p>
                <p className="text-[14px] text-[#7B6A58] leading-relaxed">General ArunKumar Vaidya Udyan</p>
                <p className="text-[14px] text-[#7B6A58] leading-relaxed">Shri Dattaguru Mandir Marg, opp. ARUN</p>
                <p className="text-[14px] text-[#7B6A58] leading-relaxed">Pant Nagar, Ghatkopar East, Mumbai 400077</p>
              </div>

              {/* Phone & Hours Pills */}
              <div className="flex items-center gap-3 px-6 mt-5 flex-wrap">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-[rgba(190,150,100,0.1)]">
                  <Phone className="w-4 h-4 text-[#C1915B]" />
                  <span className="text-[13px] font-medium text-[#3A2C22]">09820465733</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-[rgba(190,150,100,0.1)]">
                  <Clock className="w-4 h-4 text-[#C1915B]" />
                  <span className="text-[13px] font-medium text-[#3A2C22]">Mon - Sat, 10AM - 8PM</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-[rgba(190,150,100,0.1)]">
                  <Mail className="w-4 h-4 text-[#C1915B]" />
                  <span className="text-[13px] font-medium text-[#3A2C22]">info@petclinicghatkopar.com</span>
                </div>
              </div>

              <div className="flex-1" />

              {/* Map Image */}
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-6 mt-4 block rounded-[16px] overflow-hidden border border-[rgba(190,150,100,0.1)] group"
              >
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent("Shop No. 4 & 5, Indrayani CHS, General ArunKumar Vaidya Udyan, Shri Dattaguru Mandir Marg, opp. ARUN, Pant Nagar, Ghatkopar East, Mumbai 400077")}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="180"
                  style={{ border: 0, pointerEvents: "none" }}
                  loading="lazy"
                  title="Clinic Location"
                />
              </a>

              {/* Get Directions Button */}
              <div className="px-6 mt-5 pb-6">
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C1915B] to-[#A67A4A] text-white font-semibold text-[15px] shadow-lg shadow-[#C1915B]/25 hover:shadow-[#C1915B]/40 hover:from-[#A67A4A] hover:to-[#8A633D] transition-all duration-300"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
                <p className="text-center text-[12px] text-[#C1915B] mt-2.5">Opens in Google Maps</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Send Us a Message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex"
          >
            <div className="flex-1 rounded-[24px] bg-[#F8F5F1] border border-[rgba(190,150,100,0.15)] p-8" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
              <h3 className="text-2xl font-display font-bold text-[#3A2C22] mb-2">Send Us a Message</h3>
              <p className="text-[#7B6A58] text-[15px] mb-7">
                Have a question or want to book an appointment? Fill out the form and we&apos;ll get back to you.
              </p>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
