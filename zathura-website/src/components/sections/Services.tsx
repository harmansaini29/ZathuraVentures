"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { services } from "@/data/services";
import {
  Globe,
  Smartphone,
  Shield,
  Palette,
  Cpu,
  Cloud,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={24} />,
  Smartphone: <Smartphone size={24} />,
  Shield: <Shield size={24} />,
  Palette: <Palette size={24} />,
  Cpu: <Cpu size={24} />,
  Cloud: <Cloud size={24} />,
};

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className="card-hover"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "16px",
        padding: "2rem",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at top left, rgba(234,179,8,0.04) 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "12px",
          background: "rgba(234,179,8,0.08)",
          border: "1px solid rgba(234,179,8,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#EAB308",
          marginBottom: "1.25rem",
        }}
      >
        {iconMap[service.icon] || <Globe size={24} />}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
          marginBottom: "0.625rem",
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          lineHeight: 1.65,
        }}
      >
        {service.description}
      </p>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "2rem",
          right: "2rem",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(234,179,8,0.3), transparent)",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
        className="card-accent-line"
      />
    </motion.div>
  );
}

export default function Services() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section id="services" style={{ background: "var(--bg-primary)" }}>
      <div className="section-padding" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
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
            What We Build
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Services Designed for Scale
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            From initial concept to enterprise-grade deployment — we deliver
            technology solutions built to grow with your ambitions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "6rem",
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
