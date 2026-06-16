"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  className?: string;
  containerClassName?: string;
  overlay?: boolean;
  overlayClassName?: string;
  parallax?: boolean;
  reveal?: boolean;
  zoomOnHover?: boolean;
  aspectRatio?: string;
  gradient?: string;
}

export default function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  priority = false,
  quality = 90,
  className,
  containerClassName,
  overlay = false,
  overlayClassName,
  parallax = false,
  reveal = false,
  zoomOnHover = false,
  aspectRatio,
  gradient,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const imageContent = (
    <div
      className={cn(
        "relative overflow-hidden",
        !fill && !aspectRatio && "aspect-[16/10]",
        aspectRatio === "4/3" && "aspect-[4/3]",
        aspectRatio === "3/4" && "aspect-[3/4]",
        aspectRatio === "1/1" && "aspect-square",
        aspectRatio === "16/9" && "aspect-video",
        aspectRatio === "21/9" && "aspect-[21/9]",
        containerClassName
      )}
    >
      {/* Gradient placeholder background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-secondary-100 via-secondary-200 to-secondary-300",
          isLoaded && "opacity-0 transition-opacity duration-500"
        )}
      />

      {/* Shimmer loading effect */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 shimmer" />
      )}

      {/* Image */}
      {!isError ? (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width || 800 : undefined}
          height={!fill ? height || 500 : undefined}
          quality={quality}
          priority={priority}
          className={cn(
            "object-cover transition-all duration-700",
            zoomOnHover && "group-hover:scale-110",
            isLoaded ? "opacity-100" : "opacity-0",
            parallax && "group-hover:scale-105",
            className
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'%3E%3Cfilter id='b'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='800' height='500' fill='%23E9DDD0' filter='url(%23b)'/%3E%3C/svg%3E"
        />
      ) : (
        /* Premium SVG fallback */
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-100 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary-200/50 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B98B5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        </div>
      )}

      {/* Gradient overlay */}
      {overlay && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent",
            overlayClassName
          )}
        />
      )}

      {/* Custom gradient overlay */}
      {gradient && (
        <div className={cn("absolute inset-0", gradient)} />
      )}
    </div>
  );

  if (reveal) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="group"
      >
        {imageContent}
      </motion.div>
    );
  }

  if (zoomOnHover || parallax) {
    return <div className="group overflow-hidden rounded-xl">{imageContent}</div>;
  }

  return imageContent;
}
