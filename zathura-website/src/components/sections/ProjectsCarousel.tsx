"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { PerspectiveCarousel, PerspectiveCarouselItem } from "@/components/ui/perspective-carousel";

const PROJECT_ITEMS: PerspectiveCarouselItem[] = [
  {
    title: "Harriot Smart Occupancy Agent",
    alt: "Next.js · FastAPI · LangGraph · OpenAI",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1280",
  },
  {
    title: "Connex Systems Railway Platform",
    alt: "React · Node.js · MongoDB · Automated Verification",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1280",
  },
  {
    title: "GoldieBot vPRO Trading Backend",
    alt: "Python · MetaTrader 5 API · Pandas · Algorithmic Risk",
    src: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=1280",
  },
  {
    title: "Smart AI Exam Portal",
    alt: "React 19 · Flask 3 · MySQL · Automated Proctoring",
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1280",
  },
  {
    title: "Aegis.AI Neuro-Defense",
    alt: "Node.js · Python · Scikit-Learn · Isolation Forest",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1280",
  },
  {
    title: "GrowSphere Community Core",
    alt: "1,600+ Builders · NEAR AI · Apache Kafka · Devcon",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1280",
  },
  {
    title: "Zathura Ventures AI Core",
    alt: "Full-Stack AI Architecture · Next.js · Multi-Agent Systems",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1280",
  },
  {
    title: "Sapphire Infocom Full-Stack",
    alt: "MERN Stack · REST APIs · High-Throughput Delivery",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1280",
  },
];

export default function ProjectsCarousel() {
  const [slideWidth, setSlideWidth] = React.useState(240);

  React.useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          setSlideWidth(200);
        } else if (window.innerWidth < 1024) {
          setSlideWidth(230);
        } else {
          setSlideWidth(260);
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="projects"
      className="relative w-full min-h-[80vh] py-28 sm:py-36 md:py-40 overflow-hidden bg-[#010612] flex flex-col items-center justify-center select-none"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.05)_0%,rgba(0,119,255,0.02)_50%,transparent_75%)] pointer-events-none" />

      {/* Centered Section Header with Generous Top Clearance */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-3 backdrop-blur-md shadow-sm"
        >
          <Layers size={14} className="text-[#00e5ff]" />
          <span className="font-mono text-[10px] sm:text-[11px] text-white/80 uppercase tracking-[0.25em] font-semibold">
            Perspective 3D Carousel · Harman Saini Deployments
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-3"
        >
          Featured Deployments
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#8eaec9] font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
        >
          Explore production AI decision pipelines, automated FinTech backends, full-stack enterprise platforms, and community ecosystems in infinite 3D perspective.
        </motion.p>
      </div>

      {/* 3D Perspective Carousel Container with Generous Spacing and Depth */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 h-[480px] sm:h-[540px] md:h-[580px] flex items-center justify-center">
        {/* Soft edge fade masks on sides with deep void black */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 bg-gradient-to-r from-[#010612] via-[#010612]/90 to-transparent pointer-events-none z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 bg-gradient-to-l from-[#010612] via-[#010612]/90 to-transparent pointer-events-none z-20" />

        <PerspectiveCarousel
          items={PROJECT_ITEMS}
          defaultActiveIndex={1}
          loop={true}
          slideWidth={slideWidth}
          rotationStep={45}
          inactiveScale={0.82}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 30,
            mass: 0.8,
          }}
          className="w-full h-full"
          labelClassName="font-sans font-semibold text-white text-sm sm:text-base tracking-tight"
          imageClassName="rounded-xl border border-white/10 hover:border-[#00e5ff]/50 shadow-2xl transition-all duration-300"
          controlsClassName="border-[#00e5ff]/20 bg-[#040d1e]/85 text-[#00e5ff] backdrop-blur-xl shadow-[0_0_30px_rgba(0,229,255,0.2)] dark:border-[#00e5ff]/20 dark:bg-[#040d1e]/85 dark:text-[#00e5ff]"
        />
      </div>

      {/* Hand Swipe / Gesture Telemetry Pill */}
      <div className="relative z-10 mt-6 sm:mt-8 flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-white/50 tracking-wider uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
        <span>Swipe with hands · Drag or Arrow Keys to Navigate</span>
      </div>
    </section>
  );
}
