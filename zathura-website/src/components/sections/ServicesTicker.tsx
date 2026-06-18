"use client";

import { motion } from "framer-motion";

const services = [
  "Web Development",
  "Mobile Apps",
  "Brand Identity",
  "UI/UX Design",
  "AI Solutions",
  "Cloud Systems",
  "Cybersecurity",
  "Digital Strategy",
  "3D Modeling",
  "Logo Design",
];

export default function ServicesTicker() {
  const doubled = [...services, ...services];

  return (
    <section
      style={{
        background: "transparent",
        borderTop: "1px solid var(--outline-variant)",
        borderBottom: "1px solid var(--outline-variant)",
        overflow: "hidden",
        padding: "1.75rem 0",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
        }}
        className="ticker-track"
      >
        {doubled.map((service, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2.5rem",
              paddingRight: "2.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 500,
                color: "var(--on-surface-variant)",
                opacity: 0.7,
                letterSpacing: "-0.01em",
              }}
            >
              {service}
            </span>
            <span
              style={{
                color: "var(--electric-blue)",
                fontSize: "0.5rem",
                opacity: 0.4,
              }}
            >
              ◆
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
