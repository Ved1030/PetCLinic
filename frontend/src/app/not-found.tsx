import type { Metadata } from "next";
import Link from "next/link";
import { PawPrint, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "404 - Page Not Found | " + SITE_CONFIG.name,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="text-center max-w-md mx-auto px-4">
        <div className="inline-flex p-4 rounded-2xl bg-[#FAF7F2] mb-6">
          <PawPrint className="w-10 h-10 text-[#B98B5D]" />
        </div>
        <h1 className="text-6xl sm:text-7xl font-display font-bold text-[#4A3A2A] mb-4">404</h1>
        <h2 className="text-xl sm:text-2xl font-display font-semibold text-[#3A2A1A] mb-2">
          Page Not Found
        </h2>
        <p className="text-[#7B6A58] mb-8 leading-relaxed">
          Oops! It seems like this page has wandered off. Let&apos;s get you back on track.
        </p>
        <Link href="/">
          <Button variant="gradient" size="lg" className="group">
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
