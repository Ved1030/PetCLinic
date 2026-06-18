"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { fadeInUp, fadeInRight, staggerContainer } from "@/lib/animations";
import { CONTACT_INFO } from "@/lib/constants";
import GoogleMap from "@/components/contact/GoogleMap";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactDetails = [
    { icon: MapPin, label: "Address", value: CONTACT_INFO.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.address)}` },
    { icon: Phone, label: "Phone", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
    { icon: Clock, label: "Hours", value: `${CONTACT_INFO.hours.weekdays} | ${CONTACT_INFO.hours.sunday}` },
  ];

  return (
    <section ref={ref} id="contact" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#E9DDD0]/30 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#B98B5D]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-width relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-flex px-5 py-2 rounded-full bg-[#FAF7F2] border border-[#EFE7DD] text-[#B98B5D] text-sm font-semibold tracking-wide mb-5">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-[-0.02em] text-[#4A3A2A] mb-4 leading-[1.1]">
            Visit Our Clinic
          </h2>
          <p className="text-lg text-[#7B6A58] leading-relaxed">
            We&apos;d love to hear from you. Reach out to us or visit our clinic in Ghatkopar East.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20">
          {/* Left - Contact Details & Map */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                const content = (
                  <motion.div
                    key={detail.label}
                    variants={fadeInUp}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF7F2] border border-[#EFE7DD] hover:border-[#B98B5D]/50 hover:shadow-sm transition-all duration-300 h-full"
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#E9DDD0] to-[#F5EFE5] shadow-sm shrink-0">
                      <Icon className="w-5 h-5 text-[#B98B5D]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#B98B5D] uppercase tracking-[0.06em] mb-1">{detail.label}</p>
                      <p className="text-sm font-medium text-[#4A3A2A] leading-snug">{detail.value}</p>
                    </div>
                  </motion.div>
                );
                if (detail.href) {
                  return (
                    <a key={detail.label} href={detail.href} target={detail.href.startsWith("http") ? "_blank" : undefined} rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                      {content}
                    </a>
                  );
                }
                return content;
              })}
            </div>

            {/* Google Map */}
            <motion.div variants={fadeInUp}>
              <GoogleMap />
            </motion.div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInRight}
            className="bg-[#FAF7F2] border border-[#EFE7DD] rounded-3xl p-8 sm:p-10 shadow-luxury"
          >
            <h3 className="text-2xl font-display font-bold tracking-[-0.02em] text-[#4A3A2A] mb-2 leading-[1.15]">
              Send Us a Message
            </h3>
            <p className="text-sm text-[#7B6A58] leading-relaxed mb-8">
              Have a question or want to book an appointment? Fill out the form and we&apos;ll get back to you.
            </p>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
