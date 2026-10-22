"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers } from "lucide-react";
import { CylinderCarousel } from "@/components/ui/cylinder-carousel";

const PROJECT_IMAGES = [
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
    title: "Aegis.AI Neuro-Behavioral Anti-Bot",
    alt: "Node.js · Python · Scikit-Learn · Isolation Forest",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1280",
  },
  {
    title: "GrowSphere Community Core",
    alt: "1,200+ Builders · NEAR AI · Apache Kafka · Devcon",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1280",
  },
  {
    title: "Zathura Ventures AI Core",
    alt: "Full-Stack AI Architecture · Next.js · Cloud Infrastructure",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1280",
  },
  {
    title: "Sapphire Infocom Full-Stack",
    alt: "MERN Stack · REST APIs · High-Throughput Delivery",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1280",
  },
];

export default function ProjectsCarousel() {
  return (
    <section
      id="projects"
      className="relative w-full py-24 sm:py-32 md:py-36 overflow-hidden bg-[#010612] flex flex-col items-center justify-center select-none"
    >
      {/* Centered System Header */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-4 backdrop-blur-md shadow-sm"
        >
          <Layers size={14} className="text-[#00e5ff]" />
          <span className="font-mono text-[10px] sm:text-[11px] text-white/80 uppercase tracking-[0.25em] font-semibold">
            3D Cylinder Carousel · Harman Saini Projects
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-3"
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
          Explore production AI decision pipelines, automated FinTech backends, full-stack enterprise platforms, and community ecosystems in infinite 3D.
        </motion.p>
      </div>

      {/* 3D Infinite CSS Cylinder Carousel: Wide, Perfectly Curved Inside */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 h-[600px] sm:h-[660px] flex items-center justify-center">
        <CylinderCarousel
          images={PROJECT_IMAGES}
          cardWidth={310}
          animationDuration={28}
          cardClassName="border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)] hover:border-[#00e5ff]/60 transition-all duration-300"
        />
      </div>

      {/* Status Footer Pill */}
      <div className="relative z-10 mt-8 sm:mt-12 flex items-center gap-2 font-mono text-[11px] text-white/50 tracking-wider uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
        <span>Continuous 360° Cylinder Loop · Hover to Pause</span>
      </div>
    </section>
  );
}
