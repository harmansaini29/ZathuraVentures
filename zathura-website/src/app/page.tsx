"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import HeroGlobeSection from "@/components/sections/HeroGlobeSection";
import HeroContent from "@/components/sections/HeroContent";
import ServicesTicker from "@/components/sections/ServicesTicker";
import Services from "@/components/sections/Services";
import AboutTeam from "@/components/sections/AboutTeam";
import ProjectsCarousel from "@/components/sections/ProjectsCarousel";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

// Dynamically import the WebGL intro to avoid SSR issues
const LightningGlobeIntro = dynamic(
  () => import("@/components/sections/LightningGlobeIntro"),
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

      <AnimatePresence>
        {showContent && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* 1. Globe — always first, full viewport */}
            <HeroGlobeSection />

            {/* 2. Services ticker + Services grid */}
            <ServicesTicker />
            <Services />

            {/* 3. Digital Masterminds */}
            <AboutTeam />

            {/* 4. We Build the Future — after Masterminds */}
            <HeroContent />

            {/* 5. Rest of page */}
            <ProjectsCarousel />
            <CTA />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
