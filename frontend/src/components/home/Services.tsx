"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import OptimizedImage from "@/components/ui/OptimizedImage";

const services = [
  {
    title: "Veterinary Consultations",
    description: "Expert consultations and comprehensive health assessments by Dr. Komal.",
    image: "https://images.pexels.com/photos/6235231/pexels-photo-6235231.jpeg",
    alt: "Veterinarian examining a dog with stethoscope in a modern clinic",
  },
  {
    title: "Blood Testing",
    description: "Advanced diagnostic blood work for accurate health monitoring and early detection.",
    image: "https://images.pexels.com/photos/6235116/pexels-photo-6235116.jpeg",
    alt: "Veterinarian performing blood diagnostics on a small dog",
  },
  {
    title: "Digital X-Rays",
    description: "State-of-the-art digital radiography for precise diagnostic imaging.",
    image: "https://images.pexels.com/photos/4989186/pexels-photo-4989186.jpeg",
    alt: "Modern veterinary X-ray equipment and digital radiography",
  },
  {
    title: "Ozone Therapy",
    description: "Advanced ozone therapy treatments for enhanced healing and recovery.",
    image: "https://images.pexels.com/photos/7121992/pexels-photo-7121992.jpeg",
    alt: "Professional pet treatment session in veterinary clinic",
  },
  {
    title: "Acupuncture",
    description: "Traditional acupuncture treatments for pain relief and holistic wellness.",
    image: "https://images.pexels.com/photos/5473184/pexels-photo-5473184.jpeg",
    alt: "Veterinary acupuncture treatment therapy session",
  },
  {
    title: "Pet Grooming",
    description: "Premium grooming services to keep your pet looking and feeling their best.",
    image: "https://images.pexels.com/photos/3842416/pexels-photo-3842416.jpeg",
    alt: "Professional dog grooming with premium care",
  },
  {
    title: "Pet Boarding",
    description: "Comfortable and safe boarding facilities with personalized care for your pet.",
    image: "https://images.pexels.com/photos/5255228/pexels-photo-5255228.jpeg",
    alt: "Luxury pet boarding environment with comfortable accommodations",
  },
  {
    title: "Preventive Healthcare",
    description: "Comprehensive wellness programs to keep your pet healthy and protected.",
    image: "https://images.pexels.com/photos/6235118/pexels-photo-6235118.jpeg",
    alt: "Veterinarian performing wellness checkup and vaccination",
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="services" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#E9DDD0]/30 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#B98B5D]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex px-5 py-2 rounded-full bg-[#FAF7F2] border border-[#EFE7DD] text-[#B98B5D] text-sm font-semibold tracking-wide mb-5">
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-[-0.02em] text-[#4A3A2A] mb-4 leading-[1.1]">
            Comprehensive Veterinary Care
          </h2>
          <p className="text-lg text-[#7B6A58] leading-relaxed">
            From routine consultations to specialized therapies, we provide advanced veterinary
            care with compassion for your beloved pets.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeInUp} className="h-full">
              <div className="group h-full overflow-hidden rounded-3xl bg-white border border-[#EFE7DD] hover:border-[#B98B5D]/60 shadow-[0_2px_8px_rgba(74,58,42,0.03)] hover:shadow-luxury hover:-translate-y-1 transition-all duration-500">
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={service.image}
                    alt={service.alt}
                    fill
                    containerClassName="h-full w-full"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-display font-semibold text-[#4A3A2A] mb-2 group-hover:text-[#B98B5D] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[#7B6A58] text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#B98B5D] group/link"
                  >
                    Learn more
                    <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-14"
        >
          <Link href="/services">
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-[#EFE7DD] bg-white text-[#4A3A2A] font-medium text-sm hover:border-[#B98B5D]/60 hover:text-[#B98B5D] hover:shadow-luxury transition-all duration-300 group">
              View All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
