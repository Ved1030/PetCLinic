"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919820445010";
const WHATSAPP_MESSAGE = "Hello THE OZONE VETS,%0AI would like to know more about your veterinary services.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-[96px] right-4 sm:right-6 z-40 group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 active:scale-95"
      style={{
        backgroundColor: "#25D366",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)",
      }}
    >
      <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: "#25D366" }} />
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-[#075E54] text-sm font-medium px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
        WhatsApp Us
      </span>
    </a>
  );
}
