"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import ServicesTicker from "@/components/sections/ServicesTicker";
import Services from "@/components/sections/Services";
import AboutTeam from "@/components/sections/AboutTeam";
import ProjectsCarousel from "@/components/sections/ProjectsCarousel";
import CombinedCTA from "@/components/sections/CombinedCTA";
import Footer from "@/components/layout/Footer";

// Dynamically import heavy WebGL sections — no SSR
const LightningGlobeIntro = dynamic(
  () => import("@/components/sections/LightningGlobeIntro"),
  { ssr: false }
);
const UnifiedCore = dynamic(
  () => import("@/components/sections/UnifiedCore"),
  { ssr: false }
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Always show intro on fresh load
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
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "#061423",
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
        className="bg-[#020a14] text-white min-h-screen"
        style={{ 
          pointerEvents: showContent ? "auto" : "none",
          height: showContent ? "auto" : "100vh",
          overflow: showContent ? "visible" : "hidden"
        }}
      >
        {/* 1. Hero Globe — full-viewport, always first */}
        <UnifiedCore />

        {/* 2. Digital Constellation (Team) */}
        <AboutTeam />

        {/* Services */}
        <ServicesTicker />
        <Services />

        {/* 4. Our Legacy */}
        <ProjectsCarousel />

        {/* 5. The Future Builder (Combined CTA) */}
        <CombinedCTA />

        <Footer />
      </motion.main>
    </>
  );
}
