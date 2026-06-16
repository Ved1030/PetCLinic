"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { NAV_LINKS, CONTACT_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

function isActiveLink(pathname: string, hash: string, linkHref: string): boolean {
  const [linkPath, linkHash = ""] = linkHref.split("#");
  if (linkHash) {
    return pathname === linkPath && hash === `#${linkHash}`;
  }
  return pathname === linkHref && !hash;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const allLinks = NAV_LINKS;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="absolute inset-x-0 top-0 bottom-0 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full pt-24 pb-8 px-4 sm:px-8 overflow-y-auto">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1"
              >
                {allLinks.map((link) => {
                  const isActive = isActiveLink(pathname, hash, link.href);
                  return (
                    <motion.div key={link.href} variants={itemVariants}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "block py-3.5 px-4 rounded-xl text-[17px] font-medium transition-all duration-200 border-b border-[#EFE7DD]/50 last:border-b-0",
                          isActive
                            ? "text-[#B98B5D] bg-[#FAF7F2]"
                            : "text-[#4A3A2A] hover:text-[#B98B5D] hover:bg-[#FAF7F2]/60"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="space-y-4 pt-6 border-t border-[#EFE7DD]"
              >
                {/* Phone */}
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-[#FAF7F2] border border-[#EFE7DD]"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#B98B5D] to-[#B98B5D]">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[15px] font-medium text-[#4A3A2A]">
                    {CONTACT_INFO.phone}
                  </span>
                </a>

                {/* Book Appointment */}
                <Link href="/appointment" onClick={onClose}>
                  <button className="w-full h-[52px] bg-gradient-to-r from-[#B98B5D] to-[#B98B5D] text-white rounded-full font-medium text-[16px] shadow-[0_4px_16px_rgba(185,139,93,0.25)] hover:shadow-[0_6px_24px_rgba(185,139,93,0.35)] transition-shadow">
                    Book Appointment
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
