"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Nexus",
    category: "Web Platform",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1280",
    desc: "A high-performance headless commerce platform processing $2M+ in monthly volume with zero downtime.",
    stack: ["Next.js", "Shopify", "Stripe", "Framer Motion"],
  },
  {
    id: 2,
    title: "AI FinTech Dashboard",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1280",
    desc: "Real-time algorithmic trading dashboard with predictive ML models and sub-millisecond data pipelines.",
    stack: ["React", "Python", "TensorFlow", "WebSockets"],
  },
  {
    id: 3,
    title: "Aura Blockchain",
    category: "Web3 Infrastructure",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1280",
    desc: "Decentralized identity protocol with zero-knowledge proofs and seamless cross-chain interoperability.",
    stack: ["Solidity", "Rust", "Web3.js", "IPFS"],
  },
  {
    id: 4,
    title: "Lumina VR Studio",
    category: "Immersive Experience",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=1280",
    desc: "WebXR architectural visualization tool allowing users to walk through unbuilt properties in real-time 3D.",
    stack: ["Three.js", "React Three Fiber", "Blender", "AWS"],
  },
  {
    id: 5,
    title: "Sentinel Cyber",
    category: "Enterprise Software",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1280",
    desc: "Threat intelligence platform for Fortune 500s with automated intrusion detection and rapid response.",
    stack: ["Node.js", "Go", "PostgreSQL", "Docker"],
  },
];

export default function ProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollX = scrollRef.current.scrollLeft;
      const itemWidth = 320 + 32;
      const newIndex = Math.round(scrollX / itemWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < projects.length) {
        setActiveIndex(newIndex);
      }
    };

    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => {
      if (ref) ref.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex]);

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const itemWidth = 320 + 32;
    scrollRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        scrollTo(Math.min(projects.length - 1, activeIndex + 1));
      } else if (e.key === "ArrowLeft") {
        scrollTo(Math.max(0, activeIndex - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const activeProject = projects[activeIndex];

  return (
    <section id="projects" style={{ position: "relative", height: "100vh", minHeight: "800px", overflow: "hidden", background: "#000" }}>

      {/* Background Image (PS5 Style Fullscreen transition) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${activeProject.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
            opacity: 0.2,
          }}
        />
      </AnimatePresence>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, #061423 0%, rgba(6, 20, 35, 0.7) 40%, rgba(6, 20, 35, 0.9) 100%)",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{ padding: "6rem 4rem 2rem", maxWidth: "1280px", width: "100%", margin: "0 auto" }}>
          <div className="label-hud" style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--electric-blue)" }} />
            FEATURED MISSIONS
          </div>
          <h2 style={{ fontSize: "3rem", fontWeight: 700 }}>Our Legacy</h2>
        </div>

        {/* Swipe Navigation Buttons */}
        <div style={{ position: "absolute", top: "50%", left: "2rem", transform: "translateY(-50%)", zIndex: 20 }}>
          <button
            onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: "rgba(200, 16, 46, 0.1)", border: "1px solid rgba(200, 16, 46, 0.3)",
              color: "var(--electric-blue)", display: "flex", alignItems: "center", justifyContent: "center",
              opacity: activeIndex === 0 ? 0.3 : 1, transition: "all 0.3s ease",
            }}
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div style={{ position: "absolute", top: "50%", right: "2rem", transform: "translateY(-50%)", zIndex: 20 }}>
          <button
            onClick={() => scrollTo(Math.min(projects.length - 1, activeIndex + 1))}
            disabled={activeIndex === projects.length - 1}
            style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: "rgba(200, 16, 46, 0.1)", border: "1px solid rgba(200, 16, 46, 0.3)",
              color: "var(--electric-blue)", display: "flex", alignItems: "center", justifyContent: "center",
              opacity: activeIndex === projects.length - 1 ? 0.3 : 1, transition: "all 0.3s ease",
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Active Project Details */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 4rem", maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ maxWidth: "600px" }}
            >
              <h4 style={{ color: "var(--ancient-gold)", fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                {activeProject.category}
              </h4>
              <h3 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
                {activeProject.title}
              </h3>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: "2rem" }}>
                {activeProject.desc}
              </p>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {activeProject.stack.map(tech => (
                  <span key={tech} style={{ padding: "0.4rem 1rem", borderRadius: "20px", background: "rgba(200, 16, 46, 0.1)", border: "1px solid rgba(200, 16, 46, 0.3)", color: "var(--electric-blue)", fontSize: "0.85rem", fontWeight: 600 }}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Horizontal Carousel */}
        <div style={{ paddingBottom: "4rem" }}>
          <div
            ref={scrollRef}
            style={{
              display: "flex",
              gap: "2rem",
              padding: "2rem 4rem",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="hide-scrollbar"
          >
            {/* Spacer for start */}
            <div style={{ minWidth: "calc(50vw - 200px)" }} />

            {projects.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={project.id}
                  onClick={() => scrollTo(index)}
                  style={{
                    minWidth: "320px",
                    height: "180px",
                    scrollSnapAlign: "center",
                    cursor: "pointer",
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    transform: isActive ? "scale(1.1) translateZ(0)" : "scale(0.9) translateZ(0)",
                    opacity: isActive ? 1 : 0.4,
                    border: isActive ? "2px solid #fff" : "2px solid transparent",
                    boxShadow: isActive ? "0 10px 30px rgba(0,0,0,0.6)" : "none",
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, border 0.4s ease",
                    willChange: "transform, opacity"
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: isActive ? "none" : "grayscale(80%)",
                      transition: "filter 0.4s ease",
                      willChange: "filter"
                    }}
                  />
                  {!isActive && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
                  )}
                  {isActive && (
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem", background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)" }}>
                      <span style={{ fontWeight: 700 }}>{project.title}</span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Spacer for end */}
            <div style={{ minWidth: "calc(50vw - 200px)" }} />
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}