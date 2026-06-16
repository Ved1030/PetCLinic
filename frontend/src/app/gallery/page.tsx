"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const categories = ["All", "Dogs", "Cats", "Clinic", "Grooming"];

const galleryItems = [
  { id: "1", src: "https://images.pexels.com/photos/6235114/pexels-photo-6235114.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2", alt: "Happy dog after treatment", category: "Dogs", description: "A happy pet recovering well after consultation." },
  { id: "2", src: "https://images.pexels.com/photos/28644631/pexels-photo-28644631.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2", alt: "Cat wellness exam", category: "Cats", description: "Gentle examination for a curious cat." },
  { id: "3", src: "https://images.pexels.com/photos/6560385/pexels-photo-6560385.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2", alt: "Premium clinic interior", category: "Clinic", description: "Modern and luxurious clinic environment." },
  { id: "4", src: "https://images.pexels.com/photos/22504402/pexels-photo-22504402.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2", alt: "Dog checkup", category: "Dogs", description: "Thorough health checkup for dogs." },
  { id: "5", src: "https://images.pexels.com/photos/6235648/pexels-photo-6235648.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2", alt: "Cat recovery", category: "Cats", description: "Post-treatment care for feline friends." },
  { id: "6", src: "https://images.pexels.com/photos/6235011/pexels-photo-6235011.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2", alt: "Premium grooming session", category: "Grooming", description: "Expert grooming for a luxurious finish." },
  { id: "7", src: "https://images.pexels.com/photos/28644464/pexels-photo-28644464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2", alt: "Dog wellness", category: "Dogs", description: "Keeping pets healthy and happy." },
  { id: "8", src: "https://images.pexels.com/photos/6234980/pexels-photo-6234980.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2", alt: "Cat examination", category: "Cats", description: "Expert care for cats." },
  { id: "9", src: "https://images.pexels.com/photos/7468978/pexels-photo-7468978.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2", alt: "Advanced diagnostic equipment", category: "Clinic", description: "State-of-the-art diagnostic equipment." },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#FAF7F2] via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="inline-block px-5 py-2 rounded-full bg-white border border-[#EFE7DD] text-[#B98B5D] text-sm font-semibold tracking-wide mb-5">
              Gallery
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-[-0.03em] text-[#4A3A2A] mb-6 leading-[1.1]">
              Our{" "}
              <span className="text-gradient-accent">
                Premium Facilities
              </span>
            </h1>
            <p className="text-lg text-[#7B6A58] max-w-2xl mx-auto leading-relaxed">
              A glimpse into the premium care and luxurious facilities we provide to every pet at THE OZONE VETS.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#B98B5D] to-[#B98B5D] text-white shadow-lg shadow-[#B98B5D]/25"
                    : "bg-white border border-[#EFE7DD] text-[#7B6A58] hover:border-[#B98B5D]/40 hover:text-[#4A3A2A]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={fadeInUp}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group bg-[#F5EFE5] border border-[#EFE7DD] shadow-luxury hover:shadow-luxury-lg transition-all duration-500"
                  onClick={() => setSelectedImage(item)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A2A]/70 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3 z-20">
                    <span className="px-3 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-xl text-[#4A3A2A] shadow-sm border border-[#EFE7DD]">{item.category}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-20 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white font-medium">{item.alt}</p>
                    <p className="text-white/70 text-sm mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[#4A3A2A]/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10" aria-label="Close">
              <X className="w-8 h-8" />
            </button>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="max-w-4xl w-full text-center" onClick={(e) => e.stopPropagation()}>
                <div className="aspect-[4/3] rounded-3xl overflow-hidden relative bg-[#4A3A2A] mb-4 shadow-2xl">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                  />
                </div>
              <h3 className="text-white text-xl font-display font-semibold">{selectedImage.alt}</h3>
              <p className="text-white/70 mt-2">{selectedImage.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
