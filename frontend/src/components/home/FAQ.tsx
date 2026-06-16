"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What services does THE OZONE VETS offer?",
    answer:
      "We offer veterinary consultations, blood testing, digital X-rays, ozone therapy, acupuncture, pet grooming, pet boarding, and comprehensive preventive healthcare services.",
  },
  {
    question: "Who is Dr. Komal?",
    answer:
      "Dr. Komal is an experienced veterinary physician dedicated to providing compassionate and advanced care for pets. She specializes in ozone therapy, acupuncture, preventive healthcare, and comprehensive veterinary medicine.",
  },
  {
    question: "What are the clinic hours?",
    answer:
      "We are open Monday to Saturday from 10:00 AM to 8:00 PM. The clinic is closed on Sundays.",
  },
  {
    question: "Do you offer ozone therapy for pets?",
    answer:
      "Yes, we specialize in ozone therapy treatments for pets. This advanced therapy helps with various conditions including skin issues, wound healing, and immune system support.",
  },
  {
    question: "Where is the clinic located?",
    answer:
      "We are located at C3 SARANGA, Lokhandwala Complex Market, Bungalow, 3rd Cross Road, Opp. Cliff Tower, Andheri West, Mumbai 400053.",
  },
  {
    question: "Do you offer pet boarding services?",
    answer:
      "Yes, we provide premium pet boarding facilities with personalized care, comfortable accommodations, and regular health monitoring for your beloved pets.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-gradient-to-b from-[#FAF7F2] to-white">
      <div className="max-width">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-[#FAF7F2] border border-[#EFE7DD] text-[#B98B5D] text-sm font-semibold tracking-wide mb-5">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-[-0.02em] text-[#4A3A2A] mb-4 leading-[1.1]">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#7B6A58] leading-relaxed">
            Got questions? We&apos;ve got answers. Here are some of the most common questions
            pet parents ask us.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
          <Accordion.Root type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl border border-[#EFE7DD] overflow-hidden transition-all duration-300 data-[state=open]:shadow-luxury data-[state=open]:border-[#B98B5D]/40"
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    className={cn(
                      "flex items-center justify-between w-full px-6 py-5 text-left",
                      "text-base font-display font-medium text-[#4A3A2A] hover:text-[#B98B5D]",
                      "transition-all duration-300 group"
                    )}
                  >
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-[#7B6A58] group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#B98B5D] transition-transform duration-300 shrink-0 ml-4" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="data-[state=open]:animate-slide-up overflow-hidden">
                  <div className="px-6 pb-5 text-[#7B6A58] leading-relaxed">
                    {faq.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
