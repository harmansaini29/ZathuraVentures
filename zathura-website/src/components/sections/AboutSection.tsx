"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  ArrowDown,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Terminal,
  Mail,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const STATS = [
  { label: "Community Founder", value: "GrowSphere", sub: "1,600+ Developers" },
  { label: "Hackathons", value: "2× Winner", sub: "National Finalist" },
  { label: "Production Systems", value: "8+ Platforms", sub: "Deployed & Scaled" },
  { label: "Core Focus", value: "AI & Full-Stack", sub: "Low-Latency Engines" },
];

const SKILL_PILLARS = [
  {
    icon: Code2,
    title: "High-Performance Full-Stack",
    desc: "Next.js, React, Node.js, TypeScript, and modern web architectures built for speed and uptime.",
  },
  {
    icon: Cpu,
    title: "AI Multi-Agent Pipelines",
    desc: "Autonomous agent orchestration with LangGraph, RAG vector retrieval, and automated intelligence.",
  },
  {
    icon: Layers,
    title: "Distributed Backend & Cloud",
    desc: "FastAPI, PostgreSQL, Redis, Docker, and microservice backends engineered for zero technical debt.",
  },
  {
    icon: Terminal,
    title: "Interactive 3D WebGL",
    desc: "Spatial Three.js experiences, 60+ FPS graphics, and fluid digital simulations for modern brands.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-24 sm:py-32 lg:py-36 flex items-center justify-center overflow-hidden bg-transparent select-none z-10"
    >
      {/* Subtle, soft ambient illumination - high contrast, non-themed */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Rising Animated Profile & Crisp Bio */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Status Pill */}
            <motion.div variants={riseVariants} className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="font-sans text-xs sm:text-sm uppercase tracking-wider text-emerald-300 font-bold">
                  Available for High-Impact Projects
                </span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm text-neutral-300">
                <Sparkles size={15} className="text-cyan-400" />
                <span>Systems & Full-Stack Architect</span>
              </div>
            </motion.div>

            {/* Name: Large, High-Contrast, Ultra-Readable Font */}
            <motion.h1
              variants={riseVariants}
              className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] mb-4"
            >
              Harman Saini
            </motion.h1>

            {/* Subtitle / Role */}
            <motion.h2
              variants={riseVariants}
              className="text-xl sm:text-2xl lg:text-3xl text-cyan-300 font-bold tracking-tight mb-6"
            >
              Systems Engineer • Spatial Computation • Full-Stack Architect
            </motion.h2>

            {/* Crisp, Not Too Lengthy Bio */}
            <motion.p
              variants={riseVariants}
              className="text-neutral-100 text-base sm:text-xl font-normal leading-relaxed mb-8 max-w-2xl"
            >
              I engineer low-latency digital systems, autonomous AI agent pipelines, and high-performance web applications. Combining scalable backend infrastructure with intuitive interfaces, I help enterprises and startups transform complex operations into fast, dependable software.
            </motion.p>

            {/* 4 Pillars of Systems Engineering */}
            <motion.div variants={riseVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {SKILL_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-neutral-900/90 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 shadow-md group"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 group-hover:scale-105 transition-transform">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-white text-sm sm:text-base font-bold">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-neutral-200 text-xs sm:text-sm font-normal leading-relaxed pl-1">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* Key Metrics / Highlights Strip */}
            <motion.div
              variants={riseVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5 border-t border-b border-white/15 mb-8"
            >
              {STATS.map((stat, sIdx) => (
                <div key={sIdx} className="flex flex-col">
                  <span className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-cyan-300">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-neutral-300 font-light">
                    {stat.sub}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Direct Navigation & Portfolio Buttons */}
            <motion.div
              variants={riseVariants}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#bookshelf"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-white text-neutral-950 font-sans text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-cyan-400 hover:text-neutral-950 transition-all duration-300 shadow-lg cursor-pointer group"
              >
                <span>Explore Bookshelf Projects</span>
                <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://harmansaini29.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/20 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                <span>Direct Portfolio</span>
                <ExternalLink size={16} className="text-cyan-400" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-4 text-neutral-200 hover:text-white font-sans text-xs sm:text-sm font-bold transition-colors"
              >
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Connect & Build</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Clean, Modern Architectural Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="w-full max-w-md bg-neutral-900/90 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col items-center">
              
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-white to-amber-400" />

              {/* Portrait Photo Viewport */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white/20 shadow-xl mb-6 bg-neutral-950 flex items-center justify-center">
                <Image
                  src="/images/portrait.png"
                  alt="Harman Saini Portrait"
                  width={300}
                  height={300}
                  priority
                  className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Profile Details */}
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight text-center mb-1">
                Harman Saini
              </h3>
              
              <p className="text-cyan-300 text-sm font-bold tracking-wide uppercase text-center mb-3">
                Lead Architect & Systems Engineer
              </p>

              <p className="text-neutral-200 text-xs sm:text-sm font-normal text-center leading-relaxed mb-6">
                Chhatrapati Shivaji Maharaj University • Navi Mumbai
                <br />
                Founder of GrowSphere Community • 2× Hackathon Champion
              </p>

              {/* Verified Direct Social & Contact Uplinks */}
              <div className="w-full grid grid-cols-4 gap-2 pt-4 border-t border-white/15">
                <a
                  href="https://github.com/harmansaini29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-200 hover:text-white border border-white/10 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={20} />
                  <span className="text-[10px] font-bold mt-1 uppercase">GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/harman-saini-d29/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-200 hover:text-white border border-white/10 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={20} className="text-blue-400" />
                  <span className="text-[10px] font-bold mt-1 uppercase">LinkedIn</span>
                </a>

                <a
                  href="https://x.com/Harmansaini2905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-200 hover:text-white border border-white/10 transition-colors"
                  aria-label="Twitter Profile"
                >
                  <TwitterIcon size={20} className="text-cyan-400" />
                  <span className="text-[10px] font-bold mt-1 uppercase">Twitter</span>
                </a>

                <a
                  href="mailto:harmansinghsaini4134@gmail.com"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-200 hover:text-white border border-white/10 transition-colors"
                  aria-label="Direct Email"
                >
                  <Mail size={20} className="text-amber-400" />
                  <span className="text-[10px] font-bold mt-1 uppercase">Email</span>
                </a>
              </div>

              {/* Footer Badge */}
              <div className="mt-5 w-full bg-black/40 rounded-xl px-4 py-2 border border-white/10 flex items-center justify-between text-xs font-mono text-neutral-300">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
                <span className="text-neutral-400">harmansaini29.vercel.app</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
