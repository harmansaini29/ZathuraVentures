"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" style={{ background: "var(--bg-primary)" }}>
      <div
        className="section-padding"
        style={{ maxWidth: "1280px", margin: "0 auto" }}
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "28px",
            padding: "clamp(3rem, 8vw, 6rem) clamp(2rem, 6vw, 5rem)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grid bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
              opacity: 0.3,
              pointerEvents: "none",
            }}
          />

          {/* Center radial gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center, rgba(234,179,8,0.08) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          {/* Corner decorations */}
          {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
            <div
              key={pos}
              style={{
                position: "absolute",
                [pos.includes("top") ? "top" : "bottom"]: "1.5rem",
                [pos.includes("left") ? "left" : "right"]: "1.5rem",
                width: "40px",
                height: "40px",
                borderTop: pos.includes("top") ? "1px solid rgba(234,179,8,0.2)" : "none",
                borderBottom: pos.includes("bottom") ? "1px solid rgba(234,179,8,0.2)" : "none",
                borderLeft: pos.includes("left") ? "1px solid rgba(234,179,8,0.2)" : "none",
                borderRight: pos.includes("right") ? "1px solid rgba(234,179,8,0.2)" : "none",
                borderRadius:
                  pos === "top-left"
                    ? "8px 0 0 0"
                    : pos === "top-right"
                    ? "0 8px 0 0"
                    : pos === "bottom-left"
                    ? "0 0 0 8px"
                    : "0 0 8px 0",
              }}
            />
          ))}

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#EAB308",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "1.5rem",
              }}
            >
              Start Your Journey
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                lineHeight: 1.05,
                marginBottom: "1.5rem",
              }}
            >
              Ready To Build the
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #EAB308, #F59E0B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Next Big Thing?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.1rem",
                color: "var(--text-secondary)",
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
                  background: "#EAB308",
                  color: "#070B14",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#CA8A04";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 12px 32px rgba(234,179,8,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#EAB308";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
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
                  color: "var(--text-primary)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textDecoration: "none",
                  border: "1px solid var(--border-hover)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#EAB308";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#EAB308";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-hover)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
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
