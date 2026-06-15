"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const HeroGlobe = dynamic(() => import("@/components/sections/HeroGlobe"), {
  ssr: false,
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        background: "var(--surface)",
      }}
    >
      {/* Stone grain noise overlay */}
      <div
        className="noise-overlay"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}
      />

      {/* Floating cloud layers */}
      <motion.div style={{ y: y1 }} className="hidden-desktop-only">
        <div style={{
            position: "absolute", top: "15%", left: "-5%", width: "500px", height: "200px",
            background: "radial-gradient(ellipse, rgba(200, 16, 46, 0.03) 0%, transparent 70%)",
            borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none",
        }} />
      </motion.div>

      <motion.div style={{ y: y2 }}>
        <div style={{
            position: "absolute", top: "60%", right: "0", width: "600px", height: "250px",
            background: "radial-gradient(ellipse, rgba(212, 175, 55, 0.03) 0%, transparent 70%)",
            borderRadius: "50%", filter: "blur(50px)", pointerEvents: "none",
        }} />
      </motion.div>

      {/* Top Section: Glowing Interactive Globe occupying full screen height so discs aren't cut */}
      <section style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 10,
      }}>
        <div style={{ width: "100%", height: "100%" }}>
          <HeroGlobe />
        </div>
      </section>

      {/* Bottom Section: Text Content */}
      <motion.section 
        style={{ opacity, zIndex: 10, width: "100%" }}
      >
        <div style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "4rem 2rem 10rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
          {/* HUD Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="label-hud"
            style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", textShadow: "0 0 10px rgba(0, 229, 255, 0.8)" }}
          >
            <div style={{ width: "40px", height: "1px", background: "#00e5ff", boxShadow: "0 0 10px #00e5ff" }} />
            ARCHEO-FUTURIST AGENCY
            <div style={{ width: "40px", height: "1px", background: "#00e5ff", boxShadow: "0 0 10px #00e5ff" }} />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              marginBottom: "1.5rem",
            }}
          >
            We Build the{" "}
            <span className="text-gradient-gold" style={{ textShadow: "0 0 30px rgba(212, 175, 55, 0.4)" }}>Future</span>
            <br />
            <span style={{ color: "var(--on-surface-variant)", fontSize: "0.6em", fontWeight: 500 }}>
              from Ancient Wisdom
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{
              fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
              fontWeight: 500,
              color: "var(--on-surface)",
              lineHeight: 1.7,
              marginBottom: "3rem",
              maxWidth: "600px",
            }}
          >
            Crafting premium websites, high-performance apps, and iconic brand
            identities where timeless design principles meet tomorrow&apos;s technology.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3.5rem" }}
          >
            <button
              id="hero-initiate-project"
              onClick={() => handleScroll("#contact")}
              style={{
                padding: "0.95rem 2.5rem",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0088ff, #00e5ff)",
                color: "#000",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                border: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(0, 229, 255, 0.6)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(0, 229, 255, 0.4)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              Initiate Project
            </button>

            <button
              id="hero-explore-legacy"
              onClick={() => handleScroll("#services")}
              style={{
                padding: "0.95rem 2rem",
                borderRadius: "12px",
                background: "transparent",
                color: "var(--ancient-gold)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.95rem",
                border: "1px solid var(--ancient-gold)",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(212, 175, 55, 0.2)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(212, 175, 55, 0.08)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              Explore Legacy
            </button>
          </motion.div>

          {/* Trust Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {["15+ Projects", "AI Solutions", "Secure Systems", "Global Reach"].map(
              (item, i) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  {i > 0 && (
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "var(--ancient-gold)",
                        opacity: 0.5,
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8rem",
                      color: "var(--on-surface-variant)",
                      fontWeight: 500,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {item}
                  </span>
                </div>
              )
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Bottom ancient divider */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--ancient-gold), transparent)",
          opacity: 0.15,
        }}
      />
    </section>
  );
}
