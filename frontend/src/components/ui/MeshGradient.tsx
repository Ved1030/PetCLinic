"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MeshGradientProps {
  className?: string;
  colors?: string[];
  animate?: boolean;
  intensity?: "subtle" | "medium" | "strong";
}

export default function MeshGradient({
  className,
  colors,
  animate = true,
  intensity: _intensity = "medium",
}: MeshGradientProps) {
  const defaultColors = [
    "rgba(185,139,93,0.06)",
    "rgba(185,139,93,0.04)",
    "rgba(166,122,74,0.04)",
    "rgba(233,221,208,0.05)",
  ];

  const c = colors || defaultColors;

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <motion.div
        className="absolute -top-[15%] -left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px]"
        style={{ backgroundColor: c[0] }}
        animate={animate ? {
          x: [0, 20, 0, -20, 0],
          y: [0, -20, 0, 20, 0],
          scale: [1, 1.05, 0.97, 1.03, 1],
        } : undefined}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -top-[10%] right-[5%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full blur-[100px]"
        style={{ backgroundColor: c[1] }}
        animate={animate ? {
          x: [0, -15, 0, 15, 0],
          y: [0, 15, 0, -15, 0],
          scale: [1, 0.97, 1.03, 1, 1],
        } : undefined}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[15%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full blur-[90px]"
        style={{ backgroundColor: c[2] }}
        animate={animate ? {
          x: [0, 15, 0, -15, 0],
          y: [0, 15, 0, -15, 0],
        } : undefined}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-[10%] -right-[10%] w-[38vw] h-[38vw] max-w-[480px] max-h-[480px] rounded-full blur-[110px]"
        style={{ backgroundColor: c[3] }}
        animate={animate ? {
          x: [0, -20, 0, 20, 0],
          y: [0, 20, 0, -20, 0],
          scale: [1, 1.03, 0.97, 1, 1],
        } : undefined}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}
