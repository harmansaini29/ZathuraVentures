"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  const next = useCallback(() =>
    setCurrent((i) => (i === testimonials.length - 1 ? 0 : i + 1)), []);
  const prev = () =>
    setCurrent((i) => (i === 0 ? testimonials.length - 1 : i - 1));

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 4500);
    return () => clearInterval(interval);
  }, [paused, next]);

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div
        className="section-padding"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#EAB308",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            Client Stories
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
            }}
          >
            Trusted by Builders
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: "24px",
            padding: "clamp(2rem, 5vw, 3.5rem)",
            position: "relative",
            overflow: "hidden",
            minHeight: "260px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* BG radial */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at top left, rgba(234,179,8,0.04) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />

          {/* Quote icon */}
          <div
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              color: "rgba(234,179,8,0.15)",
            }}
          >
            <Quote size={60} />
          </div>

          {/* Quote text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  lineHeight: 1.75,
                  marginBottom: "2.5rem",
                  fontStyle: "italic",
                  maxWidth: "680px",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: `${t.accentColor}18`,
                    border: `1.5px solid ${t.accentColor}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: t.accentColor,
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t.author}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.82rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <button
            id="testimonial-prev"
            onClick={prev}
            aria-label="Previous testimonial"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#EAB308";
              (e.currentTarget as HTMLButtonElement).style.color = "#EAB308";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-color)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
            }}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots */}
          <div style={{ display: "flex", gap: "0.375rem" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Testimonial ${i + 1}`}
                style={{
                  width: i === current ? "24px" : "7px",
                  height: "7px",
                  borderRadius: "4px",
                  background: i === current ? "#EAB308" : "var(--border-hover)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            id="testimonial-next"
            onClick={next}
            aria-label="Next testimonial"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#EAB308";
              (e.currentTarget as HTMLButtonElement).style.color = "#EAB308";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-color)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
