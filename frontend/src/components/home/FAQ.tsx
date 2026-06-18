"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What services does Pet Clinic Ghatkopar offer?",
    answer:
      "We offer veterinary consultation, vaccination, pet diagnostics, kidney care, dialysis support, pet health checkups, medical treatment, and emergency guidance services.",
  },
  {
    question: "Who is Dr. Ekta A. Thakkar?",
    answer:
      "Dr. Ekta A. Thakkar is an experienced veterinary physician dedicated to providing compassionate, evidence-based care and advanced treatment solutions for pets at Pet Clinic Ghatkopar.",
  },
  {
    question: "What are the clinic hours?",
    answer:
      "We are open Monday to Saturday from 10:00 AM to 8:00 PM. The clinic is closed on Sundays.",
  },
  {
    question: "Do you offer kidney care and dialysis support?",
    answer:
      "Yes, we specialize in kidney care and dialysis support for pets. These services help manage kidney conditions and provide advanced treatment options for pets with renal issues.",
  },
  {
    question: "Where is the clinic located?",
    answer:
      "We are located at Shop No. 4 & 5, Indrayani CHS, General Arun Kumar Vaidya Udyan, Shri Dattaguru Mandir Marg, Opp. ARUN, Pant Nagar, Ghatkopar East, Mumbai, Maharashtra 400077.",
  },
  {
    question: "Do you offer emergency guidance?",
    answer:
      "Yes, we provide professional emergency guidance and support for urgent pet health concerns. For emergencies, please call us at +91 98204 65733.",
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
