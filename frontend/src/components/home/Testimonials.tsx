"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, CheckCircle, Send, Phone, Mail, User, PawPrint } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import apiClient from "@/lib/axios";
import { CONTACT_INFO } from "@/lib/constants";

const testimonials = [
  {
    id: "1",
    name: "Pet Parent",
    petName: "Oreo",
    role: "Dog Parent",
    content: "Amazing experience at THE OZONE VETS! Dr. Komal is incredibly knowledgeable and caring. The clinic has a premium feel and my pet was treated with utmost care.",
    rating: 5,
  },
  {
    id: "2",
    name: "Pet Parent",
    petName: "",
    role: "Cat Owner",
    content: "The ozone therapy treatment was incredible for my cat. The facilities are top-notch and the staff is very professional. Highly recommend!",
    rating: 5,
  },
  {
    id: "3",
    name: "Pet Parent",
    petName: "",
    role: "Pet Owner",
    content: "I am fully satisfied with the diagnosis and consultation I received. The clinic has a luxury feel and the care provided is exceptional.",
    rating: 5,
  },
  {
    id: "4",
    name: "Pet Parent",
    petName: "",
    role: "Pet Owner",
    content: "Excellent veterinary care! Dr. Komal and her team truly care about the well-being of every pet. The grooming service is premium quality.",
    rating: 5,
  },
];

const trustIndicators = [
  { icon: ShieldCheck, text: "Verified Pet Parents" },
  { icon: CheckCircle, text: "Authentic Reviews" },
  { icon: Star, text: "Premium Care" },
];

const PET_TYPES = ["Dog", "Cat", "Bird", "Rabbit", "Other"];

const inputClass = "w-full px-4 py-3.5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#EFE7DD] text-[#4A3A2A] text-sm placeholder:text-[#B98B5D]/50 focus:outline-none focus:ring-2 focus:ring-[#B98B5D]/30 focus:border-[#B98B5D] transition-all duration-300";

const labelClass = "block text-sm font-medium text-[#7B6A58] mb-1.5 tracking-wide";

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", petName: "", petType: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await apiClient.post("/contact", formData);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [formData]);

  const t = testimonials[current];

  return (
    <section ref={ref} id="reviews" className="relative py-20 lg:py-24 bg-[#FAF7F2] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#E9DDD0]/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#B98B5D]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-width relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 lg:gap-10 xl:gap-14">

          {/* ═══════════ LEFT - REVIEWS ═══════════ */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex px-5 py-2 rounded-full bg-white border border-[#EFE7DD] text-[#B98B5D] text-sm font-semibold tracking-wide mb-5">
                Reviews
              </span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-display font-bold tracking-[-0.02em] text-[#4A3A2A] mb-4 leading-[1.1]">
              What Pet Parents Say
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-lg text-[#7B6A58] leading-relaxed mb-8">
              Hear from the families we&apos;ve had the privilege to serve.
            </motion.p>

            {/* Google Rating */}
            <motion.div variants={fadeInUp} className="flex items-center gap-5 mb-8 p-5 rounded-2xl bg-white border border-[#EFE7DD] shadow-sm">
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
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-10">
              {trustIndicators.map((item) => (
                <div key={item.text} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#EFE7DD] text-sm font-medium text-[#7B6A58]">
                  <item.icon className="w-4 h-4 text-[#B98B5D]" />
                  {item.text}
                </div>
              ))}
            </motion.div>

            {/* Testimonials Slider */}
            <motion.div variants={fadeInUp} className="relative flex-1 min-h-0">
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
                    <div className="bg-white border border-[#EFE7DD] rounded-3xl p-8 shadow-luxury">
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
              href={`https://search.google.com/local/reviews?placeid=YOUR_PLACE_ID`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white border border-[#EFE7DD] hover:border-[#B98B5D]/60 hover:shadow-md transition-all duration-300 group self-start"
            >
              <svg className="w-5 h-5 text-[#B98B5D]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.1 9.4l-5.9-.5-2.1-6.3c-.1-.3-.4-.5-.7-.5s-.6.2-.7.5L9.6 8.9l-5.9.5c-.3 0-.6.2-.7.5s0 .6.2.8l4.5 3.9-1.3 5.8c-.1.3 0 .6.3.8s.6.2.9 0l5-3.1 5 3.1c.3.2.6.2.9 0s.4-.5.3-.8l-1.3-5.8 4.5-3.9c.3-.2.4-.5.2-.8-.1-.3-.4-.5-.7-.5z"/>
              </svg>
              <span className="text-sm font-medium text-[#7B6A58] group-hover:text-[#B98B5D] transition-colors">
                Review us on Google
              </span>
            </motion.a>
          </motion.div>

          {/* ═══════════ RIGHT - CONTACT FORM ═══════════ */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="bg-white/70 backdrop-blur-2xl border border-white/30 rounded-3xl p-8 sm:p-10 shadow-luxury-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-[#E9DDD0]/30 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <motion.div variants={fadeInUp}>
                  <span className="inline-flex px-5 py-2 rounded-full bg-[#FAF7F2] border border-[#EFE7DD] text-[#B98B5D] text-sm font-semibold tracking-wide mb-5">
                    Get In Touch
                  </span>
                </motion.div>

                <motion.h3 variants={fadeInUp} className="text-2xl sm:text-3xl font-display font-bold tracking-[-0.02em] text-[#4A3A2A] mb-3 leading-[1.15]">
                  Speak With Our Veterinary Team
                </motion.h3>

                <motion.p variants={fadeInUp} className="text-sm text-[#7B6A58] leading-relaxed mb-8 max-w-lg">
                  Have questions about your pet&apos;s health, grooming, boarding, or treatment? Our team is here to help.
                </motion.p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 px-4"
                  >
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B98B5D] to-[#8A633D] mx-auto mb-5 shadow-lg">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-display font-bold text-[#4A3A2A] mb-3">
                      Thank You!
                    </h4>
                    <p className="text-sm text-[#7B6A58] leading-relaxed max-w-sm mx-auto">
                      Thank you for contacting <strong>THE OZONE VETS</strong>. Our team will get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="inq-name" className={labelClass}>
                          <User className="w-3.5 h-3.5 inline mr-1.5 text-[#B98B5D]" />
                          Pet Owner Name
                        </label>
                        <input
                          id="inq-name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="inq-phone" className={labelClass}>
                          <Phone className="w-3.5 h-3.5 inline mr-1.5 text-[#B98B5D]" />
                          Phone Number
                        </label>
                        <input
                          id="inq-phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98XXX XXXXX"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="inq-email" className={labelClass}>
                        <Mail className="w-3.5 h-3.5 inline mr-1.5 text-[#B98B5D]" />
                        Email Address
                      </label>
                      <input
                        id="inq-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClass}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="inq-petName" className={labelClass}>
                          <PawPrint className="w-3.5 h-3.5 inline mr-1.5 text-[#B98B5D]" />
                          Pet Name
                        </label>
                        <input
                          id="inq-petName"
                          name="petName"
                          type="text"
                          required
                          value={formData.petName}
                          onChange={handleChange}
                          placeholder="Your pet's name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="inq-petType" className={labelClass}>
                          Pet Type
                        </label>
                        <select
                          id="inq-petType"
                          name="petType"
                          required
                          value={formData.petType}
                          onChange={handleChange}
                          className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23B98B5D%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat`}
                        >
                          <option value="" disabled>Select pet type</option>
                          {PET_TYPES.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="inq-message" className={labelClass}>
                        Message
                      </label>
                      <textarea
                        id="inq-message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your pet's needs..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">{error}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#B98B5D] via-[#B98B5D] to-[#B98B5D] h-[56px] px-8 text-white font-semibold text-[15px] shadow-[0_8px_30px_rgba(185,139,93,0.3)] hover:shadow-[0_12px_40px_rgba(185,139,93,0.4)] transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2.5">
                        {submitting ? (
                          <>Sending...</>
                        ) : (
                          <>
                            <Send className="w-[18px] h-[18px]" />
                            Send Inquiry
                          </>
                        )}
                      </span>
                      {!submitting && (
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ transitionDuration: "800ms" }} />
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
