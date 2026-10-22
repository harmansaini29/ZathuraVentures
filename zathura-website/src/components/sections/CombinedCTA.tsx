"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Send, Shield, Sparkles } from "lucide-react";

// Dynamically import client-side WebGL / Canvas harmonic cylinder
const VerticalColumnMade = dynamic(
  () => import("@/components/ui/VerticalColumnMade"),
  { ssr: false }
);

/* ─── Animated Grid Background ────────────────────────────────────────────── */
function GridBG() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
      <div
        className="w-full h-full"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

/* ─── Floating Status Nodes ───────────────────────────────────────────────── */
function StatusNodes() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const nodes = [
    { label: "Uplink", status: "online", x: "6%", y: "14%" },
    { label: "Relay", status: "online", x: "92%", y: "18%" },
    { label: "Zero-Knowledge", status: "online", x: "88%", y: "82%" },
    { label: "Encrypted", status: "online", x: "8%", y: "86%" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      {nodes.map((n, i) => (
        <motion.div
          key={n.label}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
          className="absolute flex items-center gap-2"
          style={{ left: n.x, top: n.y }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">{n.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

const DELIVERABLES = [
  {
    title: "Enterprise SEO & Lighthouse 99+",
    detail: "Sub-10ms Core Web Vitals & guaranteed top search engine optimization",
  },
  {
    title: "1-Year High-Speed Cloud Hosting",
    detail: "NVMe global edge CDN, automated zero-SSL & continuous deployment pipeline",
  },
  {
    title: "24/7 Dedicated Architectural Support",
    detail: "Round-the-clock priority incident telemetry with zero-loss SLA resilience",
  },
  {
    title: "Autonomous AI & Spatial 3D Stacks",
    detail: "Bespoke GPU WebGL shaders & deterministic vector AI integration",
  },
  {
    title: "Zero-Trust Cryptographic Hardening",
    detail: "Automated penetration defenses & distributed cryptographic integrity",
  },
];

/* ─── Main Connect Us Export ──────────────────────────────────────────────── */
export default function CombinedCTA() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setSent(true);
  };

  const reset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSent(false);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden bg-[#010612] border-t border-[#00e5ff]/10"
    >
      <GridBG />
      <StatusNodes />

      {/* Atmospheric Blue Lightning Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,119,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Minimalist, High-Impact Header (Less Words, More Impact) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00e5ff]/30 bg-[#061226]/80 mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]" />
            </span>
            <span className="font-mono text-[10px] text-[#00e5ff] tracking-[0.25em] uppercase font-bold">
              Direct Uplink · Secure Channel
            </span>
          </div>
          <h2 className="font-sans font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-3 leading-[1.1]">
            Elevate Your <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a5f3fc] to-[#00e5ff]">Digital Horizon</span>
          </h2>
          <p className="text-[#8eaec9] font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Direct high-throughput architectural transmission to Harman Saini and the core engineering team.
          </p>
        </motion.div>

        {/* Unified Command Console: 3 Things Properly Aligned & Level with Component */}
        <div className="relative rounded-3xl border border-[#00e5ff]/25 bg-[#030a18]/90 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_40px_rgba(0,229,255,0.12)] overflow-hidden">
          
          {/* Top Console Bar */}
          <div className="px-6 py-3.5 border-b border-[#00e5ff]/15 bg-[#010612]/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#0077ff] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] inline-block" />
              <span className="font-mono text-[11px] text-[#8eaec9] ml-2 tracking-widest uppercase">
                ZATHURA NEXUS CONSOLE · SECURE CHANNEL
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#00e5ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
              <span>LIVE TRANSMISSION READY</span>
            </div>
          </div>

          {/* 3-Column Split: Left (Cylinder) | Middle (Pros & Benefits) | Right (Form) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[640px]">

            {/* ── 1. LEFT COLUMN: Circular Component (VerticalColumnMade) ── */}
            <div className="relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#00e5ff]/15 bg-[#010714] overflow-hidden min-h-[480px]">
              
              {/* Telemetry Header */}
              <div className="px-6 py-3.5 border-b border-[#00e5ff]/15 flex items-center justify-between text-xs font-mono text-[#8eaec9] bg-[#020b18]/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
                  <span className="text-white text-[11px] font-semibold tracking-wider uppercase">
                    Harmonic Kinetic Cylinder
                  </span>
                </div>
                <span className="text-[#00e5ff] text-[10px] uppercase tracking-widest font-mono">
                  Drag to Rotate
                </span>
              </div>

              {/* 3D Circular Component Rendering Area */}
              <div className="relative flex-1 w-full h-[460px] sm:h-[500px] lg:h-full flex items-center justify-center overflow-hidden">
                <VerticalColumnMade
                  text="ZATHURA VENTURES ARCHITECTURAL CORE PROTOCOL "
                  baseColor="#00e5ff"
                  background="#010714"
                  speed={80}
                  scale={180}
                  wave={70}
                  dragSensitivity={100}
                  style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}
                />
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="px-6 py-3.5 border-t border-[#00e5ff]/15 flex items-center justify-between text-[10px] font-mono text-[#8eaec9] bg-[#020b18]/80">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>256-BIT ZK HANDSHAKE</span>
                </span>
                <span className="text-[#00e5ff] tracking-wider uppercase">
                  DIRECT ROUTING ACTIVE
                </span>
              </div>

            </div>

            {/* ── 2. MIDDLE COLUMN: Pros and Benefits (Spacious, Normal Font Text) ── */}
            <div className="border-b lg:border-b-0 lg:border-r border-[#00e5ff]/15 p-6 sm:p-8 flex flex-col justify-between bg-[#020919]/60">
              <div>
                {/* Header Tag */}
                <div className="flex items-center gap-2 text-[#00e5ff] font-mono text-[11px] uppercase tracking-widest mb-1.5 font-semibold">
                  <Shield size={14} />
                  <span>Verified Deliverables</span>
                </div>
                <h3 className="font-sans font-bold text-xl text-white tracking-tight mb-2">
                  Architectural Advantages
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#8eaec9] font-light leading-relaxed mb-6">
                  Every system engineered with zero compromise on speed, security, and institutional SLA.
                </p>

                {/* Deliverables List: Clear, readable normal font text with right tick marks */}
                <div className="space-y-3.5">
                  {DELIVERABLES.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-[#040e22]/90 border border-[#00e5ff]/20 backdrop-blur-md hover:border-[#00e5ff]/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.12)] transition-all group"
                    >
                      {/* Left: Deliverable Description */}
                      <div className="flex-1 pr-3">
                        <h4 className="font-sans font-medium text-white text-sm group-hover:text-[#a5f3fc] transition-colors leading-snug">
                          {item.title}
                        </h4>
                        <p className="font-sans text-xs text-[#8eaec9] font-light mt-1 leading-normal">
                          {item.detail}
                        </p>
                      </div>

                      {/* Right: Tick Mark as Bulletin */}
                      <div className="w-7 h-7 rounded-full bg-[#00e5ff]/15 border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff] shrink-0 group-hover:bg-[#00e5ff] group-hover:text-[#001221] shadow-[0_0_10px_rgba(0,229,255,0.25)] transition-all">
                        <Check size={13} strokeWidth={2.8} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom SLA Telemetry */}
              <div className="mt-6 pt-4 border-t border-[#00e5ff]/15 flex items-center justify-between text-[11px] font-mono text-[#8eaec9]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span className="text-white text-xs">SLA: 100% On-Time Delivery</span>
                </div>
                <span className="text-[#00e5ff] text-[11px] font-bold">ZERO-LOSS GUARANTEE</span>
              </div>
            </div>

            {/* ── 3. RIGHT COLUMN: Fast Project Transmission Form ── */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#020a1c]/70">
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Header Tag */}
                      <div className="flex items-center gap-2 text-[#00e5ff] font-mono text-[11px] uppercase tracking-widest mb-1.5 font-semibold">
                        <Send size={14} />
                        <span>Secure Dispatch</span>
                      </div>
                      <h3 className="font-sans font-bold text-xl text-white tracking-tight mb-2">
                        Initiate Transmission
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#8eaec9] font-light leading-relaxed mb-6">
                        Direct high-priority dispatch with guaranteed response within 24 hours.
                      </p>

                      <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                        suppressHydrationWarning
                      >
                        {/* Full Name */}
                        <div>
                          <label className="font-mono text-[10px] uppercase tracking-[0.2em] block mb-1.5 text-white/50">
                            Full Name *
                          </label>
                          <input
                            suppressHydrationWarning
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Harman Saini"
                            className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm font-sans placeholder:text-white/20 outline-none focus:border-[#00e5ff]/50 focus:bg-white/[0.06] transition-all"
                          />
                        </div>

                        {/* Email Address */}
                        <div>
                          <label className="font-mono text-[10px] uppercase tracking-[0.2em] block mb-1.5 text-white/50">
                            Work Email *
                          </label>
                          <input
                            suppressHydrationWarning
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="founder@venture.com"
                            className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm font-sans placeholder:text-white/20 outline-none focus:border-[#00e5ff]/50 focus:bg-white/[0.06] transition-all"
                          />
                        </div>

                        {/* Project Scope */}
                        <div>
                          <label className="font-mono text-[10px] uppercase tracking-[0.2em] block mb-1.5 text-white/50">
                            Project Scope
                          </label>
                          <input
                            suppressHydrationWarning
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Spatial WebGL, Enterprise Protocol, AI Engine..."
                            className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm font-sans placeholder:text-white/20 outline-none focus:border-[#00e5ff]/50 focus:bg-white/[0.06] transition-all"
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label className="font-mono text-[10px] uppercase tracking-[0.2em] block mb-1.5 text-white/50">
                            Transmission Details *
                          </label>
                          <textarea
                            suppressHydrationWarning
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            placeholder="Describe your vision, scale, milestones, and architectural requirements..."
                            className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm font-sans placeholder:text-white/20 outline-none focus:border-[#00e5ff]/50 focus:bg-white/[0.06] transition-all resize-none"
                          />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                          suppressHydrationWarning
                          type="submit"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="group w-full py-4 rounded-xl font-sans font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden cursor-pointer shadow-xl mt-2"
                          style={{
                            background: "linear-gradient(135deg, #00e5ff 0%, #0088ff 100%)",
                            color: "#020a14",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          <span className="relative z-10 flex items-center gap-2">
                            Send Transmission
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        </motion.button>
                      </form>
                    </div>

                    {/* Footer Telemetry */}
                    <div className="mt-6 pt-4 border-t border-[#00e5ff]/15 flex items-center justify-between text-[11px] font-mono text-[#8eaec9]">
                      <span className="text-white/60 text-xs">Encrypted Uplink</span>
                      <span className="text-[#00e5ff] text-[11px] font-bold">256-BIT TLS 1.3</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 text-center flex flex-col items-center justify-center py-16 h-full"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-5 shadow-[0_0_25px_rgba(52,211,153,0.3)]">
                      <Check size={28} />
                    </div>
                    <h3 className="font-sans font-bold text-2xl text-white mb-2">Transmission Received</h3>
                    <p className="font-sans text-white/50 text-sm max-w-sm mb-6 leading-relaxed">
                      Your transmission has been encrypted and routed directly to Harman Saini and the core architectural team. Expect a response shortly.
                    </p>
                    <button
                      suppressHydrationWarning
                      onClick={reset}
                      className="px-6 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Send Another Transmission
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
