"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/sections/Hero";
import ServicesTicker from "@/components/sections/ServicesTicker";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Ventures from "@/components/sections/Ventures";
import Impact from "@/components/sections/Impact";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

// Dynamically import LoadingIntro to avoid SSR canvas issues
const LoadingIntro = dynamic(() => import("@/components/sections/LoadingIntro"), {
  ssr: false,
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Always show loading on fresh page load (session-based skip removed so animation is always visible)
    // Uncomment below to skip on return visits once in production:
    // const hasVisited = sessionStorage.getItem("zv_visited");
    // if (hasVisited) { setLoading(false); setShowContent(true); }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("zv_visited", "1");
    setLoading(false);
    setTimeout(() => setShowContent(true), 80);
  };

  return (
    <>
      {loading && !showContent && (
        <LoadingIntro onComplete={handleLoadingComplete} />
      )}

      <AnimatePresence>
        {showContent && (
          <motion.main
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Hero />
            <ServicesTicker />
            <Services />
            <Process />
            <Ventures />
            <Impact />
            <Team />
            <Testimonials />
            <CTA />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
