"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function generatePawPoints(count = 50) {
  const pads = [
    { cx: 50, cy: 62, rx: 13, ry: 9 },
    { cx: 32, cy: 34, rx: 7, ry: 5.5 },
    { cx: 50, cy: 27, rx: 6.5, ry: 5 },
    { cx: 68, cy: 34, rx: 7, ry: 5.5 },
    { cx: 40, cy: 44, rx: 5.5, ry: 4.5 },
    { cx: 60, cy: 44, rx: 5.5, ry: 4.5 },
  ];
  const perPad = Math.ceil(count / pads.length);
  const pts: { x: number; y: number }[] = [];

  pads.forEach((p) => {
    for (let i = 0; i < perPad; i++) {
      if (pts.length >= count) return;
      const a = Math.random() * Math.PI * 2;
      const r = 0.25 + Math.random() * 0.75;
      pts.push({ x: p.cx + Math.cos(a) * p.rx * r, y: p.cy + Math.sin(a) * p.ry * r });
    }
  });

  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = pts[i];
    pts[i] = pts[j];
    pts[j] = tmp;
  }
  return pts.slice(0, count);
}

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
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500,
          top: "40%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(185,139,93,0.04) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
        animate={{ scale: [1, 1.2, 0.9, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
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

function FloatingParticles() {
  const items = useMemo(
    () => Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: 3 + ((i * 19 + 5) % 94),
      top: 5 + ((i * 27 + 3) % 90),
      sz: 1 + (i % 3),
      del: i * 0.35,
      dur: 4 + (i % 5),
      dir: i % 2 === 0 ? 1 : -1,
    })),
    []
  );

  return (
    <>
      {items.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.sz, height: p.sz,
            left: `${p.left}%`, top: `${p.top}%`,
            backgroundColor: `rgba(185,139,93,${0.06 + (p.id % 4) * 0.03})`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.18, 0.06, 0.12, 0],
            y: [0, -8 - p.id * 2, -18 - p.id * 3, -28],
            x: [0, p.dir * 6, -p.dir * 4, 0],
          }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

function PawFormation({ state }: { state: "scattered" | "forming" | "formed" | "dissolving" }) {
  const targets = useMemo(() => generatePawPoints(50), []);
  const particles = useMemo(
    () => targets.map((t, i) => ({
      id: i,
      sx: 5 + Math.random() * 90,
      sy: 5 + Math.random() * 90,
      tx: t.x,
      ty: t.y,
      sz: 1.6 + Math.random() * 2.4,
      del: i * 0.022,
      warm: Math.random() > 0.5,
    })),
    [targets]
  );

  const isActive = state === "forming" || state === "formed";

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {particles.map((p) => {
        const animTarget = (() => {
          switch (state) {
            case "forming":
              return { left: `${p.tx}%`, top: `${p.ty}%`, opacity: [0, 0.55, 0.25, 0.4], scale: [0, 1.3, 0.85, 1] };
            case "formed":
              return { left: `${p.tx}%`, top: `${p.ty}%`, opacity: [0.25, 0.5, 0.15, 0.4], scale: [1, 1.12, 0.92, 1] };
            case "dissolving":
              return { left: `${50 + (p.tx - 50) * 4}%`, top: `${50 + (p.ty - 50) * 4}%`, opacity: 0, scale: 0.15 };
            default:
              return { left: `${p.sx}%`, top: `${p.sy}%`, opacity: [0, 0.15, 0.05, 0.12], y: [0, -10, 8, -3] };
          }
        })();

        const animDur = state === "forming" ? 1.2 : state === "dissolving" ? 0.7 : 0.5;
        const animDel = state === "forming" ? p.del : state === "dissolving" ? p.del * 0.4 : 0;

        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.sz, height: p.sz,
              backgroundColor: p.warm ? "rgba(185,139,93,0.5)" : "rgba(185,139,93,0.22)",
              boxShadow: isActive ? `0 0 ${p.sz * 2}px rgba(185,139,93,0.12)` : "none",
            }}
            initial={{ left: `${p.sx}%`, top: `${p.sy}%`, opacity: 0 }}
            animate={animTarget}
            transition={{ duration: animDur, delay: animDel, ease: EASE }}
          />
        );
      })}

      {isActive && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 180, height: 180,
            background: "radial-gradient(circle, rgba(185,139,93,0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0.2, 0.5, 0.25, 0.4], scale: [0.8, 1.1, 0.95, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

function Sparkles() {
  const items = useMemo(
    () => Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: 20 + Math.random() * 60,
      top: 20 + Math.random() * 40,
      del: 2 + Math.random() * 0.8,
      sz: 2 + (i % 3),
    })),
    []
  );

  return (
    <>
      {items.map((s) => (
        <motion.div
          key={s.id}
          className="absolute pointer-events-none"
          style={{ left: `${s.left}%`, top: `${s.top}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.4, 0], scale: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: s.del, ease: "easeInOut" }}
        >
          <svg width={s.sz * 2} height={s.sz * 2} viewBox="0 0 8 8" fill="rgba(185,139,93,0.3)">
            <path d="M4 0 L4.5 3.5 L8 4 L4.5 4.5 L4 8 L3.5 4.5 L0 4 L3.5 3.5 Z" />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [pawState, setPawState] = useState<"scattered" | "forming" | "formed" | "dissolving">("scattered");
  const [pawDone, setPawDone] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [exitPhase, setExitPhase] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPawState("forming"), 400),
      setTimeout(() => setPawState("formed"), 1200),
      setTimeout(() => setPawState("dissolving"), 1800),
      setTimeout(() => setShowLogo(true), 2000),
      setTimeout(() => setPawDone(true), 2300),
      setTimeout(() => { setExitPhase(true); setIsVisible(false); }, 3800),
      setTimeout(() => onComplete(), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const logoPhase = showLogo && (exitPhase ? "exiting" : "visible");

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
          <FloatingParticles />
          <Sparkles />

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
            {!pawDone && <PawFormation state={pawState} />}

            {showLogo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: logoPhase === "exiting" ? 1.06 : 1 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <div className="relative flex items-center justify-center">
                  <motion.div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: 280, height: 280,
                      background: "radial-gradient(circle, rgba(185,139,93,0.07) 0%, transparent 60%)",
                      filter: "blur(30px)",
                    }}
                    animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.55, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <Image
                    src="/images/home-logo-2.png"
                    alt="Pet Clinic, Ghatkopar"
                    width={300}
                    height={300}
                    className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] object-contain relative z-10"
                    priority
                  />
                </div>
              </motion.div>
            )}
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
