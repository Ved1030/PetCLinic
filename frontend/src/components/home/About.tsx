"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Shield, Heart, Stethoscope, Scissors, Home, Users, Award, Star } from "lucide-react";
import { fadeInUp, fadeInLeft, staggerContainer } from "@/lib/animations";

const stats = [
  { icon: Star, value: "178+", label: "Google Reviews" },
  { icon: Award, value: "4.5★", label: "Clinic Rating" },
  { icon: Heart, value: "1000+", label: "Happy Pets" },
  { icon: Shield, value: "Advanced", label: "Pet Healthcare" },
];

const highlights = [
  { icon: Stethoscope, text: "Advanced Diagnostics" },
  { icon: Shield, text: "Ozone Therapy" },
  { icon: Scissors, text: "Pet Grooming" },
  { icon: Home, text: "Pet Boarding" },
  { icon: Heart, text: "Compassionate Care" },
  { icon: Users, text: "Experienced Veterinary Team" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="relative py-20 lg:py-28 bg-[#FAF7F2] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#E9DDD0]/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#B98B5D]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-width relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left - Image */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInLeft}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-luxury-lg">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="https://images.pexels.com/photos/6235231/pexels-photo-6235231.jpeg"
                  alt="Dr. Komal and team providing advanced veterinary care at THE OZONE VETS"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A2A]/40 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-white/90 backdrop-blur-xl border border-[#EFE7DD] rounded-2xl shadow-luxury p-4 lg:p-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-[#B98B5D] to-[#8A633D] shadow-md">
                  <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm lg:text-base font-display font-bold text-[#4A3A2A] leading-tight">1000+</p>
                  <p className="text-[11px] lg:text-xs text-[#7B6A58] font-medium">Happy Pets Treated</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex px-5 py-2 rounded-full bg-white border border-[#EFE7DD] text-[#B98B5D] text-sm font-semibold tracking-wide mb-5">
                About THE OZONE VETS
              </span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-display font-bold tracking-[-0.02em] text-[#4A3A2A] mb-5 leading-[1.1]">
              Advanced Veterinary Care With Compassion
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-base lg:text-lg text-[#7B6A58] leading-relaxed mb-8 max-w-xl">
              THE OZONE VETS is a modern veterinary clinic in Andheri West led by Dr. Komal. We combine advanced diagnostics, specialized therapies, preventive healthcare, and compassionate treatment to provide exceptional care for pets and peace of mind for their families.
            </motion.p>

            {/* Statistics */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl border border-[#EFE7DD] p-4 text-center shadow-sm hover:shadow-luxury transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#E9DDD0] to-[#F5EFE5] mb-2.5">
                    <stat.icon className="w-4 h-4 text-[#B98B5D]" />
                  </div>
                  <p className="text-lg font-display font-bold text-[#4A3A2A] leading-none mb-0.5">{stat.value}</p>
                  <p className="text-[11px] text-[#7B6A58] font-medium leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Highlights */}
            <motion.div variants={fadeInUp}>
              <p className="text-sm font-semibold text-[#4A3A2A] uppercase tracking-[0.08em] mb-4">
                What We Offer
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {highlights.map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white border border-[#EFE7DD] hover:border-[#B98B5D]/50 hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#E9DDD0] to-[#F5EFE5] shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-[#B98B5D]" />
                    </div>
                    <span className="text-[13px] font-medium text-[#7B6A58] leading-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
