"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ecosystemNodes } from "@/data/ecosystemNodes";

export default function EcosystemTree() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setHoveredNode(null);
  };

  if (isMobile) {
    // Mobile: Stacked circular/oval cards, minimal layout
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
        <div
          style={{
            padding: "1rem",
            borderRadius: "16px",
            background: "rgba(234,179,8,0.1)",
            border: "1px solid rgba(234,179,8,0.2)",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          <div style={{ color: "#EAB308", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
            Zathura Ventures
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Ecosystem Core
          </div>
        </div>

        {ecosystemNodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              padding: "1rem",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: node.color }} />
            <div>
              <div style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "0.95rem" }}>{node.label}</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{node.sublabel}</div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Desktop: Interactive floating node tree
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1000px",
      }}
    >
      <motion.div
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 75, damping: 20 }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background Orbit Rings */}
        <svg
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.15,
          }}
          viewBox="0 0 600 600"
        >
          <motion.circle
            cx="300"
            cy="300"
            r="240"
            fill="none"
            stroke="#EAB308"
            strokeWidth="1"
            strokeDasharray="4 8"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
          <motion.circle
            cx="300"
            cy="300"
            r="160"
            fill="none"
            stroke="#EAB308"
            strokeWidth="1"
            strokeDasharray="2 12"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
        </svg>

        {/* Connection lines */}
        <svg
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            pointerEvents: "none",
            zIndex: 0,
          }}
          viewBox="-250 -250 500 500"
        >
          {ecosystemNodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = Math.cos(rad) * node.radius;
            const y = Math.sin(rad) * node.radius;
            const isHovered = hoveredNode === node.id;
            const isDimmed = hoveredNode && hoveredNode !== node.id;

            return (
              <motion.line
                key={`line-${node.id}`}
                x1="0"
                y1="0"
                x2={x}
                y2={y}
                stroke={isHovered ? node.color : "rgba(255,255,255,0.1)"}
                strokeWidth={isHovered ? 2 : 1}
                initial={{ opacity: 0.5 }}
                animate={{
                  opacity: isDimmed ? 0.2 : isHovered ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
        </svg>

        {/* Center Node */}
        <motion.div
          style={{
            position: "absolute",
            zIndex: 10,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(7, 11, 20, 0.8)",
            border: "1px solid rgba(234,179,8,0.3)",
            boxShadow: "0 0 30px rgba(234,179,8,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
          }}
          animate={{
            boxShadow: hoveredNode ? "0 0 20px rgba(234,179,8,0.05)" : "0 0 40px rgba(234,179,8,0.2)",
          }}
        >
          <div style={{ color: "#EAB308", fontWeight: 700, fontSize: "1.1rem", fontFamily: "'Space Grotesk', sans-serif", textAlign: "center", lineHeight: 1.1 }}>
            Zathura<br />Ventures
          </div>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#EAB308", marginTop: "6px" }} />
        </motion.div>

        {/* Orbiting Nodes */}
        {ecosystemNodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = Math.cos(rad) * node.radius;
          const y = Math.sin(rad) * node.radius;
          const isHovered = hoveredNode === node.id;
          const isDimmed = hoveredNode && hoveredNode !== node.id;

          return (
            <motion.div
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => {
                let targetId = "";
                if (["harman", "team"].includes(node.id)) targetId = "#team";
                else if (["ventures", "future"].includes(node.id)) targetId = "#ventures";
                else targetId = "#services"; // design, product, engineering, ai
                
                const el = document.querySelector(targetId);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              initial={{ opacity: isDimmed ? 0.3 : 1, scale: 0.8 }}
              animate={{
                opacity: isDimmed ? 0.3 : 1,
                scale: isHovered ? 1.05 : 1,
                y: [0, -6, 0], // subtle breathing float
              }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.2 },
                y: { duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
              }}
              style={{
                position: "absolute",
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
                zIndex: isHovered ? 20 : 5,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Node dot + label */}
              <div
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "100px",
                  background: isHovered ? "rgba(255,255,255,0.08)" : "rgba(7, 11, 20, 0.6)",
                  border: `1px solid ${isHovered ? node.color : "rgba(255,255,255,0.1)"}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backdropFilter: "blur(4px)",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: node.color,
                    boxShadow: isHovered ? `0 0 10px ${node.color}` : "none",
                  }}
                />
                <span style={{ color: "var(--text-primary)", fontSize: "0.85rem", fontWeight: 500, whiteSpace: "nowrap" }}>
                  {node.label}
                </span>
              </div>

              {/* Hover Info Card (Glassmorphism) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "220px",
                      padding: "1rem",
                      borderRadius: "12px",
                      background: "rgba(15, 23, 42, 0.85)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                      textAlign: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <div style={{ color: node.color, fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                      {node.hoverName}
                    </div>
                    {node.hoverRole && (
                      <div style={{ color: "var(--text-primary)", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                        {node.hoverRole}
                      </div>
                    )}
                    <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.4 }}>
                      {node.hoverDesc}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
