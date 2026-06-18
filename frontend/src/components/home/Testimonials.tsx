"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, CheckCircle } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { CONTACT_INFO } from "@/lib/constants";

const testimonials = [
  {
    id: "1",
    name: "Pet Parent",
    petName: "",
    role: "Pet Owner",
    content: "Very nice experience. Doctor is so good and everything was properly guided.",
    rating: 5,
  },
  {
    id: "2",
    name: "Pet Parent",
    petName: "Oreo",
    role: "Dog Parent",
    content: "Dr. Kastubh gave Oreo the best possible treatment for his kidney condition.",
    rating: 5,
  },
  {
    id: "3",
    name: "Pet Parent",
    petName: "",
    role: "Pet Owner",
    content: "I am fully satisfied with the diagnosis, investigations and consultation I received.",
    rating: 5,
  },
];

const trustIndicators = [
  { icon: ShieldCheck, text: "Verified Pet Parents" },
  { icon: CheckCircle, text: "Authentic Reviews" },
  { icon: Star, text: "Premium Care" },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  }, []);

  const t = testimonials[current];

  return (
    <section ref={ref} id="reviews" className="relative py-20 lg:py-24 bg-[#FAF7F2] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#E9DDD0]/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#B98B5D]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-width relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Reviews */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <span className="inline-flex px-5 py-2 rounded-full bg-white border border-[#EFE7DD] text-[#B98B5D] text-sm font-semibold tracking-wide mb-5">
                Reviews
              </span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-center text-4xl sm:text-5xl font-display font-bold tracking-[-0.02em] text-[#4A3A2A] mb-4 leading-[1.1]">
              What Pet Parents Say
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-center text-lg text-[#7B6A58] leading-relaxed mb-10 max-w-2xl mx-auto">
              Hear from the families we&apos;ve had the privilege to serve.
            </motion.p>

            {/* Google Rating */}
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-5 mb-8 p-5 rounded-2xl bg-white border border-[#EFE7DD] shadow-sm mx-auto">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#B98B5D] to-[#8A633D] shadow-md shrink-0">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.1 9.4l-5.9-.5-2.1-6.3c-.1-.3-.4-.5-.7-.5s-.6.2-.7.5L9.6 8.9l-5.9.5c-.3 0-.6.2-.7.5s0 .6.2.8l4.5 3.9-1.3 5.8c-.1.3 0 .6.3.8s.6.2.9 0l5-3.1 5 3.1c.3.2.6.2.9 0s.4-.5.3-.8l-1.3-5.8 4.5-3.9c.3-.2.4-.5.2-.8-.1-.3-.4-.5-.7-.5z"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-display font-bold text-[#4A3A2A]">{CONTACT_INFO.rating}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B98B5D] text-[#B98B5D]" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#7B6A58] font-medium">{CONTACT_INFO.reviews} Google Reviews</p>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-10">
              {trustIndicators.map((item) => (
                <div key={item.text} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#EFE7DD] text-sm font-medium text-[#7B6A58]">
                  <item.icon className="w-4 h-4 text-[#B98B5D]" />
                  {item.text}
                </div>
              ))}
            </motion.div>

            {/* Testimonials Slider */}
            <motion.div variants={fadeInUp} className="relative w-full max-w-2xl mx-auto">
              <div className="relative">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  >
                    <div className="bg-white border border-[#EFE7DD] rounded-3xl p-8 sm:p-10 shadow-luxury">
                      <div className="flex items-start gap-5 mb-5">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E9DDD0] to-[#F5EFE5] shadow-sm shrink-0">
                          <Quote className="w-6 h-6 text-[#B98B5D]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-[#4A3A2A] text-base">{t.name}</p>
                          <p className="text-sm text-[#7B6A58]">{t.role}</p>
                          {t.petName && <p className="text-xs text-[#B98B5D] font-medium">{t.petName}</p>}
                        </div>
                        <div className="flex gap-1 shrink-0">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#B98B5D] text-[#B98B5D]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[15px] text-[#7B6A58] leading-relaxed">
                        &ldquo;{t.content}&rdquo;
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex gap-2.5">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                        className={`transition-all duration-500 rounded-full ${
                          i === current
                            ? "w-8 h-2.5 bg-gradient-to-r from-[#B98B5D] to-[#B98B5D] shadow-sm shadow-[#B98B5D]/30"
                            : "w-2.5 h-2.5 bg-[#D8C9B3] hover:bg-[#B98B5D]/50"
                        }`}
                        aria-label={`Go to review ${i + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => paginate(-1)}
                      className="p-3 rounded-xl bg-white border border-[#EFE7DD] hover:border-[#B98B5D]/60 hover:bg-[#FAF7F2] transition-all duration-300"
                      aria-label="Previous review"
                    >
                      <ChevronLeft className="w-5 h-5 text-[#7B6A58]" />
                    </button>
                    <button
                      onClick={() => paginate(1)}
                      className="p-3 rounded-xl bg-white border border-[#EFE7DD] hover:border-[#B98B5D]/60 hover:bg-[#FAF7F2] transition-all duration-300"
                      aria-label="Next review"
                    >
                      <ChevronRight className="w-5 h-5 text-[#7B6A58]" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Google Reviews Badge */}
            <motion.a
              variants={fadeInUp}
              href={`https://search.google.com/local/reviews?placeid=REPLACE_WITH_GOOGLE_PLACE_ID`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white border border-[#EFE7DD] hover:border-[#B98B5D]/60 hover:shadow-md transition-all duration-300 group self-center"
            >
              <svg className="w-5 h-5 text-[#B98B5D]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.1 9.4l-5.9-.5-2.1-6.3c-.1-.3-.4-.5-.7-.5s-.6.2-.7.5L9.6 8.9l-5.9.5c-.3 0-.6.2-.7.5s0 .6.2.8l4.5 3.9-1.3 5.8c-.1.3 0 .6.3.8s.6.2.9 0l5-3.1 5 3.1c.3.2.6.2.9 0s.4-.5.3-.8l-1.3-5.8 4.5-3.9c.3-.2.4-.5.2-.8-.1-.3-.4-.5-.7-.5z"/>
              </svg>
              <span className="text-sm font-medium text-[#7B6A58] group-hover:text-[#B98B5D] transition-colors">
                Review us on Google
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
