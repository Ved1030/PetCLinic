"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2] via-[#F5F1EC] to-[#FAF7F2]" />
      <motion.div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, transparent 0%, rgba(185,139,93,0.04) 40%, transparent 70%)" }}
        animate={{ opacity: [0.1, 0.35, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "70vw", height: "70vw", maxWidth: 800, maxHeight: 800,
          top: "-20%", right: "-15%",
          background: "radial-gradient(circle, rgba(185,139,93,0.06) 0%, transparent 70%)",
          filter: "blur(140px)",
        }}
        animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "55vw", height: "55vw", maxWidth: 600, maxHeight: 600,
          bottom: "-10%", left: "-10%",
          background: "radial-gradient(circle, rgba(166,122,74,0.05) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
        animate={{ x: [0, -25, 30, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [exitPhase, setExitPhase] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => { setExitPhase(true); setIsVisible(false); }, 2200),
      setTimeout(() => onComplete(), 2700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (!mounted) {
    return <div className="fixed inset-0 z-[9999]" style={{ backgroundColor: "#FAF7F2" }} />;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.5, ease: EASE } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
          style={{ backgroundColor: "#FAF7F2" }}
        >
          <AmbientBackground />

          {exitPhase && (
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 200, height: 200,
                background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(250,247,242,0.4) 40%, transparent 70%)",
                filter: "blur(50px)",
              }}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 8, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          )}

          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: exitPhase ? 1.06 : 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 350, height: 350,
                    background: "radial-gradient(circle, rgba(185,139,93,0.07) 0%, transparent 60%)",
                    filter: "blur(30px)",
                  }}
                  animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.55, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <Image
                  src="/images/home-logo-2.png"
                  alt="Pet Clinic, Ghatkopar"
                  width={400}
                  height={400}
                  className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] object-contain relative z-10"
                  priority
                />
              </div>
            </motion.div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(250,247,242,0.5) 0%, transparent 100%)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
