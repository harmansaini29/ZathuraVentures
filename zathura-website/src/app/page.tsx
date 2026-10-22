"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import StatsNumbersSection from "@/components/sections/StatsNumbersSection";
import ClientLogosMarqueeSection from "@/components/sections/ClientLogosMarqueeSection";
import ProjectsCarousel from "@/components/sections/ProjectsCarousel";
import CombinedCTA from "@/components/sections/CombinedCTA";
import Footer from "@/components/layout/Footer";

// Dynamically import heavy WebGL / 3D Canvas sections — no SSR for flawless hydration & 60fps performance
const LightningGlobeIntro = dynamic(
  () => import("@/components/sections/LightningGlobeIntro"),
  { ssr: false }
);
const UnifiedCore = dynamic(
  () => import("@/components/sections/UnifiedCore"),
  { ssr: false }
);
const SpiralGlassHollow = dynamic(
  () => import("@/components/sections/SpiralGlassHollow"),
  { ssr: false }
);
const FounderGLBSection = dynamic(
  () => import("@/components/sections/FounderGLBSection"),
  { ssr: false }
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if intro was already viewed in this session
    const visited = sessionStorage.getItem("zv_visited");
    if (visited) {
      setLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("zv_visited", "1");
    setLoading(false);
    setShowContent(true);
  };

  return (
    <>
      {/* SSR FOUC Blocker: Covers the Navbar instantly on server render */}
      <div
        suppressHydrationWarning
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "#010612",
          pointerEvents: "none",
          transition: "opacity 0.4s ease-out",
          opacity: showContent ? 0 : 1,
        }}
      />

      {loading && !showContent && (
        <LightningGlobeIntro onComplete={handleIntroComplete} />
      )}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-[#010612] text-white min-h-screen"
        style={{ 
          pointerEvents: showContent ? "auto" : "none",
          height: showContent ? "auto" : "100vh",
          overflow: showContent ? "visible" : "hidden"
        }}
      >
        {/* 1. Hero Globe — with continuous long straight laser beam flowing downwards */}
        <UnifiedCore />

        {/* 2. Circular Component with Left/Right flanks on High-Grade Websites & Enterprise Applications */}
        <SpiralGlassHollow />

        {/* 3. 3D GLB Model Section — founder.glb properly aligned and proper fit */}
        <FounderGLBSection />

        {/* 4. Numbering Component — StatsCounter metrics ($120M+, 45+, 99.98%, 100%) */}
        <StatsNumbersSection />

        {/* 5. Opposite Direction Moving Carousels — Enlarged Symbols, Track 1 Left, Track 2 Right */}
        <ClientLogosMarqueeSection />

        {/* 6. Selected Projects — PS5 Games Edition with Dim Dynamic Project Theme */}
        <ProjectsCarousel />

        {/* 8. Connect Us — Vertical Column Made (Left) + Transmission Form (Right) */}
        <CombinedCTA />

        {/* 9. Footer */}
        <Footer />
      </motion.main>
    </>
  );
}
