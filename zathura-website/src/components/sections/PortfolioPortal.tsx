"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Sparkles, Layers, Code2, Rocket, ExternalLink, ShieldCheck } from "lucide-react";

export default function PortfolioPortal() {
  const portfolioUrl = "https://harmansaini29.vercel.app/";

  return (
    <section id="portfolio" className="relative w-full py-24 lg:py-32 bg-[#01040a] overflow-hidden select-none z-10 border-t border-b border-white/5">
      {/* Ambient Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#00e5ff]/10 via-[#d4af37]/10 to-[#0088ff]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        
        {/* Eyebrow Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
        >
          <Globe size={13} className="text-[#00e5ff]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gray-300">
            Official Developer Portfolio
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-ping" />
        </motion.div>

        {/* Punchy Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-none mb-6"
        >
          Explore The Full <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00e5ff] via-white to-[#d4af37]">
            Architectural Suite.
          </span>
        </motion.h2>

        {/* Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Dive into detailed engineering case studies, live production web applications, open-source repositories, and interactive digital experiences.
        </motion.p>

        {/* Clean, Punchy Center Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#050a16]/85 backdrop-blur-2xl border border-white/10 hover:border-[#00e5ff]/40 rounded-3xl p-7 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group transition-all duration-500"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.06)_0%,transparent_70%)] pointer-events-none" />

          {/* Clean Domain Showcase */}
          <div className="bg-black/50 border border-white/10 rounded-2xl px-6 py-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
              <span className="font-mono text-sm sm:text-base text-white font-medium tracking-wide">
                harmansaini29.vercel.app
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-gray-400 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-[#00e5ff]" />
              <span>Production Live & Verified</span>
            </div>
          </div>

          {/* 4 Clean Capability Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-9 text-left">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors">
              <Rocket size={16} className="text-[#00e5ff] mb-2" />
              <div className="text-white text-xs font-semibold">Live Demos</div>
              <div className="text-gray-400 text-[11px] font-light mt-0.5">Production Ready</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors">
              <Code2 size={16} className="text-[#d4af37] mb-2" />
              <div className="text-white text-xs font-semibold">Clean Code</div>
              <div className="text-gray-400 text-[11px] font-light mt-0.5">TypeScript & Python</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors">
              <Layers size={16} className="text-[#0088ff] mb-2" />
              <div className="text-white text-xs font-semibold">Architecture</div>
              <div className="text-gray-400 text-[11px] font-light mt-0.5">Full-Stack & Mobile</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors">
              <Sparkles size={16} className="text-[#10b981] mb-2" />
              <div className="text-white text-xs font-semibold">3D & WebGL</div>
              <div className="text-gray-400 text-[11px] font-light mt-0.5">Three.js & Shaders</div>
            </div>
          </div>

          {/* The Punchy Action Launch Button (Balanced & Centered) */}
          <div className="flex justify-center">
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 py-4 px-8 sm:px-10 bg-white text-black font-sans font-black text-xs sm:text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-[#00e5ff] hover:text-white transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] cursor-pointer group/btn"
            >
              <span>Launch My Portfolio</span>
              <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
