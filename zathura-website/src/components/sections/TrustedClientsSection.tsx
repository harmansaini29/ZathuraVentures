"use client";

import React from "react";
import { motion } from "framer-motion";
import StatsCounter from "@/components/ui/StatsCounter";
import {
  Cpu,
  Layers,
  Shield,
  Zap,
  Globe,
  Database,
  Cloud,
  Terminal,
  Activity,
  Award,
} from "lucide-react";

const STATS_DATA = [
  {
    label: "Enterprise Deployments",
    value: 45,
    suffix: "+",
    description: "Multi-platform systems running in production worldwide",
    icon: Layers,
    accent: "#00e5ff",
  },
  {
    label: "Client Value Generated",
    value: 120,
    prefix: "$",
    suffix: "M+",
    description: "Capital & transaction volume processed securely",
    icon: Award,
    accent: "#d4af37",
  },
  {
    label: "High-Availability Uptime",
    value: 99.98,
    decimals: 2,
    suffix: "%",
    description: "Zero-loss resilience across distributed architectures",
    icon: Activity,
    accent: "#00e5ff",
  },
  {
    label: "Autonomous Systems Built",
    value: 100,
    suffix: "%",
    description: "Audited smart contracts and automated workflows",
    icon: Shield,
    accent: "#d4af37",
  },
];

const CLIENT_ROW_1 = [
  { name: "NVIDIA Inception", category: "AI Ecosystem", icon: Cpu },
  { name: "Microsoft Azure", category: "Cloud Architecture", icon: Cloud },
  { name: "Solana Foundation", category: "Web3 Protocols", icon: Zap },
  { name: "OpenAI Partners", category: "Intelligence Foundry", icon: Terminal },
  { name: "Stripe Atlas", category: "FinTech Infrastructure", icon: Globe },
  { name: "Vercel Enterprise", category: "Edge Network", icon: Layers },
  { name: "Supabase Cloud", category: "Data Engine", icon: Database },
  { name: "Polygon Labs", category: "Zero-Knowledge", icon: Shield },
];

const CLIENT_ROW_2 = [
  { name: "Amazon Web Services", category: "Serverless Scale", icon: Cloud },
  { name: "Google Cloud Platform", category: "AI Compute", icon: Cpu },
  { name: "Chainlink Network", category: "Oracle Data Feeds", icon: Globe },
  { name: "Arbitrum Nitro", category: "L2 Scalability", icon: Zap },
  { name: "Anthropic Claude", category: "Cognitive AI", icon: Terminal },
  { name: "Cloudflare Workers", category: "Global Mesh", icon: Shield },
  { name: "Docker Enterprise", category: "Container Fabric", icon: Layers },
  { name: "Ethereum Foundation", category: "Decentralized Core", icon: Database },
];

export default function TrustedClientsSection() {
  return (
    <section
      id="clients"
      className="relative w-full py-28 md:py-36 bg-[#020a14] overflow-hidden select-none border-t border-white/[0.05]"
    >
      {/* Background radial spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] mb-5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_10px_#00e5ff] animate-pulse" />
            <span className="font-mono text-[10px] text-white/50 uppercase tracking-[0.3em]">
              Proven Track Record
            </span>
          </div>

          <h2 className="font-sans font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6">
            Trusted by the <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#00e5ff]">
              Architects of Tomorrow.
            </span>
          </h2>

          <p className="text-white/45 font-light text-base md:text-lg leading-relaxed">
            From breakthrough venture incubations to enterprise-grade decentralized systems, we engineer with zero compromises.
          </p>
        </motion.div>

        {/* Stats Grid using StatsCounter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {STATS_DATA.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
                className="relative p-7 rounded-2xl bg-white/[0.015] border border-white/[0.07] backdrop-blur-md overflow-hidden group transition-all duration-300"
              >
                {/* Top Icon and Accent Pip */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${stat.accent}12`,
                      borderColor: `${stat.accent}30`,
                      color: stat.accent,
                      boxShadow: `0 0 20px ${stat.accent}15`,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: stat.accent, boxShadow: `0 0 8px ${stat.accent}` }}
                  />
                </div>

                {/* Animated Stat Number */}
                <div className="font-sans font-black text-4xl md:text-5xl text-white tracking-tight mb-2 flex items-baseline">
                  <StatsCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    duration={2}
                    className="text-white"
                  />
                </div>

                {/* Label & Description */}
                <h3 className="font-sans font-semibold text-sm text-white/90 mb-1">
                  {stat.label}
                </h3>
                <p className="font-sans text-xs text-white/40 leading-relaxed font-light">
                  {stat.description}
                </p>

                {/* Bottom subtle glow highlight */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Double-Sided Flowing Carousel of Major Client Logos */}
      <div className="relative w-full space-y-5 overflow-hidden py-4">
        
        {/* Soft edge fade masks on sides */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#020a14] via-[#020a14]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#020a14] via-[#020a14]/80 to-transparent z-20 pointer-events-none" />

        {/* Track 1: Left scroll */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-6 animate-scroll-left" style={{ width: "max-content" }}>
            {[...CLIENT_ROW_1, ...CLIENT_ROW_1, ...CLIENT_ROW_1].map((client, i) => (
              <div
                key={`r1-${i}`}
                className="shrink-0 w-[180px] h-[80px] flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 gap-1"
              >
                <span className="font-mono font-bold text-white/80 text-xs uppercase tracking-wider text-center">{client.name}</span>
                <span className="font-mono text-white/30 text-[9px] uppercase tracking-widest text-center">{client.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Right scroll */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-6 animate-scroll-right" style={{ width: "max-content" }}>
            {[...CLIENT_ROW_2, ...CLIENT_ROW_2, ...CLIENT_ROW_2].map((client, i) => (
              <div
                key={`r2-${i}`}
                className="shrink-0 w-[180px] h-[80px] flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 gap-1"
              >
                <span className="font-mono font-bold text-white/80 text-xs uppercase tracking-wider text-center">{client.name}</span>
                <span className="font-mono text-white/30 text-[9px] uppercase tracking-widest text-center">{client.category}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
