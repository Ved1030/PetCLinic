"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

const testimonials = [
  {
    id: "1",
    name: "Pet Parent",
    petName: "Oreo",
    role: "Dog Parent",
    content:
      "Amazing experience at THE OZONE VETS! Dr. Komal is incredibly knowledgeable and caring. The clinic has a premium feel and my pet was treated with utmost care.",
    rating: 5,
    gradient: "from-[#E9DDD0] to-[#F5EFE5]",
  },
  {
    id: "2",
    name: "Pet Parent",
    petName: "",
    role: "Cat Owner",
    content:
      "The ozone therapy treatment was incredible for my cat. The facilities are top-notch and the staff is very professional. Highly recommend!",
    rating: 5,
    gradient: "from-[#B98B5D]/30 to-[#E9DDD0]",
  },
  {
    id: "3",
    name: "Pet Parent",
    petName: "",
    role: "Pet Owner",
    content:
      "I am fully satisfied with the diagnosis and consultation I received. The clinic has a luxury feel and the care provided is exceptional.",
    rating: 5,
    gradient: "from-[#B98B5D]/20 to-[#E9DDD0]",
  },
  {
    id: "4",
    name: "Pet Parent",
    petName: "",
    role: "Pet Owner",
    content:
      "Excellent veterinary care! Dr. Komal and her team truly care about the well-being of every pet. The grooming service is premium quality.",
    rating: 5,
    gradient: "from-[#B98B5D]/20 to-[#E9DDD0]",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, rotateY: dir > 0 ? 15 : -15 }),
    center: { x: 0, opacity: 1, rotateY: 0 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, rotateY: dir > 0 ? -15 : 15 }),
  };

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  const t = testimonials[current];

  return (
    <section ref={ref} className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#E9DDD0]/30 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-[#FAF7F2] border border-[#EFE7DD] text-[#B98B5D] text-sm font-semibold tracking-wide mb-5">
            Reviews
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-[-0.02em] text-[#4A3A2A] mb-4 leading-[1.1]">
            What Pet Parents Say
          </h2>
          <p className="text-lg text-[#7B6A58] leading-relaxed">
            Don&apos;t just take our word for it — hear from the families we&apos;ve had the privilege to serve.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto perspective-[1000px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="w-full"
            >
              <div className="bg-white border border-[#EFE7DD] shadow-luxury overflow-hidden rounded-3xl">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 relative min-h-[250px] md:min-h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A2A]/20 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/90 backdrop-blur-sm shadow-luxury flex items-center justify-center">
                          <span className="text-3xl md:text-4xl font-display font-bold text-gradient-accent">
                            {t.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div className="absolute -bottom-2 -right-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B98B5D] to-[#B98B5D] text-white flex items-center justify-center shadow-lg">
                            <Quote className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 md:hidden">
                      <p className="text-white font-semibold text-lg">{t.name}</p>
                      <p className="text-white/70 text-sm">{t.role}</p>
                    </div>
                  </div>

                  <div className="md:col-span-3 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                    <Quote className="w-8 h-8 text-[#E9DDD0] mb-6" />
                    <p className="text-base sm:text-lg text-[#7B6A58] leading-relaxed mb-8 italic">
                      &ldquo;{t.content}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="hidden md:block">
                          <p className="font-display font-semibold text-[#4A3A2A]">{t.name}</p>
                          <p className="text-sm text-[#7B6A58]">{t.role}</p>
                          {t.petName && <p className="text-xs text-[#7B6A58]/70 mt-0.5">{t.petName}</p>}
                        </div>
                        <div className="flex gap-1 mt-2">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#B98B5D] text-[#B98B5D]" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={() => paginate(-1)}
              className="p-3.5 rounded-full bg-white border border-[#EFE7DD] shadow-luxury hover:shadow-luxury-lg hover:bg-[#FAF7F2] transition-all duration-300 hover:border-[#B98B5D]/60"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 text-[#7B6A58]" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`transition-all duration-500 rounded-full ${
                    i === current
                      ? "w-8 h-2.5 bg-gradient-to-r from-[#B98B5D] to-[#B98B5D] shadow-sm shadow-[#B98B5D]/30"
                      : "w-2.5 h-2.5 bg-[#E9DDD0] hover:bg-[#D8C9B3]"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="p-3.5 rounded-full bg-white border border-[#EFE7DD] shadow-luxury hover:shadow-luxury-lg hover:bg-[#FAF7F2] transition-all duration-300 hover:border-[#B98B5D]/60"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 text-[#7B6A58]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
