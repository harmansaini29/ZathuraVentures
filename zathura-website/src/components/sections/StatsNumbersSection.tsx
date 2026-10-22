"use client";

import React from "react";
import { motion } from "framer-motion";
import StatsCounter from "@/components/ui/StatsCounter";

const STATS_DATA = [
  {
    value: 120,
    prefix: "$",
    suffix: "M+",
    decimals: 0,
    label: "Capital Processed",
    detail: "Institutional Volume",
  },
  {
    value: 45,
    suffix: "+",
    decimals: 0,
    label: "Enterprise Deployments",
    detail: "Production Stacks",
  },
  {
    value: 99.98,
    decimals: 2,
    suffix: "%",
    label: "Core Availability",
    detail: "Zero-Loss SLA",
  },
  {
    value: 100,
    suffix: "%",
    decimals: 0,
    label: "Audited Security",
    detail: "Cryptographic Verified",
  },
];

export default function StatsNumbersSection() {
  return (
    <section
      id="metrics"
      className="relative w-full min-h-[85vh] py-32 md:py-44 bg-[#010612] overflow-hidden select-none flex flex-col justify-center items-center"
    >
      {/* Ambient Blueish Lightning Radial Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.06)_0%,rgba(0,119,255,0.02)_50%,transparent_75%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10">
        
        {/* Clean, Minimalist, High-Impact Heading with In-Effect Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#00e5ff] font-semibold">
            Institutional Scale
          </span>
          <h2 className="font-sans font-light text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-2">
            Verified Production <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a5f3fc] to-[#00e5ff]">Metrics</span>
          </h2>
        </motion.div>

        {/* 4 Clean Stats: Soft, Spacious, In-Effect Upscaling Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS_DATA.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.85, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, borderColor: "rgba(0,229,255,0.45)" }}
              className="p-8 sm:p-9 rounded-3xl bg-[#040d1e]/50 border border-[#00e5ff]/20 backdrop-blur-2xl text-center hover:border-[#00e5ff]/50 hover:shadow-[0_20px_50px_rgba(0,229,255,0.15)] transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Stat Numerals with Soft Incandescent Glow */}
              <div className="font-sans font-black text-5xl sm:text-6xl text-white tracking-tight mb-3 flex items-center justify-center">
                <StatsCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={2.2}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e1f0ff] to-[#00e5ff]"
                />
              </div>

              {/* Clean Metric Label */}
              <div>
                <p className="font-sans font-semibold text-white text-base sm:text-lg tracking-tight mb-1.5">
                  {stat.label}
                </p>

                {/* Subtle Telemetry Tag */}
                <span className="inline-block font-mono text-[10px] sm:text-[11px] text-[#00e5ff] tracking-wider uppercase px-3 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/25">
                  {stat.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
