"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Star } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { CONTACT_INFO } from "@/lib/constants";

const contactDetails = [
  { icon: MapPin, label: "Address", value: CONTACT_INFO.address },
  { icon: Phone, label: "Phone", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
  { icon: Mail, label: "Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: Clock, label: "Hours", value: (<div className="text-sm"><p>{CONTACT_INFO.hours.weekdays}</p><p>{CONTACT_INFO.hours.sunday}</p></div>) },
  { icon: Star, label: "Google Rating", value: `${CONTACT_INFO.rating}★ (${CONTACT_INFO.reviews})` },
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#FAF7F2] via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-display font-bold text-[#4A3A2A] mb-2">Contact Information</h2>
                <p className="text-[#7B6A58]">THE OZONE VETS — Reach out to us through any of these channels.</p>
              </motion.div>

              <div className="space-y-3">
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

              <motion.div variants={fadeInUp} className="mt-8">
                <div className="rounded-3xl overflow-hidden bg-[#F5EFE5] h-[250px] flex items-center justify-center border border-[#EFE7DD]">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-[#B98B5D] mx-auto mb-2" />
                    <p className="text-sm text-[#7B6A58]">Andheri West, Mumbai</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="sticky top-28 p-7 rounded-3xl bg-white border border-[#EFE7DD] shadow-luxury">
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
