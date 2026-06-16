import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FAF7F2",
          100: "#F5EFE5",
          200: "#E9DDD0",
          300: "#D8C9B3",
          400: "#B98B5D",
          500: "#A67A4A",
          600: "#8A633D",
          700: "#6E4F31",
          800: "#5A4A38",
          900: "#4A3A2A",
          950: "#2D2218",
        },
        secondary: {
          50: "#FAF7F2",
          100: "#F5EFE5",
          200: "#E9DDD0",
          300: "#D8C9B3",
          400: "#B98B5D",
          500: "#7B6A58",
          600: "#6B5A48",
          700: "#5A4A38",
          800: "#4A3A2A",
          900: "#3A2A1A",
          950: "#2D2218",
        },
        accent: {
          50: "#FAF7F2",
          100: "#F5EFE5",
          200: "#E9DDD0",
          300: "#B98B5D",
          400: "#A67A4A",
          500: "#8A633D",
          600: "#6E4F31",
          700: "#5A4A38",
          800: "#4A3A2A",
          900: "#3A2A1A",
          950: "#2D2218",
        },
        muted: "#F5F1EC",
        border: "#EFE7DD",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.3s ease-out forwards",
        "scale-in": "scaleIn 0.2s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(185,139,93,0.15)",
        "glow-md": "0 0 30px rgba(185,139,93,0.2)",
        "glow-lg": "0 0 60px rgba(185,139,93,0.25)",
        "luxury": "0 4px 40px rgba(74,58,42,0.08)",
        "luxury-lg": "0 8px 60px rgba(74,58,42,0.12)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
