"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { gsap } from "gsap";
import { Calendar, Phone, Star, Heart, Award } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

function useMagneticEffect(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * strength);
      y.set((e.clientY - rect.top - rect.height / 2) * strength);
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return { ref, style: { x, y }, handleMouseMove, handleMouseLeave };
}

function MagneticButton({ children, className, strength }: { children: React.ReactNode; className?: string; strength?: number }) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useMagneticEffect(strength);
  return (
    <motion.div ref={ref} style={style} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} transition={{ type: "spring", stiffness: 150, damping: 15 }} className={className}>
      {children}
    </motion.div>
  );
}

const STATS = [
  { icon: Star, value: "178+", label: "Google Reviews", color: "from-[#B98B5D] to-[#B98B5D]" },
  { icon: Award, value: "4.5★", label: "Clinic Rating", color: "from-[#B98B5D] to-[#B98B5D]" },
  { icon: Heart, value: "1000+", label: "Happy Pets", color: "from-[#B98B5D] to-[#E9DDD0]" },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const statsCardRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const imageParallaxY = useTransform(scrollY, [0, 800], [0, 60]);
  const imageScale = useTransform(scrollY, [0, 800], [1, 1.04]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".hero-word");
        tl.fromTo(words, { y: 60, opacity: 0, rotateX: -40, filter: "blur(5px)" }, { y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.05, ease: "power4.out" }, 0.35);
      }

      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current, { y: 24, opacity: 0, filter: "blur(4px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }, 1.1);
      }

      if (ctaContainerRef.current) {
        const buttons = ctaContainerRef.current.querySelectorAll(".cta-btn");
        tl.fromTo(buttons, { y: 30, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" }, 1.35);
      }

      if (imageContainerRef.current) {
        tl.fromTo(imageContainerRef.current, { scale: 1.08, opacity: 0, clipPath: "inset(0 0 0 100%)" }, { scale: 1, opacity: 1, clipPath: "inset(0%)", duration: 1.8, ease: "power4.inOut" }, 0.25);
      }

      if (statsCardRef.current) {
        tl.fromTo(statsCardRef.current, { y: 40, opacity: 0, scale: 0.94, filter: "blur(6px)" }, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }, 1.7);
        const items = statsCardRef.current.querySelectorAll(".stat-item");
        tl.fromTo(items, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }, 2.0);
      }
    });
    return () => ctx.revert();
  }, []);

  const line1Words = useMemo(() => "Advanced Veterinary Care For Your Beloved Pets".split(" "), []);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen w-full overflow-hidden bg-[#FAF7F2] dark:bg-[#1A1410]">

      {/* Light mode decorative Elements */}
      <div className="dark:hidden absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#E9DDD0]/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="dark:hidden absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#B98B5D]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Dark mode ambient glow */}
      <div className="hidden dark:block absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-bl from-[#B98B5D]/12 via-[#8A633D]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="hidden dark:block absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#5A4A38]/20 via-[#3A2A1A]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Dark mode warm bronze radial overlay */}
      <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-[#B98B5D]/5 via-[#3A2A1A]/30 to-[#1A1410]/80 pointer-events-none" />

      {/* ═══════════════ DESKTOP IMAGE ═══════════════ */}
      <motion.div
        ref={imageContainerRef}
        style={{ y: imageParallaxY, scale: imageScale }}
        className="absolute top-0 right-0 h-full w-[58%] lg:w-[63%] opacity-0 z-0 hidden lg:block"
      >
        <div className="absolute inset-0 rounded-l-[40px] overflow-hidden">
          <Image
            src="/images/home-image.png"
            alt="Premium luxury veterinary clinic interior"
            fill
            priority
            quality={92}
            className="object-cover object-[42%_center]"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
        {/* Fade left edge into background */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#FAF7F2] dark:from-[#1A1410] via-[#FAF7F2]/60 dark:via-[#1A1410]/60 to-transparent w-[35%]" />

        {/* Desktop Stats Card */}
        <motion.div
          ref={statsCardRef}
          className="absolute bottom-8 right-8 z-20 opacity-0 hidden lg:block"
        >
          <div className="bg-white/90 dark:bg-[#2D2218]/90 backdrop-blur-xl border border-[#EFE7DD] dark:border-[#5A4A38]/40 rounded-3xl shadow-luxury dark:shadow-[0_4px_40px_rgba(0,0,0,0.3)] p-5">
            <div className="grid grid-cols-3 gap-4">
              {STATS.map((stat, index) => (
                <div key={index} className="stat-item flex flex-col items-center text-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br ${stat.color} mb-2.5 shadow-lg`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-display font-bold text-[#4A3A2A] dark:text-white leading-none">{stat.value}</span>
                  <span className="text-[10px] text-[#7B6A58] dark:text-[#D8C9B3] font-medium mt-1 leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ═══════════════ CONTENT ═══════════════ */}
      <div className="relative z-10 w-full min-h-screen flex items-center px-4 sm:px-6 lg:px-16 xl:px-24 pt-24 sm:pt-28 lg:pt-0 pb-24 lg:pb-0">
        <div className="w-full max-w-[520px] lg:max-w-[560px] xl:max-w-[620px] py-10 sm:py-12 lg:py-0">

          {/* Mobile-only Brand */}
          <div className="lg:hidden mb-4">
            <span className="inline-block text-[10px] sm:text-xs font-display font-bold tracking-[0.25em] uppercase text-[#B98B5D] dark:text-[#D8C9B3]">
              THE OZONE VETS
            </span>
          </div>

          {/* Heading */}
          <h1 ref={headingRef} className="text-[clamp(2.2rem,7.5vw,4.2rem)] lg:text-[clamp(2.6rem,5vw,4.2rem)] font-display font-bold leading-[1.08] tracking-[-0.02em] text-[#4A3A2A] dark:text-white mb-5 sm:mb-8" style={{ perspective: "800px", textShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
            {line1Words.map((word, i) => (
              <span key={`l1-${i}`} className={`hero-word inline-block mr-[0.3em] ${i === 0 || i === 1 ? "text-gradient-accent" : ""}`}>{word}</span>
            ))}
          </h1>

          {/* Subheading */}
          <p ref={subtitleRef} className="text-[clamp(0.9rem,1.1vw,1.1rem)] text-[#7B6A58] dark:text-[#E9DDD0] leading-[1.8] max-w-[480px] mb-8 sm:mb-10 lg:mb-12 opacity-0">
            THE OZONE VETS provides advanced diagnostics, consultations, ozone therapy, acupuncture, pet grooming, boarding, and compassionate veterinary care for pets across Mumbai.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaContainerRef} className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 w-full sm:w-auto">
            <Link href="/appointment" className="cta-btn w-full sm:w-auto">
              <MagneticButton strength={0.2}>
                <span className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#B98B5D] via-[#A67A4A] to-[#B98B5D] h-14 sm:h-[52px] w-full sm:w-auto min-w-0 sm:min-w-[200px] px-7 text-white font-semibold text-[15px] shadow-[0_8px_30px_rgba(185,139,93,0.3)] dark:shadow-[0_8px_30px_rgba(185,139,93,0.45)] hover:shadow-[0_12px_40px_rgba(185,139,93,0.4)] dark:hover:shadow-[0_12px_40px_rgba(185,139,93,0.55)] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center cursor-pointer">
                  <span className="relative z-10 flex items-center justify-center gap-2.5">
                    <Calendar className="w-[18px] h-[18px]" />
                    Book Appointment
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ transitionDuration: "800ms" }} />
                </span>
              </MagneticButton>
            </Link>

            <a href={`tel:${CONTACT_INFO.phone}`} className="cta-btn w-full sm:w-auto">
              <MagneticButton strength={0.2}>
                <span className="group relative overflow-hidden rounded-2xl h-14 sm:h-[52px] w-full sm:w-auto min-w-0 sm:min-w-[200px] px-7 text-[#4A3A2A] dark:text-white font-semibold text-[15px] border border-[#EFE7DD] dark:border-white/20 bg-white dark:bg-white/10 backdrop-blur-sm hover:border-[#B98B5D]/60 hover:shadow-[0_4px_20px_rgba(185,139,93,0.1)] dark:hover:border-[#B98B5D]/50 dark:hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center cursor-pointer">
                  <span className="flex items-center justify-center gap-2.5">
                    <Phone className="w-[18px] h-[18px] text-[#B98B5D]" />
                    Call Now
                  </span>
                </span>
              </MagneticButton>
            </a>
          </div>

          {/* ═══════════════ MOBILE HERO IMAGE + STATS ═══════════════ */}
          <div className="lg:hidden mt-8 sm:mt-10">
            {/* Hero Image */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-[#EFE7DD] dark:border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] mb-6">
              <Image
                src="/images/home-image.png"
                alt="THE OZONE VETS - Premium luxury veterinary clinic"
                fill
                priority
                quality={90}
                className="object-cover object-[42%_center]"
                sizes="100vw"
              />
            </div>

            {/* Mobile Stats */}
            <div className="bg-white/90 dark:bg-[#2D2218]/80 backdrop-blur-xl border border-[#EFE7DD] dark:border-[#5A4A38]/30 rounded-3xl shadow-luxury dark:shadow-[0_4px_40px_rgba(0,0,0,0.25)] p-4">
              <div className="grid grid-cols-3 gap-3">
                {STATS.map((stat, index) => (
                  <div key={index} className="stat-item flex flex-col items-center text-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br ${stat.color} mb-1.5 shadow-md`}>
                      <stat.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-display font-bold text-[#4A3A2A] dark:text-white leading-none">{stat.value}</span>
                    <span className="text-[9px] text-[#7B6A58] dark:text-[#D8C9B3] font-medium mt-0.5 leading-tight">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
