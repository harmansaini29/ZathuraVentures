"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingIntroProps {
  onComplete: () => void;
}

export default function LoadingIntro({ onComplete }: LoadingIntroProps) {
  const [showText, setShowText] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show text after logo strokes finish drawing
    const t1 = setTimeout(() => setShowText(true), 2200);
    // Start exit
    const t2 = setTimeout(() => setVisible(false), 3900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, scale: 1.15 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#070B14",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* ── Ambient radial glow behind logo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: "560px",
              height: "560px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(234,179,8,0.08) 0%, rgba(234,179,8,0.02) 40%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Dot grid background ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(234,179,8,0.15) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              pointerEvents: "none",
            }}
          />

          {/* ── SVG: ZV stroke-draw logo ── */}
          <svg
            viewBox="0 0 300 140"
            width="260"
            height="122"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginBottom: "2.75rem", overflow: "visible" }}
          >
            <defs>
              {/* Soft glow filter on strokes */}
              <filter id="stroke-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/*
              Z letter — drawn in one continuous path
              Top bar → Diagonal → Bottom bar
            */}
            <motion.path
              d="M 12,16 L 112,16 L 12,124 L 112,124"
              stroke="#EAB308"
              strokeWidth="10"
              filter="url(#stroke-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 1.2, delay: 0.25, ease: "easeInOut" },
                opacity: { duration: 0.01, delay: 0.25 },
              }}
            />

            {/*
              V letter — both arms draw simultaneously top → meeting point
              Creates a "converging" effect — both strokes race to meet at the center bottom
            */}

            {/* V: left arm */}
            <motion.path
              d="M 152,16 L 206,124"
              stroke="#EAB308"
              strokeWidth="10"
              filter="url(#stroke-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.55, delay: 0.78, ease: "easeInOut" },
                opacity: { duration: 0.01, delay: 0.78 },
              }}
            />

            {/* V: right arm (draw from top-right down to same meeting point) */}
            <motion.path
              d="M 268,16 L 206,124"
              stroke="#EAB308"
              strokeWidth="10"
              filter="url(#stroke-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.55, delay: 0.78, ease: "easeInOut" },
                opacity: { duration: 0.01, delay: 0.78 },
              }}
            />

            {/* Meeting-point dot pulse when V arms converge */}
            <motion.circle
              cx="206"
              cy="124"
              r="5"
              fill="#EAB308"
              filter="url(#stroke-glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.8, 1], opacity: [0, 1, 0.7] }}
              transition={{ duration: 0.45, delay: 1.3, ease: "easeOut" }}
            />
          </svg>

          {/* ── Text reveal ── */}
          <AnimatePresence>
            {showText && (
              <motion.div
                key="brand-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: "center", position: "relative" }}
              >
                {/* Company name — expands from compressed letterSpacing */}
                <motion.div
                  initial={{ letterSpacing: "0.55em", opacity: 0, y: 6 }}
                  animate={{ letterSpacing: "0.18em", opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(0.85rem, 2.2vw, 1.1rem)",
                    fontWeight: 600,
                    color: "#F8FAFC",
                    textTransform: "uppercase",
                    marginBottom: "0.875rem",
                  }}
                >
                  Zathura Ventures
                </motion.div>

                {/* Expanding divider line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(234,179,8,0.7) 30%, rgba(234,179,8,0.7) 70%, transparent)",
                    marginBottom: "0.875rem",
                    transformOrigin: "center",
                    width: "280px",
                    maxWidth: "80vw",
                    margin: "0 auto 0.875rem",
                  }}
                />

                {/* Tagline */}
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 0.65, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.6rem, 1.4vw, 0.72rem)",
                    color: "#EAB308",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    fontWeight: 400,
                  }}
                >
                  Crafting Tomorrow&apos;s Brands
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Progress bar (bottom edge) ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3.8, ease: "linear" }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "2px",
              background:
                "linear-gradient(90deg, rgba(234,179,8,0) 0%, #EAB308 50%, rgba(234,179,8,0) 100%)",
              transformOrigin: "left center",
            }}
          />

          {/* ── Corner brackets ── */}
          {(["tl", "tr", "bl", "br"] as const).map((corner) => (
            <motion.div
              key={corner}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                position: "absolute",
                width: "22px",
                height: "22px",
                ...(corner === "tl"
                  ? { top: "28px", left: "28px", borderTop: "1.5px solid rgba(234,179,8,0.35)", borderLeft: "1.5px solid rgba(234,179,8,0.35)" }
                  : corner === "tr"
                  ? { top: "28px", right: "28px", borderTop: "1.5px solid rgba(234,179,8,0.35)", borderRight: "1.5px solid rgba(234,179,8,0.35)" }
                  : corner === "bl"
                  ? { bottom: "28px", left: "28px", borderBottom: "1.5px solid rgba(234,179,8,0.35)", borderLeft: "1.5px solid rgba(234,179,8,0.35)" }
                  : { bottom: "28px", right: "28px", borderBottom: "1.5px solid rgba(234,179,8,0.35)", borderRight: "1.5px solid rgba(234,179,8,0.35)" }),
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
