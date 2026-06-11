"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ventures } from "@/data/ventures";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

export default function Ventures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  const prev = () => setActiveIndex((i) => (i === 0 ? ventures.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === ventures.length - 1 ? 0 : i + 1));

  return (
    <section
      id="ventures"
      style={{
        background: "var(--bg-primary)",
        overflow: "hidden",
      }}
    >
      <div className="section-padding" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3.5rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
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
              Our Portfolio
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
              Featured Ventures
            </h2>
          </div>

          {/* Nav arrows */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              id="ventures-prev"
              onClick={prev}
              aria-label="Previous venture"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid var(--border-color)",
                background: "var(--bg-card)",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
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
              <ChevronLeft size={18} />
            </button>
            <button
              id="ventures-next"
              onClick={next}
              aria-label="Next venture"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid var(--border-color)",
                background: "var(--bg-card)",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
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
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Ventures Slider */}
        <div
          id="ventures-slider"
          style={{
            display: "flex",
            gap: "1.5rem",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: "2rem",
            paddingTop: "1rem",
            margin: "0 -1.5rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
          className="hide-scrollbar"
        >
          {ventures.map((venture, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={venture.id}
                layout
                initial={{ opacity: 0, y: 32 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: isActive ? 1.02 : 1,
                }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => {
                  setActiveIndex(i);
                  const el = document.getElementById(`venture-card-${i}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }}
                id={`venture-card-${i}`}
                className="venture-card"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${isActive ? "rgba(234,179,8,0.4)" : "var(--border-color)"}`,
                  borderRadius: "20px",
                  padding: "2rem",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  boxShadow: isActive
                    ? "0 8px 32px rgba(234,179,8,0.12)"
                    : "none",
                  flex: "0 0 85%", // Mobile view
                  scrollSnapAlign: "center",
                }}
              >
                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse at top right, ${
                      venture.accentColor
                    }18 0%, transparent 60%)`,
                    pointerEvents: "none",
                    transition: "opacity 0.3s",
                  }}
                />

                {/* Status badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "100px",
                    background:
                      venture.status === "soon"
                        ? "rgba(107,114,128,0.1)"
                        : "rgba(234,179,8,0.1)",
                    border: `1px solid ${
                      venture.status === "soon"
                        ? "rgba(107,114,128,0.2)"
                        : "rgba(234,179,8,0.2)"
                    }`,
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background:
                        venture.status === "soon" ? "#6B7280" : "#EAB308",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color:
                        venture.status === "soon"
                          ? "var(--text-muted)"
                          : "#EAB308",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {venture.status === "soon" ? "Coming Soon" : venture.category}
                  </span>
                </div>

                {/* Name */}
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    marginBottom: "0.5rem",
                  }}
                >
                  {venture.name}
                </h3>

                {/* Tagline */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    color: "#EAB308",
                    fontWeight: 500,
                    marginBottom: "1rem",
                  }}
                >
                  {venture.tagline}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    marginBottom: "1.5rem",
                  }}
                >
                  {venture.description}
                </p>

                {/* CTA */}
                {venture.status !== "soon" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      color: "var(--text-muted)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      fontFamily: "'Inter', sans-serif",
                      transition: "color 0.2s",
                    }}
                  >
                    Learn more <ArrowUpRight size={14} />
                  </div>
                )}

                {/* Coming soon overlay */}
                {venture.status === "soon" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "2px",
                        background: "linear-gradient(90deg, transparent, rgba(107,114,128,0.3), transparent)",
                        borderRadius: "1px",
                      }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "1.5rem",
          }}
        >
          {ventures.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                const el = document.getElementById(`venture-card-${i}`);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
              }}
              aria-label={`Go to venture ${i + 1}`}
              style={{
                width: i === activeIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === activeIndex ? "#EAB308" : "var(--border-hover)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 768px) {
          .venture-card {
            flex: 0 0 360px !important;
            scroll-snap-align: start !important;
          }
        }
      `}</style>
    </section>
  );
}
