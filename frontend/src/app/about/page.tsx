"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Shield, Award, Users, Stethoscope } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "Every pet receives gentle, loving attention and advanced medical treatment with genuine compassion.",
  },
  {
    icon: Shield,
    title: "Advanced Diagnostics",
    description: "State-of-the-art diagnostic equipment including digital X-rays, blood testing, and ozone therapy.",
  },
  {
    icon: Award,
    title: "Expert Experience",
    description: "Dr. Komal brings years of dedicated veterinary practice and specialized training to every consultation.",
  },
  {
    icon: Users,
    title: "Patient-Centered",
    description: "We treat every pet and their family with respect, transparency, and premium quality care.",
  },
];

const teamMembers = [
  { name: "Dr. Komal", role: "Veterinary Physician", description: "Experienced veterinary physician dedicated to providing compassionate and advanced care for pets, specializing in ozone therapy, acupuncture, and comprehensive veterinary medicine." },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#FAF7F2] via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-white border border-[#EFE7DD] text-[#B98B5D] text-sm font-semibold tracking-wide mb-5">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-[-0.03em] text-[#4A3A2A] mb-6 leading-[1.1]">
              About{" "}
              <span className="text-gradient-accent">
                THE OZONE VETS
              </span>
            </h1>
            <p className="text-lg text-[#7B6A58] leading-relaxed max-w-2xl mx-auto">
              THE OZONE VETS is a premium veterinary practice led by Dr. Komal.
              We specialize in advanced diagnostics, ozone therapy, acupuncture, pet grooming,
              boarding, and compassionate veterinary care for pets across Mumbai.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div key={value.title} variants={fadeInUp}>
                  <div className="h-full text-center p-8 rounded-3xl bg-white border border-[#EFE7DD] hover:border-[#B98B5D]/40 hover:shadow-luxury transition-all duration-500 group">
                    <div className="inline-flex p-4 rounded-2xl bg-[#FAF7F2] text-[#B98B5D] mb-5 group-hover:scale-110 group-hover:bg-[#E9DDD0]/50 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-[#4A3A2A] mb-2">{value.title}</h3>
                    <p className="text-sm text-[#7B6A58] leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#FAF7F2] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-display font-bold tracking-[-0.02em] text-[#4A3A2A] mb-4">
              Meet Our Doctor
            </h2>
            <p className="text-lg text-[#7B6A58]">
              Dedicated professional committed to your pet&apos;s health and wellbeing.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            {teamMembers.map((member) => (
              <motion.div key={member.name} variants={fadeInUp}>
                <div className="text-center rounded-3xl bg-white border border-[#EFE7DD] hover:border-[#B98B5D]/40 hover:shadow-luxury transition-all duration-500 group overflow-hidden">
                  <div className="relative w-full aspect-[3/4] bg-[#F5EFE5]">
                    <Image
                      src="https://images.pexels.com/photos/6235664/pexels-photo-6235664.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=2"
                      alt="Professional veterinarian Dr. Komal"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      sizes="400px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A2A]/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold text-[#4A3A2A]">{member.name}</h3>
                    <p className="text-sm text-[#B98B5D] font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-[#7B6A58] leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-display font-bold tracking-[-0.02em] text-[#4A3A2A] mb-4">
              Schedule a Visit
            </h2>
            <p className="text-lg text-[#7B6A58] mb-8 max-w-2xl mx-auto">
              Experience THE OZONE VETS difference. Book an appointment with Dr. Komal today.
            </p>
            <Link href="/appointment">
              <Button variant="gradient" size="xl" className="rounded-2xl">
                Book an Appointment
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
