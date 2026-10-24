"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CarouselImage {
  src: string;
  alt?: string;
  title?: string;
}

export interface CylinderCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CarouselImage[];
  containerClassName?: string;
  cardClassName?: string;
  animationDuration?: number; // in seconds
  cardWidth?: number; // in pixels
}

export const CylinderCarousel = React.forwardRef<HTMLDivElement, CylinderCarouselProps>(
  (
    {
      images,
      className,
      containerClassName,
      cardClassName,
      animationDuration = 28,
      cardWidth = 270,
      ...props
    },
    ref
  ) => {
    const N = images.length;
    
    // Balanced radius calculation: Positive translateZ so center card is in front
    // and side cards curve away smoothly into the distance (Z decreases)
    const angleRad = (2 * Math.PI) / Math.max(N, 1);
    const radiusPx = Math.round((0.5 * cardWidth + 12) / Math.tan(angleRad / 2));

    const customStyle = {
      "--n": N,
      "--w": `${cardWidth}px`,
      "--r": `${radiusPx}px`,
      "--ba": `calc(1turn / var(--n))`,
      "--anim-dur": `${animationDuration}s`,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={cn(
          "w-full h-full min-h-[360px] sm:min-h-[420px] grid place-items-center overflow-hidden relative",
          className
        )}
        style={{
          perspective: "48em",
          maskImage: "linear-gradient(to right, transparent 0%, #000 22%, #000 78%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 22%, #000 78%, transparent 100%)",
        }}
        {...props}
      >
        <div
          className={cn(
            "grid place-items-center [transform-style:preserve-3d] hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing motion-reduce:!animate-[ry_128s_linear_infinite]",
            containerClassName
          )}
          style={{
            ...customStyle,
            animation: "ry var(--anim-dur) linear infinite",
          }}
        >
          {/* Keyframe continuous smooth rotation */}
          <style>
            {`
              @keyframes ry {
                to { transform: rotateY(1turn); }
              }
            `}
          </style>
          
          {images.map((img, i) => (
            <div
              key={i}
              className={cn(
                "[grid-area:1/1] relative rounded-2xl overflow-hidden [backface-visibility:hidden] select-none group border border-white/15 shadow-[0_20px_45px_rgba(0,0,0,0.85)] transition-all hover:scale-105",
                cardClassName
              )}
              style={{
                width: "var(--w)",
                aspectRatio: "16/10",
                "--i": i,
                // Center card at angle 0 is at +R (front, closest to camera)
                // Side cards rotate away and recede into background
                transform: "rotateY(calc(var(--i) * var(--ba))) translateZ(var(--r))",
              } as React.CSSProperties}
            >
              <img
                src={img.src}
                alt={img.alt || `Carousel image ${i}`}
                className="w-full h-full object-cover"
              />
              {img.title && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-3.5 sm:p-4">
                  <span className="font-sans font-bold text-white text-xs sm:text-sm leading-snug line-clamp-1">
                    {img.title}
                  </span>
                  {img.alt && (
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#00e5ff] uppercase tracking-wider mt-0.5 line-clamp-1 font-semibold">
                      {img.alt}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

CylinderCarousel.displayName = "CylinderCarousel";
