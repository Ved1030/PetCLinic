"use client";

import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  _error,
  reset,
}: {
  _error: Error & { digest?: string };
  reset: () => void;
}) {

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="text-center max-w-md mx-auto px-4">
        <div className="inline-flex p-4 rounded-2xl bg-red-50 mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-secondary-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-secondary-500 mb-8 leading-relaxed">
          An unexpected error occurred. Our team has been notified and we&apos;re working on a fix.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="gradient"
            size="lg"
            onClick={reset}
            className="group"
          >
            <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
