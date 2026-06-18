"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Shield, Stethoscope } from "lucide-react";
import AppointmentFlow from "@/components/forms/AppointmentFlow";
import { fadeInUp, staggerContainer } from "@/lib/animations";



const benefits = [
  { icon: Calendar, title: "Easy Scheduling", description: "Book your appointment online or by phone in minutes." },
  { icon: Clock, title: "Minimal Wait Times", description: "We respect your time and keep appointments on schedule." },
  { icon: Shield, title: "Expert Care", description: "Dr. Ekta A. Thakkar provides compassionate veterinary care." },
  { icon: Stethoscope, title: "Quality Facility", description: "Modern equipment and dedicated care for your pets." },
];

export default function AppointmentPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#FAF7F2] via-white to-white">
        <div className="max-width text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="inline-block px-5 py-2 rounded-full bg-white border border-[#EFE7DD] text-[#B98B5D] text-sm font-semibold tracking-wide mb-5">
              Book an Appointment
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-[-0.03em] text-[#4A3A2A] mb-6 leading-[1.1]">
              Schedule Your{" "}
              <span className="text-gradient-accent">
                Visit
              </span>
            </h1>
            <p className="text-lg text-[#7B6A58] max-w-2xl mx-auto leading-relaxed">
              Ready to give your pet the premium care they deserve? Fill out the form below or call us
              at +91 98204 65733 to book an appointment.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-width">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <div className="lg:col-span-2">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <div className="p-7 rounded-3xl bg-white border border-[#EFE7DD] shadow-luxury">
                  <AppointmentFlow />
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
                <motion.div variants={fadeInUp}>
                  <h3 className="text-lg font-display font-semibold text-[#4A3A2A] mb-4">Why Choose Pet Clinic, Ghatkopar?</h3>
                </motion.div>
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div key={benefit.title} variants={fadeInUp}>
                      <div className="p-4 rounded-2xl bg-white border border-[#EFE7DD] hover:border-[#B98B5D]/40 hover:shadow-luxury transition-all duration-300 flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-[#FAF7F2] text-[#B98B5D] shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm text-[#4A3A2A]">{benefit.title}</p>
                          <p className="text-xs text-[#7B6A58] mt-0.5 leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
