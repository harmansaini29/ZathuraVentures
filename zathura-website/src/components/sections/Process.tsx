"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, Target, Code2, TrendingUp } from "lucide-react";

const steps = [
  {
    id: "idea",
    number: "01",
    icon: <Lightbulb size={22} />,
    title: "Idea",
    description:
      "Every great venture starts with a spark. We help you define, validate, and sharpen your concept into a clear, executable vision.",
  },
  {
    id: "strategy",
    number: "02",
    icon: <Target size={22} />,
    title: "Strategy",
    description:
      "We architect a roadmap — market positioning, technology stack, timeline, and growth strategy — built for long-term success.",
  },
  {
    id: "build",
    number: "03",
    icon: <Code2 size={22} />,
    title: "Build",
    description:
      "Our engineering and design teams bring the vision to life with precision — secure, scalable, and polished to the last pixel.",
  },
  {
    id: "scale",
    number: "04",
    icon: <TrendingUp size={22} />,
    title: "Scale",
    description:
      "From launch to growth, we support your expansion with infrastructure optimization, feature iteration, and ecosystem partnerships.",
  },
];

function Step({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      style={{
        display: "flex",
        gap: "2rem",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      {/* Left: Number + connector */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {/* Icon circle */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: inView
              ? "rgba(234,179,8,0.1)"
              : "var(--bg-card)",
            border: "1px solid rgba(234,179,8,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#EAB308",
            position: "relative",
            zIndex: 2,
            transition: "all 0.5s ease",
            flexShrink: 0,
          }}
        >
          {step.icon}
        </div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.4, ease: "easeOut" }}
            style={{
              width: "1px",
              height: "100px",
              background: "linear-gradient(to bottom, rgba(234,179,8,0.4), rgba(234,179,8,0.05))",
              transformOrigin: "top",
              marginTop: "4px",
            }}
          />
        )}
      </div>

      {/* Right: Content */}
      <div style={{ paddingBottom: isLast ? 0 : "3.5rem", paddingTop: "0.75rem" }}>
        {/* Step label */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "rgba(234,179,8,0.7)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          Step {step.number}
        </span>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}
        >
          {step.title}
        </h3>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.95rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            maxWidth: "440px",
          }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div
        className="section-padding process-grid"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "start",
        }}
      >
        {/* Left: Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          style={{ position: "sticky", top: "120px" }}
          className="process-header"
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
            How We Work
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "1.25rem",
              lineHeight: 1.1,
            }}
          >
            From Vision to Reality
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              maxWidth: "380px",
            }}
          >
            Our battle-tested process ensures every product we deliver is
            purposeful, scalable, and built for the long run — not just launch
            day.
          </p>

          {/* Decorative element */}
          <div
            style={{
              marginTop: "2.5rem",
              padding: "1.5rem",
              background: "rgba(234,179,8,0.05)",
              border: "1px solid rgba(234,179,8,0.15)",
              borderRadius: "12px",
              maxWidth: "320px",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "2rem",
                fontWeight: 800,
                color: "#EAB308",
                letterSpacing: "-0.03em",
                marginBottom: "0.25rem",
              }}
            >
              100%
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
              }}
            >
              Client-aligned delivery from concept to launch
            </div>
          </div>
        </motion.div>

        {/* Right: Timeline steps */}
        <div className="process-steps">
          {steps.map((step, i) => (
            <Step key={step.id} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .process-header {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}
