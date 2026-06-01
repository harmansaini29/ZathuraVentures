"use client";

import { motion } from "framer-motion";
import EcosystemTree from "./EcosystemTree";

export default function Hero() {
  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "var(--hero-gradient)",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      {/* Top radial highlight */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(234,179,8,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "8rem 1.5rem 4rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "4rem",
          width: "100%",
        }}
        className="hero-grid"
      >
        {/* Left: Text content */}
        <div style={{ zIndex: 10 }}>
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.75rem, 5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "1.5rem",
            }}
          >
            We Build Brands, Software &amp; Digital Experiences
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
              fontWeight: 400,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              maxWidth: "520px",
            }}
          >
            Transforming ambitious ideas into scalable ventures and secure technology ecosystems.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}
          >
            {/* Primary */}
            <button
              id="hero-explore-services"
              onClick={() => handleScroll("#services")}
              style={{
                padding: "0.875rem 1.75rem",
                borderRadius: "10px",
                background: "#EAB308",
                color: "#070B14",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s ease",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#CA8A04";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 8px 24px rgba(234,179,8,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#EAB308";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Explore Services
            </button>

            {/* Secondary */}
            <button
              id="hero-lets-build"
              onClick={() => handleScroll("#contact")}
              style={{
                padding: "0.875rem 1.75rem",
                borderRadius: "10px",
                background: "transparent",
                color: "var(--text-primary)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.95rem",
                border: "1px solid var(--border-hover)",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#EAB308";
                (e.currentTarget as HTMLButtonElement).style.color = "#EAB308";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-hover)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              Let&apos;s Build Together
            </button>
          </motion.div>

          {/* Minimal Trust Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {[
              "15+ Projects",
              "AI Solutions",
              "Secure Systems",
              "Growing Ecosystem",
            ].map((item, i) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {i > 0 && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--border-hover)" }} />}
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Interactive Ecosystem Tree */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hero-orbit-container"
          style={{
            height: "560px",
            position: "relative",
          }}
        >
          <EcosystemTree />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .hero-orbit-container {
            height: auto !important;
            min-height: 400px;
          }
        }
      `}</style>
    </section>
  );
}
