"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Gamepad2, Sparkles, Disc, Flame } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Nexus",
    category: "Full Edition · PS5 Pro Enhanced",
    genre: "Action-Packed Headless Commerce",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1280",
    desc: "A high-performance headless commerce ecosystem processing $2M+ in monthly volume with zero-latency instant transactions and dynamic inventory synchronization.",
    stack: ["Next.js 16", "Shopify Plus", "Stripe API", "Framer Motion"],
    ps5Specs: { resolution: "4K 60FPS", mode: "Performance Mode", haptics: "DualSense Haptics Active" },
    themeColor: "#00e5ff",
  },
  {
    id: 2,
    title: "AI FinTech Dashboard",
    category: "Special Edition · Ray Traced",
    genre: "Algorithmic Quantitative Simulation",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1280",
    desc: "Real-time algorithmic trading dashboard with predictive ML models, sub-millisecond WebSocket data pipelines, and spatial risk visualization.",
    stack: ["React 19", "Python / FastAPI", "TensorFlow", "High-Speed Sockets"],
    ps5Specs: { resolution: "4K Native", mode: "Fidelity Mode", haptics: "Adaptive Triggers" },
    themeColor: "#8b5cf6",
  },
  {
    id: 3,
    title: "Aura Blockchain",
    category: "Collector's Protocol Edition",
    genre: "Decentralized Zero-Knowledge Core",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1280",
    desc: "Decentralized identity protocol powered by zero-knowledge proofs, multi-party computation, and seamless cross-chain asset interoperability.",
    stack: ["Solidity", "Rust", "Web3.js", "ZK-Rollups"],
    ps5Specs: { resolution: "Dynamic 4K", mode: "120Hz Ultra High Frame", haptics: "3D Audio Tempest Engine" },
    themeColor: "#06b6d4",
  },
  {
    id: 4,
    title: "Lumina VR Studio",
    category: "VR / Spatial Edition",
    genre: "Immersive WebXR 3D Real-time Engine",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=1280",
    desc: "Next-generation WebXR spatial architectural visualization tool allowing users to explore unbuilt hyper-luxury properties with photorealistic real-time lighting.",
    stack: ["Three.js", "React Three Fiber", "GLTF Pipeline", "AWS Cloud"],
    ps5Specs: { resolution: "4K HDR", mode: "VR Compatible", haptics: "DualSense Spatial Vibration" },
    themeColor: "#10b981",
  },
  {
    id: 5,
    title: "Sentinel Cyber",
    category: "Ultimate Security Edition",
    genre: "Zero-Trust Tactical Command",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1280",
    desc: "Autonomous threat intelligence platform built for enterprise defense with automated intrusion detection, encrypted sandboxes, and lightning counter-response.",
    stack: ["Go Engine", "PostgreSQL", "Docker Clusters", "Zero-Trust Mesh"],
    ps5Specs: { resolution: "4K 60FPS", mode: "Ultra Armor Mode", haptics: "Tactical DualSense Alerts" },
    themeColor: "#3b82f6",
  },
];

export default function ProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(false);

  const scrollChildIntoContainerCenter = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const child = container.children[index] as HTMLElement | undefined;
    if (child) {
      const targetLeft = child.offsetLeft - (container.clientWidth - child.clientWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    }
  };

  const clearAutoScroll = () => {
    if (autoScrollTimerRef.current) clearInterval(autoScrollTimerRef.current);
    autoScrollTimerRef.current = null;
  };

  const startAutoScroll = () => {
    clearAutoScroll();
    autoScrollTimerRef.current = setInterval(() => {
      // ONLY autoscroll if the section is actively in view in the viewport and not hovered
      if (!isHoveredRef.current && isVisibleRef.current) {
        setActiveIndex((prev) => {
          const next = (prev + 1) % projects.length;
          scrollChildIntoContainerCenter(next);
          return next;
        });
      }
    }, 4500);
  };

  const pauseAndScheduleResume = () => {
    clearAutoScroll();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      startAutoScroll();
    }, 2500);
  };

  // IntersectionObserver to only auto-scroll when user is actually looking at this section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    startAutoScroll();

    return () => {
      observer.disconnect();
      clearAutoScroll();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = useCallback((index: number) => {
    isProgrammaticScrollRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 450);

    scrollChildIntoContainerCenter(index);
    setActiveIndex(index);
    pauseAndScheduleResume();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTrackScroll = useCallback(() => {
    if (!scrollRef.current || isProgrammaticScrollRef.current) return;
    const container = scrollRef.current;
    const center = container.scrollLeft + container.clientWidth / 2;
    const children = Array.from(container.children) as HTMLElement[];
    let closestIndex = activeIndex;
    let minDistance = Infinity;

    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });

    if (closestIndex !== activeIndex && minDistance < 150) {
      setActiveIndex(closestIndex);
      pauseAndScheduleResume();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisibleRef.current) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (activeIndex + 1) % projects.length;
        scrollTo(next);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (activeIndex - 1 + projects.length) % projects.length;
        scrollTo(prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollTo]);

  const activeProject = projects[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen py-40 sm:py-52 md:py-60 overflow-hidden bg-[#010612] flex flex-col justify-center items-center select-none"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      onTouchStart={() => { isHoveredRef.current = true; pauseAndScheduleResume(); }}
      onTouchEnd={() => { isHoveredRef.current = false; }}
    >
      {/* Background Hero Banner with Dim Project Theme Backdrop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.16, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${activeProject.image})`,
            filter: "brightness(0.6) contrast(1.1)",
          }}
        />
      </AnimatePresence>

      {/* Cinematic Dim Dynamic Project Theme Gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`theme-glow-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${activeProject.themeColor}22 0%, rgba(1, 6, 18, 0.9) 65%, #010612 100%)`,
          }}
        />
      </AnimatePresence>

      {/* Centered Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* System Top Header */}
        <div className="flex flex-col items-center justify-center mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.12)]">
            <Gamepad2 size={15} className="text-[#00e5ff]" />
            <span className="font-mono text-[10px] text-white/70 uppercase tracking-[0.25em]">
              Selected Works · Spatial & Web3 Systems
            </span>
          </div>
          <h2 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-none mb-3">
            Selected Projects
          </h2>
          <p className="text-[#8eaec9] font-light text-sm sm:text-base leading-relaxed">
            Institutional-grade web applications, WebGL spatial engines, and high-throughput production ecosystems.
          </p>
        </div>

        {/* Active Title Showcase in the exact horizontal middle */}
        <div className="min-h-[200px] max-w-3xl mx-auto flex flex-col items-center text-center mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* Category & Badge */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="px-3 py-1 rounded bg-[#00e5ff]/15 border border-[#00e5ff]/35 text-[#00e5ff] font-mono text-[10px] uppercase font-bold tracking-wider shadow-[0_0_12px_rgba(0,229,255,0.2)]">
                  {activeProject.category}
                </span>
                <span className="text-[#00e5ff]/40 font-mono text-xs">•</span>
                <span className="text-white/70 font-sans text-xs uppercase tracking-widest font-medium">
                  {activeProject.genre}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight mb-3">
                {activeProject.title}
              </h3>

              {/* Description */}
              <p className="text-[#8eaec9] font-light text-sm sm:text-base leading-relaxed mb-5 max-w-xl">
                {activeProject.desc}
              </p>

              {/* Specs & Tech Pill Tags */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/25 text-[#00e5ff] font-mono text-xs font-semibold">
                  <Sparkles size={12} />
                  {activeProject.ps5Specs.resolution}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0077ff]/10 border border-[#0077ff]/25 text-[#38bdf8] font-mono text-xs">
                  <Flame size={12} className="text-[#00e5ff]" />
                  {activeProject.ps5Specs.mode}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-white/70 font-mono text-xs">
                  <Disc size={12} className="text-emerald-400" />
                  {activeProject.ps5Specs.haptics}
                </span>
                {activeProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-white/[0.02] border border-white/5 text-white/50 font-sans text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Indicator */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} Titles
          </span>
          <button
            suppressHydrationWarning
            onClick={() => scrollTo((activeIndex - 1 + projects.length) % projects.length)}
            className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] hover:border-[#00e5ff]/50 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
            aria-label="Previous project"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            suppressHydrationWarning
            onClick={() => scrollTo((activeIndex + 1) % projects.length)}
            className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] hover:border-[#00e5ff]/50 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
            aria-label="Next project"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* PS5 Game Tiles Carousel Track in the Middle of Screen */}
      <div className="relative z-10 w-full overflow-hidden pb-4">
        <div
          ref={scrollRef}
          onScroll={handleTrackScroll}
          className="flex gap-6 px-6 md:px-12 overflow-x-auto scroll-smooth hide-scrollbar py-6 justify-start md:justify-center"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;
            return (
              <motion.div
                key={project.id}
                onClick={() => scrollTo(idx)}
                whileHover={{ scale: isActive ? 1.02 : 1.01 }}
                className={`relative shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  isActive
                    ? "w-[320px] sm:w-[380px] h-[200px] sm:h-[230px] border-2 border-white shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,229,255,0.35)] scale-100"
                    : "w-[260px] sm:w-[300px] h-[170px] sm:h-[190px] border border-white/15 opacity-40 hover:opacity-80 scale-95"
                }`}
                style={{ scrollSnapAlign: "start" }}
              >
                {/* Tile Thumbnail */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Glass Bottom Banner */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#00e5ff] font-bold">
                    {project.genre.split(" ")[0]}
                  </span>
                  <span className="font-sans font-bold text-white text-base truncate">
                    {project.title}
                  </span>
                </div>

                {/* Active Indicator Light */}
                {isActive && (
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_10px_#00e5ff] animate-pulse" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}