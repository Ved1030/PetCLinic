"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import GoogleMap from "@/components/contact/GoogleMap";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { CONTACT_INFO } from "@/lib/constants";

const DIRECTIONS_URL = "https://www.google.com/maps/search/?api=1&query=C3+SARANGA+Lokhandwala+Complex+Market+BUNGLOW+3rd+Cross+Rd+opp.+Cliff+Tower+Andheri+West+Mumbai+400053";

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: (
      <div className="text-sm leading-relaxed">
        <p className="font-semibold text-[#4A3A2A]">C3 SARANGA, Lokhandwala Complex Market</p>
        <p className="text-[#7B6A58]">Bungalow, 3rd Cross Rd, Opp. Cliff Tower</p>
        <p className="text-[#7B6A58]">Swami Samarth Nagar, Lokhandwala Complex</p>
        <p className="text-[#7B6A58]">Andheri West, Mumbai 400053</p>
      </div>
    ),
  },
  { icon: Phone, label: "Phone", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
  { icon: Mail, label: "Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  {
    icon: Clock,
    label: "Hours",
    value: (
      <div className="text-sm">
        <p className="text-[#4A3A2A] font-medium">Monday – Saturday</p>
        <p className="text-[#7B6A58]">10:00 AM – 8:00 PM</p>
        <p className="text-[#7B6A58] mt-1">Sunday: Closed</p>
      </div>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#FAF7F2] via-white to-white">
        <div className="max-width text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="inline-block px-5 py-2 rounded-full bg-white border border-[#EFE7DD] text-[#B98B5D] text-sm font-semibold tracking-wide mb-5">
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-[-0.03em] text-[#4A3A2A] mb-6 leading-[1.1]">
              Get in{" "}
              <span className="text-gradient-accent">
                Touch
              </span>
            </h1>
            <p className="text-lg text-[#7B6A58] max-w-2xl mx-auto leading-relaxed">
              Have a question? We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
              <div>
                <motion.div variants={fadeInUp}>
                  <h2 className="text-2xl font-display font-bold text-[#4A3A2A] mb-2">Contact Information</h2>
                  <p className="text-[#7B6A58]">THE OZONE VETS — Reach out to us through any of these channels.</p>
                </motion.div>

                <div className="space-y-3 mt-6">
                  {contactDetails.map((detail) => {
                    const Icon = detail.icon;
                    return (
                      <motion.div key={detail.label} variants={fadeInUp}>
                        <div className="p-5 rounded-2xl bg-white border border-[#EFE7DD] hover:border-[#B98B5D]/40 hover:shadow-luxury transition-all duration-300 flex items-start gap-4">
                          <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#B98B5D] shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[13px] text-[#7B6A58] mb-0.5 font-medium">{detail.label}</p>
                            {detail.href ? (
                              <a href={detail.href} className="text-[#4A3A2A] font-medium hover:text-[#B98B5D] transition-colors">{detail.value}</a>
                            ) : (
                              <div className="text-[#4A3A2A] font-medium">{detail.value}</div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <motion.div variants={fadeInUp}>
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#B98B5D] to-[#A67A4A] text-white font-semibold shadow-lg shadow-[#B98B5D]/25 hover:shadow-[#B98B5D]/40 hover:from-[#A67A4A] hover:to-[#8A633D] transition-all duration-300 justify-center w-full sm:w-auto"
                >
                  <Navigation className="w-5 h-5 shrink-0" />
                  Get Directions
                </a>
              </motion.div>

              <motion.div variants={fadeInUp} className="lg:hidden">
                <GoogleMap />
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-8">
              <div className="hidden lg:block">
                <GoogleMap />
              </div>

              <div className="p-7 rounded-3xl bg-white border border-[#EFE7DD] shadow-luxury">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-[#FAF7F2]">
                    <Mail className="w-5 h-5 text-[#B98B5D]" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[#4A3A2A]">Send us a Message</h3>
                    <p className="text-[13px] text-[#7B6A58]">We typically reply within 24 hours</p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
