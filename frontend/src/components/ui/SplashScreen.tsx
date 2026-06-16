"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function PawSVG({ size = 14 }: { size?: number }) {
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

function StaggerText({ text, delay = 0 }: { text: string; delay?: number }) {
  const chars = text.split("");

  return (
    <span className="inline-flex flex-wrap justify-center">
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 24, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function FloatingParticles() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => {
        const left = 3 + ((i * 19) % 94);
        const top = 5 + ((i * 27) % 90);
        return (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 1.5 + (i % 3),
              height: 1.5 + (i % 3),
              left: `${left}%`,
              top: `${top}%`,
              backgroundColor: "rgba(185, 139, 93, 0.1)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: [0, 0.2, 0],
              y: [0, -20 + (i % 3) * -15, -50],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </>
  );
}

function PawParticles() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const radius = 90 + (i % 2) * 40;
        return (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ color: "rgba(185, 139, 93, 0.06)" }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.1, 0],
              x: [0, Math.cos(angle) * radius],
              y: [0, Math.sin(angle) * radius],
              rotate: [0, 10 + i * 8],
              scale: [0, 1, 0.4],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: 1.8 + i * 0.25,
              ease: "easeInOut",
            }}
          >
            <PawSVG size={9} />
          </motion.div>
        );
      })}
    </>
  );
}

function MeshOrbs() {
  return (
    <>
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: "0%",
          right: "-10%",
          background:
            "radial-gradient(circle, rgba(233,221,208,0.25) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
        animate={{ x: [0, 30, -20, 0], y: [0, -25, 20, 0] }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          bottom: "5%",
          left: "-5%",
          background:
            "radial-gradient(circle, rgba(185,139,93,0.1) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{ x: [0, -25, 30, 0], y: [0, 30, -20, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300,
          height: 300,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(250,247,242,0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.12, 0.92, 1] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}

function GlowCircle() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute pointer-events-none"
      style={{
        width: 320,
        height: 320,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(185,139,93,0.1) 0%, rgba(185,139,93,0.04) 40%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
  );
}

function PawTrailLoader() {
  return (
    <div className="flex items-center gap-[3px]">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12, y: 8 }}
          animate={{
            opacity: [0, 1, 1, 1, 0.15],
            y: [8, 0, -3, 0, 5],
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
  );
}

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
          style={{ backgroundColor: "#FAF7F2" }}
        >
          <MeshOrbs />
          <GlowCircle />
          <FloatingParticles />
          <PawParticles />

          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-8"
            >
              <Image
                src="/images/logo.png"
                alt="The Ozone Vets"
                width={180}
                height={180}
                className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] object-contain"
                priority
              />
            </motion.div>

            <h1
              className="text-2xl sm:text-3xl md:text-4xl tracking-[0.2em] font-semibold mb-3"
              style={{
                fontFamily: "var(--font-playfair), serif",
                color: "#4A3A2A",
              }}
            >
              <StaggerText text="THE OZONE VETS" delay={1.8} />
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.6,
                delay: 2.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-12 h-[1px] mb-4 origin-center"
              style={{ backgroundColor: "#B98B5D" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 2.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-sm sm:text-base tracking-[0.15em] uppercase mb-12"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                color: "#7B6A58",
              }}
            >
              Advanced Veterinary Care
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 0.4 }}
            >
              <PawTrailLoader />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
