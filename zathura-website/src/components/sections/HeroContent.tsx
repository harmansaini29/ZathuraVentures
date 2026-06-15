"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * HeroContent — the "We Build the Future" text section.
 * Placed AFTER the Digital Masterminds (AboutTeam) section.
 * Uses scroll-triggered animations for a smooth reveal.
 */
export default function HeroContent() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="hero-content"
      style={{
        background: "var(--surface)",
        position: "relative",
        padding: "10rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Background glow blobs */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "700px",
        height: "400px",
        background: "radial-gradient(ellipse, rgba(0,136,255,0.05) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "10%",
        left: "20%",
        width: "500px",
        height: "300px",
        background: "radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      {/* Thin top border line */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "10%",
        right: "10%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), rgba(212,175,55,0.3), transparent)",
      }} />

      <div style={{ maxWidth: "800px", width: "100%", position: "relative", zIndex: 1 }}>

        {/* HUD label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.0 }}
          className="label-hud"
          style={{
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
          }}
        >
          <div style={{ width: "40px", height: "1px", background: "#00e5ff", boxShadow: "0 0 8px #00e5ff" }} />
          ARCHEO-FUTURIST AGENCY
          <div style={{ width: "40px", height: "1px", background: "#00e5ff", boxShadow: "0 0 8px #00e5ff" }} />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(3.5rem, 6vw, 6rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            marginBottom: "1.5rem",
          }}
        >
          We Build the{" "}
          <span
            className="text-gradient-gold"
            style={{ textShadow: "0 0 40px rgba(212,175,55,0.35)" }}
          >
            Future
          </span>
          <br />
          <span style={{ color: "var(--on-surface-variant)", fontSize: "0.55em", fontWeight: 400, letterSpacing: "-0.01em" }}>
            from Ancient Wisdom
          </span>
        </motion.h1>

        {/* Glow divider under headline */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{
            width: "200px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #00e5ff, rgba(212,175,55,0.7), transparent)",
            boxShadow: "0 0 12px rgba(0,229,255,0.4)",
            margin: "0 auto 2.5rem",
          }}
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
            fontWeight: 400,
            color: "var(--on-surface)",
            lineHeight: 1.8,
            marginBottom: "3.5rem",
            maxWidth: "560px",
            margin: "0 auto 3.5rem",
          }}
        >
          Crafting premium websites, high-performance apps, and iconic brand
          identities — where timeless design meets tomorrow&apos;s technology.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "4rem" }}
        >
          <button
            id="hero-content-initiate-project"
            onClick={() => handleScroll("#contact")}
            style={{
              padding: "1rem 2.75rem",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #0088ff, #00e5ff)",
              color: "#000",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "1rem",
              border: "none",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              boxShadow: "0 0 24px rgba(0,229,255,0.4), 0 4px 20px rgba(0,136,255,0.3)",
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.boxShadow = "0 8px 40px rgba(0,229,255,0.7), 0 4px 20px rgba(0,136,255,0.4)";
              btn.style.transform = "translateY(-3px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.boxShadow = "0 0 24px rgba(0,229,255,0.4), 0 4px 20px rgba(0,136,255,0.3)";
              btn.style.transform = "translateY(0) scale(1)";
            }}
          >
            Initiate Project →
          </button>

          <button
            id="hero-content-explore-legacy"
            onClick={() => handleScroll("#services")}
            style={{
              padding: "1rem 2.25rem",
              borderRadius: "14px",
              background: "rgba(212,175,55,0.06)",
              color: "var(--ancient-gold)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "1rem",
              border: "1px solid rgba(212,175,55,0.5)",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              cursor: "pointer",
              letterSpacing: "0.01em",
              backdropFilter: "blur(4px)",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.boxShadow = "0 8px 32px rgba(212,175,55,0.2)";
              btn.style.background = "rgba(212,175,55,0.12)";
              btn.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.boxShadow = "none";
              btn.style.background = "rgba(212,175,55,0.06)";
              btn.style.transform = "translateY(0)";
            }}
          >
            Explore Legacy
          </button>
        </motion.div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {["15+ Projects Delivered", "AI Solutions", "Secure Systems", "Global Reach"].map((item, i) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              {i > 0 && (
                <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(212,175,55,0.5)" }} />
              )}
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                color: "var(--on-surface-variant)",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}>
                {item}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Bottom border line */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "10%",
        right: "10%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)",
      }} />
    </section>
  );
}
