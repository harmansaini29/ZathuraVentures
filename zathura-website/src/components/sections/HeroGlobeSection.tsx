"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

const HeroGlobe = dynamic(() => import("@/components/sections/HeroGlobe"), {
  ssr: false,
});

/**
 * HeroGlobeSection — the full-screen interactive 3D globe.
 * Occupies exactly 100vh so all platform discs are visible.
 * Sits at the very top of the page (section #home).
 */
export default function HeroGlobeSection() {
  return (
    <section
      id="home"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "var(--surface)",
        overflow: "hidden",
      }}
    >
      {/* Subtle noise grain */}
      <div
        className="noise-overlay"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}
      />

      {/* Globe fills the whole section */}
      <div style={{ width: "100%", height: "100%", zIndex: 2 }}>
        <HeroGlobe />
      </div>

      {/* Scroll cue at the bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 10,
          pointerEvents: "none",
          animation: "scroll-cue 2s ease-in-out infinite",
        }}
      >
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "rgba(0,229,255,0.5)",
          textTransform: "uppercase",
        }}>
          scroll
        </span>
        <div style={{
          width: "1px",
          height: "40px",
          background: "linear-gradient(to bottom, rgba(0,229,255,0.5), transparent)",
        }} />
      </div>

      <style>{`
        @keyframes scroll-cue {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
          50% { opacity: 1; transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
}
