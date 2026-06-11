"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/data/stats";

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || target === 0) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(stat.value, 2200, inView && !stat.isText);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      style={{
        textAlign: "center",
        padding: "2.5rem 1.5rem",
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "20px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Gold top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60px",
          height: "2px",
          background: "#EAB308",
          borderRadius: "0 0 2px 2px",
        }}
      />

      {/* Radial bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center top, rgba(234,179,8,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Counter / Text value */}
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: "#EAB308",
          lineHeight: 1,
          marginBottom: "0.625rem",
          // Number stats: large. Text stats: controlled size that won't overflow
          fontSize: stat.isText ? "clamp(1.5rem, 3vw, 2.25rem)" : "clamp(2.5rem, 4.5vw, 3.5rem)",
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {stat.isText ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.2 }}
          >
            {stat.textValue}
          </motion.span>
        ) : (
          <>
            {count}
            {stat.suffix}
          </>
        )}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          letterSpacing: "-0.01em",
          marginBottom: "0.375rem",
        }}
      >
        {stat.label}
      </div>

      {/* Description */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.82rem",
          color: "var(--text-muted)",
        }}
      >
        {stat.description}
      </div>
    </motion.div>
  );
}

export default function Impact() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section
      id="impact"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div className="section-padding" style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
            By The Numbers
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
            Impact at Every Scale
          </h2>
        </motion.div>

        {/* Stats grid — force exactly 4 columns on desktop */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
          }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
