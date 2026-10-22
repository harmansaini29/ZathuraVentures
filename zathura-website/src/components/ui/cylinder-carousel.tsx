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
      animationDuration = 32,
      cardWidth = 310,
      ...props
    },
    ref
  ) => {
    const N = images.length;
    
    // Radius calculation: positive distance so cards at front are prominent
    // and ending/backside cards curve smoothly INSIDE into the depth
    const angleRad = (2 * Math.PI) / Math.max(N, 1);
    const radiusPx = Math.round((0.5 * cardWidth + 18) / Math.tan(angleRad / 2));

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
          "w-full h-full min-h-[580px] sm:min-h-[640px] grid place-items-center overflow-hidden",
          className
        )}
        style={{
          perspective: "65em",
          maskImage: "linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%)",
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
          {/* Keyframe rotation */}
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
                "[grid-area:1/1] relative rounded-2xl overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all hover:scale-105 group select-none [backface-visibility:hidden]",
                cardClassName
              )}
              style={{
                width: "var(--w)",
                aspectRatio: "7/10",
                "--i": i,
                // Positive translateZ: Cards curve inward/inside towards back (-R), front cards face viewer at (+R)
                transform: "rotateY(calc(var(--i) * var(--ba))) translateZ(var(--r))",
              } as React.CSSProperties}
            >
              <img
                src={img.src}
                alt={img.alt || `Carousel image ${i}`}
                className="w-full h-full object-cover"
              />
              {img.title && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#010612]/95 via-[#010612]/40 to-transparent flex flex-col justify-end p-5">
                  <span className="font-sans font-bold text-white text-base sm:text-lg leading-snug line-clamp-1">
                    {img.title}
                  </span>
                  {img.alt && (
                    <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-wider mt-1.5 line-clamp-1 font-semibold">
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
