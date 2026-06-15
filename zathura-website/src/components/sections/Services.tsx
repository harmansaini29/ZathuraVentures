"use client";

import React, { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Zap, Code, Shield, Palette, Layers, Globe } from "lucide-react";

const freelanceHighlights = [
  {
    id: "app",
    title: "End-to-End Applications",
    desc: "From initial spark to scalable cloud deployment. We engineer full-stack platforms that command attention.",
    icon: <Code size={32} />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    accent: "var(--electric-blue)",
    glow: "rgba(200, 16, 46, 0.2)",
  },
  {
    id: "uiux",
    title: "Immersive UI/UX",
    desc: "Awwwards-caliber interfaces combining glassmorphism, WebGL, and flawless interaction design.",
    icon: <Palette size={28} />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    accent: "var(--ancient-gold)",
    glow: "rgba(212, 175, 55, 0.2)",
  },
  {
    id: "security",
    title: "Bulletproof Security",
    desc: "Enterprise-grade architecture with zero-trust principles and robust data encryption.",
    icon: <Shield size={28} />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    accent: "#ff0055",
    glow: "rgba(255, 0, 85, 0.2)",
  },
  {
    id: "ai",
    title: "AI Integration",
    desc: "Injecting machine learning, intelligent automation, and custom LLMs directly into your workflow.",
    icon: <Zap size={32} />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    accent: "var(--electric-blue)",
    glow: "rgba(200, 16, 46, 0.2)",
  },
  {
    id: "web3",
    title: "Web3 & Smart Contracts",
    desc: "Decentralized applications, tokenomics, and secure blockchain infrastructure.",
    icon: <Globe size={28} />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    accent: "var(--ancient-gold)",
    glow: "rgba(212, 175, 55, 0.2)",
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    desc: "High-availability serverless deployments built to scale infinitely.",
    icon: <Layers size={28} />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    accent: "var(--electric-blue)",
    glow: "rgba(200, 16, 46, 0.2)",
  },
];

const TiltCard = ({ item, index, inView }: { item: any; index: number; inView: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${item.colSpan} ${item.rowSpan} group`}
    >
      <div
        className="glass h-full w-full"
        style={{
          position: "relative",
          borderRadius: "24px",
          padding: "2.5rem",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transform: "translateZ(30px)",
          background: "rgba(6, 20, 35, 0.4)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Animated Background Gradient Border Effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${item.glow}, transparent 40%)`,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            style={{
              width: item.rowSpan.includes("2") ? "64px" : "48px",
              height: item.rowSpan.includes("2") ? "64px" : "48px",
              borderRadius: "16px",
              background: `rgba(0, 0, 0, 0.4)`,
              border: `1px solid ${item.accent}50`,
              color: item.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2rem",
              boxShadow: `0 0 20px transparent`,
            }}
            whileHover={{ y: -5, scale: 1.05, boxShadow: `0 10px 30px ${item.glow}` }}
            className="icon-box"
          >
            {item.icon}
          </motion.div>
        </div>

        <div style={{ position: "relative", zIndex: 1, transform: "translateZ(20px)" }}>
          <h3
            style={{
              fontSize: item.rowSpan.includes("2") ? "2.2rem" : "1.4rem",
              fontWeight: 800,
              marginBottom: "0.75rem",
              letterSpacing: "-0.01em",
              color: "#fff",
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: item.rowSpan.includes("2") ? "1.1rem" : "0.95rem",
              lineHeight: 1.6,
            }}
          >
            {item.desc}
          </p>
        </div>

        {/* Accent Line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "0%",
            height: "4px",
            background: item.accent,
            transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: `0 0 10px ${item.glow}`,
          }}
          className="accent-line"
        />

        <style>{`
          .group:hover .accent-line { width: 100% !important; }
        `}</style>
      </div>
    </motion.div>
  );
};

export default function Services() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" style={{ background: "var(--surface)", position: "relative", padding: "8rem 0", perspective: "1000px", overflow: "hidden" }}>
      {/* === Premium CSS Tech Background: No Three.js, Pure Performance === */}

      {/* 1. Diagonal scan-line grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(0,136,255,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,136,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* 2. Radial glow: deep centre pulse */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "900px",
        height: "900px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(0,136,255,0.06) 0%, rgba(200,16,46,0.03) 40%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
        animation: "services-pulse 6s ease-in-out infinite alternate",
      }} />

      {/* 3. Corner bracket accents */}
      {[
        { top: "2rem", left: "2rem", borderTop: "2px solid rgba(0,229,255,0.25)", borderLeft: "2px solid rgba(0,229,255,0.25)" },
        { top: "2rem", right: "2rem", borderTop: "2px solid rgba(0,229,255,0.25)", borderRight: "2px solid rgba(0,229,255,0.25)" },
        { bottom: "2rem", left: "2rem", borderBottom: "2px solid rgba(0,229,255,0.25)", borderLeft: "2px solid rgba(0,229,255,0.25)" },
        { bottom: "2rem", right: "2rem", borderBottom: "2px solid rgba(0,229,255,0.25)", borderRight: "2px solid rgba(0,229,255,0.25)" },
      ].map((style, i) => (
        <div key={i} style={{
          position: "absolute",
          width: "50px",
          height: "50px",
          pointerEvents: "none",
          zIndex: 0,
          ...style,
        }} />
      ))}

      {/* 4. Floating hex nodes */}
      {[
        { x: "8%", y: "15%", size: 10, delay: 0 },
        { x: "92%", y: "20%", size: 8, delay: 1.2 },
        { x: "15%", y: "75%", size: 6, delay: 0.5 },
        { x: "85%", y: "70%", size: 12, delay: 2 },
        { x: "50%", y: "5%", size: 7, delay: 0.8 },
        { x: "50%", y: "95%", size: 9, delay: 1.5 },
      ].map((n, i) => (
        <div key={i} style={{
          position: "absolute",
          left: n.x,
          top: n.y,
          width: `${n.size}px`,
          height: `${n.size}px`,
          borderRadius: "50%",
          background: i % 2 === 0 ? "#00e5ff" : "#d4af37",
          boxShadow: `0 0 ${n.size * 3}px ${i % 2 === 0 ? "#00e5ff" : "#d4af37"}`,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.6,
          animation: `services-float ${3 + n.delay}s ease-in-out infinite alternate`,
          animationDelay: `${n.delay}s`,
        }} />
      ))}

      <style>{`
        @keyframes services-pulse {
          from { transform: translate(-50%, -50%) scale(0.95); opacity: 0.7; }
          to { transform: translate(-50%, -50%) scale(1.05); opacity: 1; }
        }
        @keyframes services-float {
          from { transform: translateY(0px); opacity: 0.5; }
          to { transform: translateY(-12px); opacity: 0.9; }
        }
      `}</style>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "5rem" }}
        >
          <div className="label-hud" style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "32px", height: "1px", background: "var(--electric-blue)" }} />
            FREELANCE ARSENAL
          </div>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              maxWidth: "800px",
            }}
          >
            Engineering <span className="text-gradient-electric">Digital Reality</span>
            <br />
            <span style={{ color: "var(--on-surface-variant)", fontSize: "0.6em", fontWeight: 400 }}>
              What We Do & How We Build
            </span>
          </h2>
        </motion.div>

        {/* Asymmetrical Masonry/Bento Grid */}
        <div
          className="freelance-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            gridAutoRows: "minmax(200px, auto)",
          }}
        >
          {freelanceHighlights.map((item, i) => (
            <TiltCard key={item.id} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .freelance-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .md\\:col-span-2 { grid-column: span 2 / span 2; }
          .md\\:col-span-1 { grid-column: span 1 / span 1; }
        }
        @media (max-width: 640px) {
          .freelance-grid {
            grid-template-columns: 1fr !important;
          }
          .md\\:col-span-2, .md\\:col-span-1 { grid-column: span 1 / span 1; }
        }
      `}</style>
    </section>
  );
}
