"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, CONTACT_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";

function isActiveLink(pathname: string, hash: string, linkHref: string): boolean {
  const [linkPath, linkHash = ""] = linkHref.split("#");
  if (linkHash) {
    return pathname === linkPath && hash === `#${linkHash}`;
  }
  return pathname === linkHref && !hash;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isScrolled
            ? "bg-white/85 backdrop-blur-[10px]"
            : "bg-transparent"
        )}
        style={{ borderTop: "none", borderBottom: "none", outline: "none" }}
      >
        <nav
          className={cn(
            "max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-out",
            isScrolled ? "h-[72px]" : "h-[88px]"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <motion.div
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#B98B5D] to-[#B98B5D] rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#B98B5D] to-[#B98B5D] shadow-lg shadow-[#B98B5D]/20">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="6" cy="6" r="2.5" />
                  <circle cx="18" cy="6" r="2.5" />
                  <circle cx="12" cy="14" r="4" />
                </svg>
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-[15px] font-display font-bold tracking-[-0.02em] text-[#4A3A2A] leading-none">
                THE OZONE VETS
              </span>
              <span className="text-[8.5px] text-[#7B6A58] tracking-[0.2em] uppercase font-medium mt-0.5">
                Advanced Veterinary Care
              </span>
            </div>
          </Link>

          {/* Desktop Nav - Center */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-12">
            <div className="flex items-center gap-8 xl:gap-12">
              {NAV_LINKS.map((link) => {
                const isActive = isActiveLink(pathname, hash, link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="relative text-[15px] font-medium tracking-[-0.01em] transition-all duration-300 py-2 group"
                  >
                    <span className={cn(
                      "relative z-10 transition-colors duration-300",
                      isActive ? "text-[#4A3A2A]" : "text-[#7B6A58] group-hover:text-[#4A3A2A]"
                    )}>
                      {link.label}
                    </span>
                    <span
                      className={cn(
                        "absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#B98B5D] rounded-full transition-transform duration-300 ease-out origin-left",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            {/* Phone - Compact */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/40 backdrop-blur-sm border border-[#EFE7DD] hover:border-[#B98B5D]/50 hover:bg-white/70 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#E9DDD0] to-[#FAF7F2] group-hover:from-[#B98B5D]/20 group-hover:to-[#E9DDD0]/30 transition-colors duration-300">
                <Phone className="w-3 h-3 text-[#B98B5D]" />
              </div>
              <span className="text-[13px] font-medium text-[#4A3A2A] group-hover:text-[#B98B5D] transition-colors leading-none">
                {CONTACT_INFO.phone}
              </span>
            </a>

            {/* Book Appointment Button - Compact Pill */}
            <Link href="/appointment">
              <motion.button
                suppressHydrationWarning
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden bg-gradient-to-r from-[#B98B5D] to-[#B98B5D] text-white h-[44px] px-6 rounded-full font-medium text-[14px] tracking-[-0.01em] shadow-[0_4px_16px_rgba(185,139,93,0.25)] hover:shadow-[0_6px_24px_rgba(185,139,93,0.35)] transition-shadow duration-300"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Book Appointment
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#F5EFE5]/60 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-[#4A3A2A]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-[#4A3A2A]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}
