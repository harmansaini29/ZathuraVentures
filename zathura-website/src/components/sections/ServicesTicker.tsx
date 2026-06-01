"use client";

import { tickerItems } from "@/data/services";

export default function ServicesTicker() {
  // Duplicate for seamless loop
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <section
      style={{
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
        background: "var(--bg-secondary)",
        overflow: "hidden",
        padding: "1.25rem 0",
        position: "relative",
      }}
    >
      {/* Edge fades */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "120px",
          height: "100%",
          background: "linear-gradient(to right, var(--bg-secondary), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "120px",
          height: "100%",
          background: "linear-gradient(to left, var(--bg-secondary), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        className="ticker-track"
        style={{
          display: "flex",
          gap: "0",
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
                padding: "0 2rem",
                transition: "color 0.2s",
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: "#EAB308",
                fontSize: "0.5rem",
                opacity: 0.7,
                flexShrink: 0,
              }}
            >
              ●
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
