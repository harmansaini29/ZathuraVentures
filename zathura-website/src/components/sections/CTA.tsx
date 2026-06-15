"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" style={{ background: "var(--surface)" }}>
      <div className="section-padding" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass"
          style={{
            borderRadius: "24px",
            padding: "clamp(3.5rem, 8vw, 6rem) clamp(2rem, 6vw, 5rem)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center, rgba(200, 16, 46, 0.06) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />

          {/* Corner brackets */}
          {(["tl", "tr", "bl", "br"] as const).map((corner) => (
            <div
              key={corner}
              style={{
                position: "absolute",
                width: "36px",
                height: "36px",
                ...(corner === "tl"
                  ? { top: "1.5rem", left: "1.5rem", borderTop: "1px solid rgba(212, 175, 55, 0.2)", borderLeft: "1px solid rgba(212, 175, 55, 0.2)", borderRadius: "6px 0 0 0" }
                  : corner === "tr"
                  ? { top: "1.5rem", right: "1.5rem", borderTop: "1px solid rgba(212, 175, 55, 0.2)", borderRight: "1px solid rgba(212, 175, 55, 0.2)", borderRadius: "0 6px 0 0" }
                  : corner === "bl"
                  ? { bottom: "1.5rem", left: "1.5rem", borderBottom: "1px solid rgba(212, 175, 55, 0.2)", borderLeft: "1px solid rgba(212, 175, 55, 0.2)", borderRadius: "0 0 0 6px" }
                  : { bottom: "1.5rem", right: "1.5rem", borderBottom: "1px solid rgba(212, 175, 55, 0.2)", borderRight: "1px solid rgba(212, 175, 55, 0.2)", borderRadius: "0 0 6px 0" }),
              }}
            />
          ))}

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="label-hud" style={{ marginBottom: "1.5rem", justifyContent: "center", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "24px", height: "1px", background: "var(--ancient-gold)" }} />
              START YOUR JOURNEY
              <div style={{ width: "24px", height: "1px", background: "var(--ancient-gold)" }} />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              Ready To Build the
              <br />
              <span className="text-gradient-gold">Next Big Thing?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{
                fontSize: "1.1rem",
                color: "var(--on-surface-variant)",
                maxWidth: "480px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.7,
              }}
            >
              Let&apos;s talk about your vision. We turn ambitious ideas into
              world-class digital ventures.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.6 }}
              style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            >
              <a
                id="cta-start-journey"
                href="mailto:hello@zathuraventures.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem 2.25rem",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #c8102e, #0088ff)",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 40px rgba(200, 16, 46, 0.3)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                Start Your Journey
                <ArrowRight size={18} />
              </a>

              <a
                href="mailto:hello@zathuraventures.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem 2.25rem",
                  borderRadius: "12px",
                  background: "transparent",
                  color: "var(--ancient-gold)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textDecoration: "none",
                  border: "1px solid var(--ancient-gold)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(212, 175, 55, 0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212, 175, 55, 0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                Send a Message
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
