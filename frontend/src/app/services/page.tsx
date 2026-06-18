"use client";

import { motion } from "framer-motion";
import { Stethoscope, Microscope, ScanLine, Droplets, Activity, Scissors, Home, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  { icon: Stethoscope, title: "Veterinary Consultation", description: "Expert consultations and comprehensive health assessments by Dr. Ekta A. Thakkar for your beloved pets.", price: "Contact Us" },
  { icon: Shield, title: "Vaccination & Preventive Care", description: "Essential vaccinations and preventive healthcare to keep your pet protected from common diseases.", price: "Contact Us" },
  { icon: ScanLine, title: "Pet Diagnostics", description: "Advanced diagnostic services for accurate health assessment and early detection of conditions.", price: "Contact Us" },
  { icon: Droplets, title: "Kidney Care", description: "Specialized kidney care services including diagnosis, treatment, and management of renal conditions.", price: "Contact Us" },
  { icon: Activity, title: "Dialysis Support", description: "Advanced dialysis support for pets with kidney conditions requiring specialized treatment.", price: "Contact Us" },
  { icon: Heart, title: "Pet Health Checkups", description: "Comprehensive health checkups to ensure your pet stays healthy and thriving.", price: "Contact Us" },
  { icon: Stethoscope, title: "Medical Treatment", description: "Expert medical treatment for various pet health conditions and illnesses.", price: "Contact Us" },
  { icon: Shield, title: "Emergency Guidance", description: "Professional emergency guidance and support for urgent pet health concerns.", price: "Contact Us" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#FAF7F2] via-white to-white">
        <div className="max-width text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="inline-block px-5 py-2 rounded-full bg-white border border-[#EFE7DD] text-[#B98B5D] text-sm font-semibold tracking-wide mb-5">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-[-0.03em] text-[#4A3A2A] mb-6 leading-[1.1]">
              Comprehensive{" "}
              <span className="text-gradient-accent">
                Veterinary Care
              </span>
            </h1>
            <p className="text-lg text-[#7B6A58] max-w-2xl mx-auto leading-relaxed">
              From routine consultations to specialized therapies, we provide advanced veterinary
              care with compassion for your beloved pets.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-width">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} variants={fadeInUp}>
                  <div className="group h-full p-6 rounded-3xl bg-white border border-[#EFE7DD] hover:border-[#B98B5D]/40 hover:shadow-luxury transition-all duration-500">
                    <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-br from-[#E9DDD0] to-[#F5EFE5] text-[#B98B5D] mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-[#4A3A2A] mb-2">{service.title}</h3>
                    <p className="text-[#7B6A58] text-sm leading-relaxed">{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#FAF7F2] to-white">
        <div className="max-width text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-display font-bold tracking-[-0.02em] text-[#4A3A2A] mb-4">
              Need Help Choosing a Service?
            </h2>
            <p className="text-lg text-[#7B6A58] mb-8 max-w-2xl mx-auto">
              Contact us for a consultation. Dr. Ekta A. Thakkar will help determine the best care plan for your pet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline" size="xl" className="rounded-2xl w-full sm:w-auto">Contact Us</Button>
              </Link>
              <Link href="/appointment" className="w-full sm:w-auto">
                <Button variant="gradient" size="xl" className="rounded-2xl w-full sm:w-auto">
                  Book Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
