"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

const teamData = [
  { id: "ceo", name: "Founder & CEO", role: "Visionary", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500", x: 50, y: 5, width: 260, height: 350 },
  { id: "manager1", name: "Alex", role: "Operations", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500", x: 25, y: 35, width: 220, height: 300 },
  { id: "manager2", name: "Sarah", role: "Lead Dev", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500", x: 75, y: 35, width: 220, height: 300 },
  { id: "dev1", name: "David", role: "Frontend", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500", x: 12, y: 65, width: 190, height: 260 },
  { id: "dev2", name: "Elena", role: "Backend", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=500", x: 38, y: 70, width: 190, height: 260 },
  { id: "dev3", name: "Marcus", role: "UI/UX", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=500", x: 62, y: 70, width: 190, height: 260 },
  { id: "dev4", name: "Chloe", role: "AI Engineer", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=500", x: 88, y: 65, width: 190, height: 260 }
];

const connections = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 2, to: 5 },
  { from: 2, to: 6 },
];

/**
 * TeamMember3D handles the interactive 3D perspective mouse-tracking effect.
 * It physically rotates the 2D plane to create a '3D model' sensation.
 */
function TeamMember3D({ member, i, isMobile, aboutInView, containerWidth, containerHeight }: any) {
  const isCEO = i === 0;
  
  // Coordinate calculations
  const top = isMobile ? `${i * 14}%` : `${member.y}%`;
  const left = isMobile ? (i % 2 === 0 ? "25%" : "75%") : `${member.x}%`;
  const mobileLeft = isCEO ? "50%" : left;

  // 3D Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  
  // Map mouse position to rotation (-15deg to 15deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
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
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={aboutInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.15 + 0.2, ease: "easeOut" }}
      style={{
        position: "absolute",
        top,
        left: isMobile ? mobileLeft : left,
        transform: `translate(-50%, 0)`,
        zIndex: 10 - i,
        width: `${member.width}px`,
        height: `${member.height}px`,
        perspective: 1200, // Very important for the 3D effect depth
      }}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d", // Allows children to pop out in Z space
        }}
      >
        {/* The Poster Image (Z=0) */}
        <div style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius: "20px 20px 0 0",
          maskImage: "linear-gradient(to bottom, black 50%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 95%)",
        }}>
          <img
            src={member.image}
            alt={member.name}
            className="poster-img"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              filter: "grayscale(30%) contrast(1.1)",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease",
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: isCEO 
              ? "linear-gradient(to bottom, transparent 40%, rgba(212,175,55,0.2) 100%)"
              : "linear-gradient(to bottom, transparent 40%, rgba(0,229,255,0.2) 100%)",
            mixBlendMode: "overlay",
          }} />
        </div>

        {/* Floating Clouds Layer (Z=30px) */}
        <div 
          className="poster-clouds"
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "-30px",
            right: "-30px",
            height: "140px",
            backgroundImage: "url('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/cloud.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.8,
            filter: isCEO 
              ? "drop-shadow(0 0 10px rgba(212,175,55,0.5)) sepia(100%) hue-rotate(35deg) saturate(300%)" 
              : "drop-shadow(0 0 10px rgba(0,229,255,0.5)) sepia(100%) hue-rotate(180deg) saturate(300%)",
            mixBlendMode: "screen",
            pointerEvents: "none",
            transform: "translateZ(30px)", // POP OUT in 3D
            transition: "all 0.6s ease",
          }}
        />

        {/* Floating Text Layer (Z=60px) */}
        <div style={{
          position: "absolute",
          bottom: "15px",
          left: "0",
          right: "0",
          textAlign: "center",
          transform: "translateZ(60px)", // POP OUT heavily in 3D
        }}>
          <h3 style={{ 
            margin: "0 0 4px", 
            color: "#fff", 
            fontSize: isCEO ? "1.5rem" : "1.2rem", 
            fontWeight: 800,
            textShadow: "0 4px 15px rgba(0,0,0,0.9)",
            letterSpacing: "0.02em"
          }}>
            {member.name}
          </h3>
          <p style={{ 
            margin: 0, 
            color: isCEO ? "#ffd700" : "#00ffff", 
            fontSize: "0.85rem", 
            textTransform: "uppercase", 
            letterSpacing: "3px",
            fontWeight: 700,
            textShadow: "0 2px 10px rgba(0,0,0,0.9)"
          }}>
            {member.role}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AboutTeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [paths, setPaths] = useState<string[]>([]);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const updatePaths = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      const height = window.innerWidth < 768 ? 1600 : 1100;
      setWindowWidth(width);

      if (window.innerWidth < 768) {
        setPaths([]); 
        return;
      }

      // Calculate perfect bezier curves connecting the nodes
      const newPaths = connections.map(conn => {
        const fromM = teamData[conn.from];
        const toM = teamData[conn.to];

        const x1 = (fromM.x / 100) * width;
        // Connect from near the text of the parent
        const y1 = (fromM.y / 100) * height + fromM.height * 0.8; 
        
        const x2 = (toM.x / 100) * width;
        // Connect near the top of the child
        const y2 = (toM.y / 100) * height;

        const dy = y2 - y1;
        // Smooth organic "S" branch
        const cx1 = x1;
        const cy1 = y1 + dy * 0.5;
        const cx2 = x2;
        const cy2 = y1 + dy * 0.5;

        return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
      });
      setPaths(newPaths);
    };

    updatePaths();
    window.addEventListener("resize", updatePaths);
    return () => window.removeEventListener("resize", updatePaths);
  }, []);

  return (
    <section
      id="team"
      style={{
        position: "relative",
        paddingTop: "8rem",
        paddingBottom: "10rem",
        background: "var(--surface-container-lowest)",
        overflow: "hidden",
      }}
    >
      <div className="noise-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />
      
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "5rem", maxWidth: "800px", margin: "0 auto" }}
        >
          <div className="label-hud" style={{ marginBottom: "1.25rem", justifyContent: "center", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--ancient-gold)" }} />
            THE ARCHITECTS
            <div style={{ width: "24px", height: "1px", background: "var(--ancient-gold)" }} />
          </div>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            Digital <span className="text-gradient-electric">Masterminds</span>
          </h2>
        </motion.div>

        <div ref={containerRef} style={{ position: "relative", width: "100%", height: windowWidth < 768 ? "1600px" : "1100px" }}>
          
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            {paths.map((path, i) => (
              <motion.path
                key={i}
                d={path}
                fill="none"
                stroke="url(#branchGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                  filter: "drop-shadow(0 0 12px rgba(0, 229, 255, 0.5))",
                }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={aboutInView ? { pathLength: 1, opacity: 0.7 } : {}}
                transition={{
                  pathLength: { duration: 1.5, delay: i * 0.2 + 0.5, ease: "easeInOut" },
                  opacity: { duration: 1, delay: i * 0.2 + 0.5 }
                }}
              />
            ))}
            <defs>
              <linearGradient id="branchGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(212, 175, 55, 0.9)" />
                <stop offset="100%" stopColor="rgba(0, 229, 255, 0.9)" />
              </linearGradient>
            </defs>
          </svg>

          {teamData.map((member, i) => (
            <TeamMember3D 
              key={member.id} 
              member={member} 
              i={i} 
              isMobile={windowWidth < 768} 
              aboutInView={aboutInView} 
            />
          ))}
        </div>
      </div>

      <style>{`
        .group:hover .poster-img {
          transform: scale(1.05);
          filter: grayscale(0%) contrast(1.1) !important;
        }
        .group:hover .poster-clouds {
          opacity: 1 !important;
          filter: drop-shadow(0 0 20px rgba(0,229,255,0.8)) sepia(100%) hue-rotate(180deg) saturate(400%) !important;
        }
      `}</style>
    </section>
  );
}