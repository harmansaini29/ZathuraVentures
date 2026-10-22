"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatsCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function StatsCounter({
  value,
  duration = 2.0,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: StatsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Re-triggers in live motion every time the user arrives at this section
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let animFrameId: number;
    let delayTimer: NodeJS.Timeout;

    if (isInView) {
      // Always reset to 0 immediately so live rolling motion is clearly witnessed
      setDisplayValue(0);

      // Snappy 80ms delay for card entrance, then live rolling numbers
      delayTimer = setTimeout(() => {
        let startTime: number | null = null;

        const animateCount = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const elapsed = (timestamp - startTime) / 1000;
          const progress = Math.min(elapsed / duration, 1);

          // Quintic ease-out curve for dramatic live acceleration and settling
          const easeOut = 1 - Math.pow(1 - progress, 3.6);
          const current = easeOut * value;
          setDisplayValue(current);

          if (progress < 1) {
            animFrameId = requestAnimationFrame(animateCount);
          } else {
            setDisplayValue(value);
          }
        };

        animFrameId = requestAnimationFrame(animateCount);
      }, 80);
    } else {
      setDisplayValue(0);
    }

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(animFrameId);
    };
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      suppressHydrationWarning
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn("inline-flex items-baseline tabular-nums", className)}
    >
      <span>{prefix}</span>
      <span>{displayValue.toFixed(decimals)}</span>
      <span>{suffix}</span>
    </motion.span>
  );
}
