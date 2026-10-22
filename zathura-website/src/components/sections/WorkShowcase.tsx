"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Layers,
  ArrowRight,
  X,
  CheckCircle2,
  Code2,
  Sparkles,
  Laptop,
  Smartphone,
  Cpu,
  Boxes,
  Activity,
} from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  category: "webapp" | "mobile" | "ai" | "3d";
  categoryLabel: string;
  tagline: string;
  description: string;
  url: string;
  color: string;
  year: string;
  tech: string[];
  features: string[];
  metrics: {
    highlight: string;
    label: string;
  };
}

const PROJECTS: ProjectItem[] = [
  {
    id: "nexaura",
    title: "Nexaura Global Capital",
    category: "webapp",
    categoryLabel: "Wealth & FinTech Platform",
    tagline: "Autonomous Quantitative Intelligence & Investment Infrastructure",
    description:
      "A next-generation financial platform built for algorithmic portfolio management, institutional data feeds, and real-time risk analytics with microsecond latency.",
    url: "https://harmansaini29.vercel.app/",
    color: "#d4af37",
    year: "2026",
    tech: ["Next.js", "TypeScript", "Python", "Tailwind CSS", "AWS"],
    features: [
      "Algorithmic Risk Management Engine",
      "Institutional Portfolio Rebalancing",
      "Real-time Automated Market Data Feeds",
    ],
    metrics: {
      highlight: "< 0.15ms",
      label: "Execution Latency",
    },
  },
  {
    id: "astrowatch",
    title: "AstroWatch 3D Platform",
    category: "3d",
    categoryLabel: "3D WebGL SpaceTech",
    tagline: "Celestial Event Tracking & Interactive 3D Mesh Experience",
    description:
      "An interactive WebGL experience combining real-time orbital satellite trajectories, interactive Three.js 3D celestial mapping, and private observatory reservation workflows.",
    url: "https://harmansaini29.vercel.app/",
    color: "#00e5ff",
    year: "2026",
    tech: ["Three.js", "React Three Fiber", "Next.js", "GLSL Shaders"],
    features: [
      "Real-Time Orbital Satellite Tracking",
      "Interactive 3D Star Map Telescope Mesh",
      "Private Observatory Reservations & Sync",
    ],
    metrics: {
      highlight: "60+ FPS",
      label: "WebGL Fluidity",
    },
  },
  {
    id: "merirasoi",
    title: "Meri Rasoi SaaS",
    category: "mobile",
    categoryLabel: "Hospitality & POS SaaS",
    tagline: "Enterprise Cloud POS & AI Restaurant Operations Platform",
    description:
      "A comprehensive cross-platform restaurant operations ecosystem with cloud POS, automated inventory prediction, multi-kitchen sync, and customer retention analytics.",
    url: "https://harmansaini29.vercel.app/",
    color: "#f59e0b",
    year: "2025",
    tech: ["React Native", "Node.js", "PostgreSQL", "Socket.IO", "Redis"],
    features: [
      "Multi-Location Kitchen Synchronization",
      "Predictive Inventory Auto-Reordering",
      "Integrated Digital Billing & QR Ordering",
    ],
    metrics: {
      highlight: "99.99%",
      label: "Operational Uptime",
    },
  },
  {
    id: "nyayaai",
    title: "NyayaAI Legal Copilot",
    category: "ai",
    categoryLabel: "AI Legal Tech System",
    tagline: "Jurisprudence LLM Assistant & Automated Contract Synthesizer",
    description:
      "An intelligent legal tech solution transforming case law research, clause validation, and contract synthesis with domain-specific vector databases and zero-leakage safeguards.",
    url: "https://harmansaini29.vercel.app/",
    color: "#10b981",
    year: "2026",
    tech: ["Python", "Claude LLM", "LangChain", "Vector DB", "Next.js"],
    features: [
      "Instant Legal Citation Vector Search",
      "Automated Contract Risk & Compliance Checks",
      "Multi-Language Jurisprudence Pipeline",
    ],
    metrics: {
      highlight: "10x",
      label: "Faster Drafting",
    },
  },
  {
    id: "onlinegyan",
    title: "OnlineGyan EdTech",
    category: "webapp",
    categoryLabel: "EdTech Learning Platform",
    tagline: "Adaptive AI Tutoring & Live Cohort Learning Infrastructure",
    description:
      "A full-spectrum digital educational platform delivering live interactive cohorts, adaptive learning recommendations, and granular student progress metrics.",
    url: "https://harmansaini29.vercel.app/",
    color: "#0088ff",
    year: "2025",
    tech: ["Next.js", "WebRTC", "TypeScript", "Tailwind CSS", "MongoDB"],
    features: [
      "Live Interactive Video & Screen Cohorts",
      "Adaptive Learning Assessment Graphs",
      "Instant Certification & Progress Tracking",
    ],
    metrics: {
      highlight: "50k+",
      label: "Active Learners",
    },
  },
  {
    id: "karamstay",
    title: "KaramStay Real Estate",
    category: "mobile",
    categoryLabel: "PropTech & Co-Living App",
    tagline: "Smart Property Management Network & Tenant Concierge",
    description:
      "A modern property management and luxury living platform with smart keyless check-in, automated tenant billing, dynamic yield pricing, and on-demand maintenance booking.",
    url: "https://harmansaini29.vercel.app/",
    color: "#a855f7",
    year: "2026",
    tech: ["React Native", "Next.js", "Stripe API", "Node.js", "Tailwind CSS"],
    features: [
      "Keyless Mobile Access Control",
      "Dynamic Occupancy Yield Algorithm",
      "Concierge Maintenance Dispatch",
    ],
    metrics: {
      highlight: "4.9 ★",
      label: "App Rating",
    },
  },
];

const CATEGORIES = [
  { id: "all", label: "All Works", icon: Boxes },
  { id: "webapp", label: "Web Apps", icon: Laptop },
  { id: "mobile", label: "Mobile Apps", icon: Smartphone },
  { id: "ai", label: "AI Platforms", icon: Cpu },
  { id: "3d", label: "3D & WebGL", icon: Sparkles },
];

export default function WorkShowcase() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="showcase" className="relative w-full py-24 lg:py-32 bg-[#02050c] overflow-hidden select-none z-10">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00e5ff]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
              <Sparkles size={12} className="text-[#00e5ff]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00e5ff] font-semibold">
                Curated Bookshelf Showcase
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-tight">
              Applications & <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-[#00e5ff]">
                Digital Systems.
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 max-w-md">
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Explore bespoke software, interactive platforms, and cross-platform applications engineered with precision and clean architecture.
            </p>

            {/* Bookshelf Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {CATEGORIES.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    suppressHydrationWarning
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`relative font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      filter === tab.id
                        ? "text-white font-bold"
                        : "text-gray-400 hover:text-white bg-white/[0.02] border border-white/5"
                    }`}
                  >
                    {filter === tab.id && (
                      <motion.div
                        layoutId="activeShelfPill"
                        className="absolute inset-0 bg-[#00e5ff]/15 border border-[#00e5ff]/50 rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <TabIcon size={12} className={filter === tab.id ? "text-[#00e5ff] relative z-10" : "relative z-10"} />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* The Bookshelf Display Section */}
        <div className="relative">
          {/* Top Shelf Backing Ledge Glow */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Cards Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 relative z-10"
          >
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative bg-[#050a16]/85 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-400 hover:-translate-y-2.5 hover:shadow-[0_25px_50px_rgba(0,0,0,0.7)] cursor-pointer overflow-hidden"
                >
                  {/* Subtle Colored Top Neon Lip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 transition-all duration-400 group-hover:h-1.5"
                    style={{ backgroundColor: project.color }}
                  />

                  {/* Card Header & Mock UI Status */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border"
                        style={{
                          color: project.color,
                          borderColor: `${project.color}35`,
                          backgroundColor: `${project.color}10`,
                        }}
                      >
                        {project.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-500">
                        <Activity size={11} className="text-[#00e5ff] animate-pulse" />
                        <span>{project.year}</span>
                      </div>
                    </div>

                    {/* App Title */}
                    <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>

                    {/* App Tagline */}
                    <p className="font-mono text-[11px] text-gray-400 line-clamp-1 mb-3">
                      {project.tagline}
                    </p>

                    {/* App Description */}
                    <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Card Bottom / Tech Badges & Metric */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] text-gray-300 bg-white/5 border border-white/5 px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="font-mono text-[10px] text-gray-500 py-0.5">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-400 group-hover:text-[#00e5ff] transition-colors flex items-center gap-1.5">
                        <span>Inspect Architecture</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="font-mono text-[11px] text-white/80 font-semibold">
                        {project.metrics.highlight}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Realistic Bookshelf Illuminated Glass/Metallic Rail */}
          <div className="relative mt-10">
            {/* Shelf Ledge Plate */}
            <div className="w-full h-2.5 bg-gradient-to-r from-white/5 via-white/15 to-white/5 rounded-full border-t border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.8)]" />
            {/* Shelf Underglow Neon Runner */}
            <div className="w-3/4 mx-auto h-0.5 bg-gradient-to-r from-transparent via-[#00e5ff]/50 to-transparent blur-[1px] shadow-[0_0_15px_rgba(0,229,255,0.4)]" />
          </div>
        </div>

        {/* Bottom Helpful Hint */}
        <div className="mt-10 text-center">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <Sparkles size={12} className="text-[#00e5ff]" />
            <span>Click any project card to review full engineering specs</span>
          </p>
        </div>

      </div>

      {/* Clean Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#060b18] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: selectedProject.color }}
              />

              {/* Close Button */}
              <button
                suppressHydrationWarning
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span
                  className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border"
                  style={{
                    color: selectedProject.color,
                    borderColor: `${selectedProject.color}35`,
                    backgroundColor: `${selectedProject.color}10`,
                  }}
                >
                  {selectedProject.categoryLabel}
                </span>
                <span className="font-mono text-xs text-gray-400">• {selectedProject.year}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1.5">
                {selectedProject.title}
              </h3>

              <p className="font-mono text-xs text-[#00e5ff] mb-4">
                {selectedProject.tagline}
              </p>

              <p className="text-gray-300 text-sm font-light leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Key Features */}
              <div className="mb-6">
                <div className="font-mono text-xs text-white/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Layers size={13} className="text-[#00e5ff]" />
                  <span>Architecture & Feature Highlights</span>
                </div>
                <div className="space-y-2">
                  {selectedProject.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: selectedProject.color }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <div className="font-mono text-xs text-white/70 uppercase tracking-widest mb-2.5 flex items-center gap-2">
                  <Code2 size={13} className="text-[#d4af37]" />
                  <span>Technologies & Frameworks</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] text-gray-300 bg-white/5 border border-white/10 px-3 py-1 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer / Direct Full Portfolio Action */}
              <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-mono text-xs text-gray-400">
                  <span className="text-white font-bold">{selectedProject.metrics.highlight}</span>
                  <span>{selectedProject.metrics.label}</span>
                </div>

                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#00e5ff] hover:text-white transition-all duration-300 shadow-md cursor-pointer"
                >
                  <span>Explore Full Portfolio</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
