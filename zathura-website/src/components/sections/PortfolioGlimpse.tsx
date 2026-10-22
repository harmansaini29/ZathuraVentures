"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  RotateCcw,
  Globe,
  Maximize2,
  Lock,
  MousePointerClick,
  CheckCircle2,
} from "lucide-react";

export default function PortfolioGlimpse() {
  const portfolioUrl = "https://harmansaini29.vercel.app/";
  const [iframeKey, setIframeKey] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <section
      id="portfolio"
      className="relative w-full pt-36 sm:pt-44 pb-28 sm:pb-36 bg-[#010612] overflow-hidden select-none z-10 border-t border-[#00e5ff]/10"
    >
      {/* Soft Ambient Blue Lightning Illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08)_0%,rgba(0,119,255,0.03)_50%,transparent_75%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header: Prominently "My Portfolio" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#061226]/80 border border-[#00e5ff]/30 mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.15)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#00e5ff] font-bold">
                Live Interactive Telecast
              </span>
            </div>

            {/* Clear, Big, Visible Heading: My Portfolio */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              My Portfolio
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-[#8eaec9] text-sm sm:text-base font-normal max-w-md leading-relaxed">
              Live broadcast of Harman Saini&apos;s official portfolio featuring spatial 3D WebGL experiences and algorithmic systems.
            </p>
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#00e5ff] text-[#001221] font-sans text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,229,255,0.4)] whitespace-nowrap cursor-pointer group shrink-0"
            >
              <span>Launch Live Site</span>
              <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Rectangular Format Live Telecast Frame */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-3xl overflow-hidden border border-[#00e5ff]/25 bg-[#030a18] shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_40px_rgba(0,229,255,0.15)] flex flex-col"
        >
          {/* Clean Rectangular Header Bar */}
          <div className="bg-[#040f21] border-b border-[#00e5ff]/15 px-6 py-4 flex items-center justify-between gap-4">
            
            {/* Left: Domain Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#00e5ff]/30 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#0077ff]/30 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#00e5ff]/50 inline-block" />
              </div>
              <div className="h-4 w-px bg-white/15 mx-1" />
              <div className="flex items-center gap-2 font-mono text-xs text-[#8eaec9]">
                <Lock size={13} className="text-[#00e5ff]" />
                <span className="text-white font-semibold">harmansaini29.vercel.app</span>
              </div>
            </div>

            {/* Right: Interaction Mode & Controls */}
            <div className="flex items-center gap-3">
              <button
                suppressHydrationWarning
                onClick={() => setIsInteracting(!isInteracting)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  isInteracting
                    ? "bg-[#00e5ff] text-[#001221] border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                    : "bg-[#061226] text-[#8eaec9] hover:text-white border-[#00e5ff]/25"
                }`}
              >
                <MousePointerClick size={14} />
                <span>{isInteracting ? "Interacting (Click To Unlock Scroll)" : "Click To Interact Inside"}</span>
              </button>

              <button
                suppressHydrationWarning
                onClick={handleRefresh}
                title="Reload Telecast"
                className="p-2 rounded-xl bg-[#061226] border border-[#00e5ff]/20 text-[#8eaec9] hover:text-white hover:bg-[#0a1f42] transition-colors cursor-pointer"
                aria-label="Reload telecast"
              >
                <RotateCcw size={15} />
              </button>

              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in new window"
                className="p-2 rounded-xl bg-[#061226] border border-[#00e5ff]/20 text-[#8eaec9] hover:text-[#00e5ff] hover:bg-[#0a1f42] transition-colors cursor-pointer"
                aria-label="Open portfolio in new window"
              >
                <Maximize2 size={15} />
              </a>
            </div>

          </div>

          {/* Rectangular Telecast Viewport Body */}
          <div className="relative w-full bg-[#00050d] overflow-hidden" style={{ aspectRatio: "16/9", minHeight: "520px" }}>
            <iframe
              key={iframeKey}
              src={portfolioUrl}
              title="Harman Saini Official Portfolio Telecast"
              className={`w-full h-full border-none transition-opacity duration-300 ${
                isInteracting ? "pointer-events-auto" : "pointer-events-none"
              }`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />

            {/* Click-to-Interact Overlay (Protects main page scroll wheel from getting trapped) */}
            {!isInteracting && (
              <div
                onClick={() => setIsInteracting(true)}
                className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors cursor-pointer flex items-center justify-center group"
              >
                <div className="px-6 py-3 rounded-2xl bg-[#010612]/90 border border-[#00e5ff]/35 backdrop-blur-md text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-[0_0_30px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform">
                  <MousePointerClick size={16} className="text-[#00e5ff] animate-bounce" />
                  <span>Click anywhere to explore inside the telecast</span>
                </div>
              </div>
            )}

            {/* Bottom Right Direct Floating Launcher */}
            <div className="absolute bottom-6 right-6 z-20">
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#010612]/95 hover:bg-[#00e5ff] text-white hover:text-[#001221] border border-[#00e5ff]/30 font-sans text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer group"
              >
                <Globe size={16} className="text-[#00e5ff] group-hover:text-[#001221] transition-colors" />
                <span>Open Direct Live Site</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Bottom Bar Info */}
          <div className="bg-[#040f21] px-6 py-4 border-t border-[#00e5ff]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8eaec9] font-sans">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#00e5ff]" />
              <span>Harman Saini Official Portfolio • WebGL Spatial Experience</span>
            </div>
            <span className="text-[#00e5ff] font-mono">harmansaini29.vercel.app</span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
