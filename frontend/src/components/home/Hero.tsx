"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Phone, Star, Heart, Award } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

const STATS = [
  { icon: Star, value: "142+", label: "Google Reviews" },
  { icon: Award, value: "4.1\u2605", label: "Clinic Rating" },
  { icon: Heart, value: "1000+", label: "Happy Pets" },
];

const gradientForStat = (label: string) =>
  label === "Happy Pets" ? "from-[#B98B5D] to-[#E9DDD0]" : "from-[#B98B5D] to-[#B98B5D]";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full bg-[#FAF7F2] dark:bg-[#1A1410] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#E9DDD0]/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none dark:hidden" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#B98B5D]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none dark:hidden" />
      <div className="hidden dark:block absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-bl from-[#B98B5D]/12 via-[#8A633D]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="hidden dark:block absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#5A4A38]/20 via-[#3A2A1A]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-[#B98B5D]/5 via-[#3A2A1A]/30 to-[#1A1410]/80 pointer-events-none" />

      {/* ─── Desktop Background Image — bleeds to viewport edge ─── */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[55%] z-0">
        <Image
          src="/images/home-image.png"
          alt="Premium veterinary care for your beloved pets"
          fill
          priority
          quality={92}
          className="object-cover object-[center_30%]"
          sizes="55vw"
        />
        {/* Left fade — image fades into content area */}
        <div className="absolute inset-y-0 left-0 w-[200px] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/70 to-transparent dark:hidden" />
        <div className="hidden dark:block absolute inset-y-0 left-0 w-[200px] bg-gradient-to-r from-[#1A1410] via-[#1A1410]/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] min-h-screen flex flex-col lg:flex-row items-center px-4 sm:px-8 lg:px-12 xl:px-16 pt-24 sm:pt-28 lg:pt-0 pb-16 lg:pb-0">

        {/* ─── Content Column ─── */}
        <div className="relative z-20 w-full lg:w-[48%] py-10 sm:py-12 lg:py-0">
          {/* Mobile brand */}
          <div className="lg:hidden mb-5">
            <span className="inline-block text-[10px] sm:text-xs font-display font-bold tracking-[0.25em] uppercase text-[#B98B5D] dark:text-[#D8C9B3]">
              Pet Clinic, Ghatkopar
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-bold text-[#4A3A2A] dark:text-white leading-[1.05] tracking-[-0.02em] mb-5 sm:mb-6 text-[clamp(2.25rem,5vw,4.25rem)]">
            <span className="text-[#C4956A]">Advanced</span> Veterinary Care
            <br />
            For Your Beloved Pets
          </h1>

          {/* Subheading */}
          <p className="text-[clamp(0.95rem,1.1vw,1.125rem)] text-[#7B6A58] dark:text-[#E9DDD0] leading-[1.8] max-w-[520px] mb-8 sm:mb-9">
            Pet Clinic Ghatkopar provides advanced diagnostics, consultations,
            ozone therapy, acupuncture, pet grooming, boarding, and compassionate
            veterinary care for pets across Mumbai.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
            <Link
              href="/appointment"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#B98B5D] via-[#A67A4A] to-[#B98B5D] h-14 sm:h-14 w-full sm:w-auto sm:min-w-[220px] px-8 text-white font-semibold text-[15px] tracking-[-0.01em] shadow-[0_8px_30px_rgba(185,139,93,0.3)] dark:shadow-[0_8px_30px_rgba(185,139,93,0.45)] hover:shadow-[0_12px_40px_rgba(185,139,93,0.4)] dark:hover:shadow-[0_12px_40px_rgba(185,139,93,0.55)] transition-shadow duration-500 flex items-center justify-center"
            >
              <span className="flex items-center justify-center gap-2.5">
                <Calendar className="w-[18px] h-[18px]" />
                Book Appointment
              </span>
            </Link>

            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="group relative overflow-hidden rounded-full h-14 sm:h-14 w-full sm:w-auto sm:min-w-[180px] px-8 text-[#4A3A2A] dark:text-white font-semibold text-[15px] tracking-[-0.01em] border border-[#E0D5C8] dark:border-white/20 bg-white dark:bg-white/10 backdrop-blur-sm hover:border-[#B98B5D]/60 hover:shadow-[0_4px_20px_rgba(185,139,93,0.1)] dark:hover:border-[#B98B5D]/50 dark:hover:bg-white/15 transition-all duration-500 flex items-center justify-center"
            >
              <span className="flex items-center justify-center gap-2.5">
                <Phone className="w-[18px] h-[18px] text-[#B98B5D]" />
                Call Now
              </span>
            </a>
          </div>

          {/* Mobile stats */}
          <div className="lg:hidden mt-9">
            <div className="bg-white/90 dark:bg-[#2D2218]/80 backdrop-blur-xl border border-[#EFE7DD] dark:border-[#5A4A38]/30 rounded-3xl shadow-luxury dark:shadow-[0_4px_40px_rgba(0,0,0,0.25)] p-4">
              <div className="grid grid-cols-3 gap-3">
                {STATS.map((stat, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br ${gradientForStat(stat.label)} mb-1.5 shadow-md`}>
                      <stat.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-display font-bold text-[#4A3A2A] dark:text-white leading-none">{stat.value}</span>
                    <span className="text-[9px] text-[#7B6A58] dark:text-[#D8C9B3] font-medium mt-0.5 leading-tight">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile image */}
          <div className="lg:hidden mt-6 w-full">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#EFE7DD] dark:border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
              <Image
                src="/images/home-image.png"
                alt="Pet Clinic, Ghatkopar - Premium veterinary clinic"
                fill
                priority
                quality={90}
                className="object-cover object-[42%_center]"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Desktop Stats Card — anchored over image, bottom-right ─── */}
      <div className="hidden lg:block absolute bottom-10 right-10 xl:right-16 z-20">
        <div className="bg-white/90 dark:bg-[#2D2218]/90 backdrop-blur-xl border border-[#EFE7DD] dark:border-[#5A4A38]/40 rounded-3xl shadow-luxury dark:shadow-[0_4px_40px_rgba(0,0,0,0.3)] p-5">
          <div className="grid grid-cols-3 gap-5">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className={`flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br ${gradientForStat(stat.label)} mb-2.5 shadow-lg`}>
                  <stat.icon className="w-[18px] h-[18px] text-white" />
                </div>
                <span className="text-[17px] font-display font-bold text-[#4A3A2A] dark:text-white leading-none">{stat.value}</span>
                <span className="text-[10px] text-[#7B6A58] dark:text-[#D8C9B3] font-medium mt-1 leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
