"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const galleryItems = [
  {
    id: "1",
    src: "https://images.pexels.com/photos/6235114/pexels-photo-6235114.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    alt: "Professional veterinary examination room",
    category: "Clinic",
    width: 800,
    height: 600,
  },
  {
    id: "2",
    src: "https://images.pexels.com/photos/6235648/pexels-photo-6235648.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=2",
    alt: "Premium pet grooming session",
    category: "Grooming",
    width: 600,
    height: 800,
  },
  {
    id: "3",
    src: "https://images.pexels.com/photos/28644631/pexels-photo-28644631.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    alt: "Advanced veterinary consultation",
    category: "Consultations",
    width: 800,
    height: 600,
  },
  {
    id: "4",
    src: "https://images.pexels.com/photos/22504402/pexels-photo-22504402.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2",
    alt: "Comfortable pet care with loving owners",
    category: "Boarding",
    width: 800,
    height: 800,
  },
  {
    id: "5",
    src: "https://images.pexels.com/photos/6234980/pexels-photo-6234980.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2",
    alt: "Advanced veterinary treatment",
    category: "Therapy",
    width: 600,
    height: 600,
  },
  {
    id: "6",
    src: "https://images.pexels.com/photos/28644464/pexels-photo-28644464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    alt: "Happy pet at veterinary clinic",
    category: "Happy Pets",
    width: 800,
    height: 600,
  },
  {
    id: "7",
    src: "https://images.pexels.com/photos/6235011/pexels-photo-6235011.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    alt: "Premium veterinary consultation",
    category: "Grooming",
    width: 800,
    height: 600,
  },
  {
    id: "8",
    src: "https://images.pexels.com/photos/6560385/pexels-photo-6560385.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=2",
    alt: "Modern veterinary care equipment",
    category: "Clinic",
    width: 600,
    height: 800,
  },
];

const categories = ["All", "Clinic", "Grooming", "Boarding", "Therapy", "Happy Pets"];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
  };

  return (
    <section ref={ref} id="gallery" className="relative section-padding bg-[#FAF7F2] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#E9DDD0]/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-width relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-white border border-[#EFE7DD] text-[#B98B5D] text-sm font-medium mb-4">
            Gallery
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4 text-[#4A3A2A]">
            Our Premium Facilities
          </h2>
          <p className="text-lg text-[#7B6A58] leading-relaxed">
            See the premium care and luxurious facilities we provide to every pet that walks through our doors.
          </p>
        </motion.div>

        {/* Premium Category Filter */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#B98B5D] to-[#B98B5D] text-white shadow-lg shadow-[#B98B5D]/25 scale-105"
                  : "bg-white text-[#7B6A58] hover:bg-[#F5EFE5] border border-[#EFE7DD] hover:border-[#B98B5D]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Premium Masonry Gallery Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                variants={fadeInUp}
                exit={{ opacity: 0, scale: 0.9 }}
                className="cursor-pointer group relative rounded-3xl overflow-hidden bg-white shadow-luxury hover:shadow-luxury-lg transition-all duration-500"
                onClick={() => setSelectedIndex(index)}
              >
                {/* Premium image placeholder */}
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1.5 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-xl text-[#4A3A2A] shadow-sm border border-[#EFE7DD]">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A2A]/70 via-[#4A3A2A]/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Zoom icon on hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Image info on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-20 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white text-sm font-medium leading-tight">{item.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <Link href="/gallery">
            <Button variant="outline" size="lg" asChild>
              <span className="group rounded-2xl border-[#EFE7DD] hover:border-[#B98B5D]/60 text-[#4A3A2A] hover:text-[#B98B5D]">
                View Full Gallery
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Premium Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#4A3A2A]/95 backdrop-blur-2xl flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="max-w-5xl w-full mx-2 sm:mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[4/3] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#4A3A2A] relative shadow-2xl">
                {filtered[selectedIndex] && (
                  <Image
                    src={filtered[selectedIndex].src}
                    alt={filtered[selectedIndex].alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                  />
                )}
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {selectedIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
