"use client";

import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative z-50 w-14 h-14 rounded-2xl bg-gradient-to-r from-[#B98B5D] to-[#B98B5D] text-white shadow-[0_4px_20px_rgba(185,139,93,0.3)] flex items-center justify-center hover:shadow-[0_8px_30px_rgba(185,139,93,0.4)] transition-shadow duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        boxShadow: isOpen
          ? "0 0 0 0 rgba(185, 139, 93, 0)"
          : "0 0 0 8px rgba(185, 139, 93, 0.1)",
      }}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <MessageCircle className="w-6 h-6" />
      )}
    </motion.button>
  );
}
