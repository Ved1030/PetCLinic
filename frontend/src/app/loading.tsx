"use client";

import { motion } from "framer-motion";

function PawSVG({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 3.5c-1.5 0-2.5 1-2.5 2.5s1 2.5 2.5 2.5 2.5-1 2.5-2.5-1-2.5-2.5-2.5zM5.5 8.5c-1 0-2 .8-2 2s.9 2 2 2 2-.8 2-2-.9-2-2-2zm13 0c-1 0-2 .8-2 2s.9 2 2 2 2-.8 2-2-.9-2-2-2zm-10 5c-1.2 0-2.5 1-2.5 2.5s1.3 2.5 2.5 2.5 2.5-1 2.5-2.5-1.3-2.5-2.5-2.5zm7 0c-1.2 0-2.5 1-2.5 2.5s1.3 2.5 2.5 2.5 2.5-1 2.5-2.5-1.3-2.5-2.5-2.5z" />
    </svg>
  );
}

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      <div className="flex items-center gap-[3px]">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: [0, 1, 1, 1, 0.15],
              y: [6, 0, -2, 0, 4],
              scale: [0.3, 1, 0.9, 1, 0.5],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.25,
              times: [0, 0.15, 0.3, 0.5, 0.8],
              ease: "easeInOut",
            }}
            className="text-[#B98B5D]/50"
          >
            <PawSVG size={13} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
