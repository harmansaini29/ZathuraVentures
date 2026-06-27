"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, Mail, Link2, Code2, ChevronRight, ChevronLeft, Star, Zap, Shield, Cpu, Palette, Server } from "lucide-react";

/* ─── Team Data ─────────────────────────────────────────────────────────────── */
const TEAM = [
  {
    id: "harman", name: "Harman Saini", initials: "HS", role: "CEO & Founder", dept: "Executive", tier: "ceo", icon: Star,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=1000",
    bio: "Visionary entrepreneur obsessed with turning complex challenges into market-defining digital solutions. Harman leads Zathura with bold strategy, hands-on technical depth, and an uncompromising standard of excellence.",
    skills: ["Strategic Leadership", "Product Vision", "Enterprise Architecture", "Venture Building", "Team Culture"],
    quote: "Build with intent. Architect for infinity.",
    stats: { projects: "40+", years: "8+", clients: "25+" },
    social: { email: "harman@zathuraventures.com", linkedin: "#", github: "#" },
    accent: "#d4af37",
  },
  {
    id: "alex", name: "Alex", initials: "AX", role: "Head of Operations", dept: "Operations", tier: "lead", icon: Shield,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=1000",
    bio: "Operations powerhouse who transforms organizational complexity into precision-engineered workflows. Alex ensures every deployment is flawless and every team is performing at its peak.",
    skills: ["Process Architecture", "Team Scaling", "Cloud Infrastructure", "Agile Leadership"],
    quote: "Execution is the only strategy that matters.",
    stats: { projects: "30+", years: "6+", clients: "20+" },
    social: { email: "alex@zathuraventures.com", linkedin: "#", github: "#" },
    accent: "#00e5ff",
  },
  {
    id: "sarah", name: "Sarah", initials: "SR", role: "Lead Architect", dept: "Engineering", tier: "lead", icon: Cpu,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800&h=1000",
    bio: "Systems architect who thinks in protocols and designs in patterns. Sarah lays the foundational blueprints that power every product we ship — scalable, secure, and built to last decades.",
    skills: ["System Design", "API Architecture", "Database Engineering", "TypeScript", "Microservices"],
    quote: "Great systems are invisible. You only notice them when they're gone.",
    stats: { projects: "35+", years: "7+", clients: "18+" },
    social: { email: "sarah@zathuraventures.com", linkedin: "#", github: "#" },
    accent: "#00e5ff",
  },
  {
    id: "david", name: "David", initials: "DV", role: "Frontend Engineer", dept: "Engineering", tier: "dev", icon: Zap,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=1000",
    bio: "Pixel-perfectionist who lives at the intersection of design and engineering. David crafts hardware-accelerated interfaces that feel impossible — until you see them running.",
    skills: ["React / Next.js", "WebGL / Three.js", "Framer Motion", "CSS Architecture"],
    quote: "Interfaces that feel like magic are just physics done right.",
    stats: { projects: "25+", years: "5+", clients: "15+" },
    social: { email: "david@zathuraventures.com", linkedin: "#", github: "#" },
    accent: "#00e5ff",
  },
  {
    id: "elena", name: "Elena", initials: "EL", role: "Backend Engineer", dept: "Engineering", tier: "dev", icon: Server,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800&h=1000",
    bio: "Backend powerhouse who builds the invisible scaffolding that makes everything run. Elena architects high-throughput microservices with bulletproof security and sub-millisecond latency.",
    skills: ["Node.js / Python", "GraphQL", "PostgreSQL", "AWS", "Docker"],
    quote: "If it can't handle 10x load, it's not production-ready.",
    stats: { projects: "28+", years: "5+", clients: "16+" },
    social: { email: "elena@zathuraventures.com", linkedin: "#", github: "#" },
    accent: "#00e5ff",
  },
  {
    id: "marcus", name: "Marcus", initials: "MC", role: "Design Director", dept: "Design", tier: "dev", icon: Palette,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800&h=1000",
    bio: "Visual architect who believes great design is felt before it's seen. Marcus turns complex functional requirements into award-worthy interfaces that convert, inspire, and endure.",
    skills: ["Figma / Principle", "Brand Identity", "Motion Design", "Design Systems"],
    quote: "Good design reduces cognitive load. Great design eliminates it.",
    stats: { projects: "32+", years: "6+", clients: "22+" },
    social: { email: "marcus@zathuraventures.com", linkedin: "#", github: "#" },
    accent: "#00e5ff",
  },
];

type Member = (typeof TEAM)[0];

/* ─── Animated counter for stats ──────────────────────────────────────────── */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const num = parseInt(value);
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 1200;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [num]);

  return (
    <div>
      <div className="font-sans font-bold text-xl text-white tabular-nums">
        {count}{suffix}
      </div>
      <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25 mt-0.5">{label}</div>
    </div>
  );
}

/* ─── Holographic Dossier Modal ───────────────────────────────────────────── */
function Dossier({ member, onClose }: { member: Member; onClose: () => void }) {
  const Icon = member.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#020a14]/92 backdrop-blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="relative z-10 w-full max-w-[900px] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[1px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${member.accent}, transparent)` }} />
        <div className="bg-[#060f1a]/95 border border-white/[0.06] rounded-b-3xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-[340px] flex-shrink-0">
              <div className="aspect-[3/4] md:aspect-auto md:h-full overflow-hidden">
                <motion.img
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#060f1a]/95 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060f1a]/95 to-transparent md:hidden" />
              <div
                className="absolute bottom-6 left-6 md:bottom-auto md:top-6 md:left-6 w-14 h-14 rounded-2xl flex items-center justify-center font-mono text-lg font-black border"
                style={{ background: `${member.accent}15`, borderColor: `${member.accent}40`, color: member.accent, boxShadow: `0 0 30px ${member.accent}20` }}
              >{member.initials}</div>
            </div>
            <div className="flex-1 p-8 md:p-10 relative">
              <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all">
                <X size={16} />
              </button>
              <div className="flex items-center gap-2 mb-4">
                <Icon size={12} style={{ color: member.accent }} />
                <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: member.accent }}>{member.dept}</span>
              </div>
              <h2 className="font-sans font-bold text-4xl text-white tracking-tight mb-1">{member.name}</h2>
              <p className="font-sans text-base mb-6" style={{ color: `${member.accent}cc` }}>{member.role}</p>
              <blockquote className="text-sm font-sans italic font-light mb-6 pl-4 border-l-2" style={{ color: "rgba(255,255,255,0.45)", borderColor: `${member.accent}50` }}>
                &ldquo;{member.quote}&rdquo;
              </blockquote>
              <p className="font-sans text-[15px] text-white/50 leading-relaxed font-light mb-8">{member.bio}</p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {Object.entries(member.stats).map(([key, val]) => (
                  <div key={key} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="font-sans font-bold text-xl text-white">{val}</div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 mt-1">{key}</div>
                  </div>
                ))}
              </div>
              <div className="mb-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 mb-3">Core Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] font-sans text-xs text-white/55">{s}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-5 border-t border-white/[0.05]">
                <a href={`mailto:${member.social.email}`} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/45 hover:text-white hover:bg-white/[0.06] text-sm font-sans transition-all"><Mail size={13} /> Email</a>
                <a href={member.social.linkedin} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/45 hover:text-[#00e5ff] hover:bg-white/[0.06] text-sm font-sans transition-all"><Link2 size={13} /> LinkedIn</a>
                <a href={member.social.github} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/45 hover:text-white hover:bg-white/[0.06] text-sm font-sans transition-all"><Code2 size={13} /> GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Film Strip Panel ────────────────────────────────────────────────────── */
function MemberPanel({ member, index, activeIndex, onSelect, onDossier }: {
  member: Member; index: number; activeIndex: number; onSelect: () => void; onDossier: () => void;
}) {
  const isActive = index === activeIndex;
  const Icon = member.icon;

  // Parallax on hover for active panel
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const imgX = useSpring(useTransform(mx, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const imgY = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);
  const handleLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <motion.div
      onClick={isActive ? onDossier : onSelect}
      onMouseMove={isActive ? handleMove : undefined}
      onMouseLeave={isActive ? handleLeave : undefined}
      className="relative cursor-pointer overflow-hidden flex-shrink-0 group"
      animate={{ width: isActive ? "clamp(340px, 45vw, 520px)" : "clamp(70px, 9vw, 110px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: "min(72vh, 580px)", borderRadius: "20px" }}
    >
      {/* Background Image with parallax */}
      <motion.img
        src={member.image}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ x: isActive ? imgX : 0, y: isActive ? imgY : 0 }}
        animate={{
          filter: isActive ? "grayscale(0%) brightness(0.65)" : "grayscale(100%) brightness(0.22)",
          scale: isActive ? 1.1 : 1.2,
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020a14] via-[#020a14]/20 to-transparent" />
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ background: `linear-gradient(160deg, ${member.accent}0a 0%, transparent 50%)` }}
      />

      {/* Collapsed: vertical text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-white/30" style={{ writingMode: "vertical-rl" }}>
          {member.name.split(" ")[0]}
        </div>
        {/* Index number */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-white/15">
          {String(index + 1).padStart(2, "0")}
        </div>
      </motion.div>

      {/* Expanded: full overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-8"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, delay: isActive ? 0.15 : 0 }}
        style={{ pointerEvents: isActive ? "auto" : "none" }}
      >
        {/* Department badge */}
        <motion.div
          initial={false}
          animate={{ x: isActive ? 0 : -20, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${member.accent}15`, border: `1px solid ${member.accent}35` }}>
            <Icon size={14} style={{ color: member.accent }} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: `${member.accent}bb` }}>{member.dept}</span>
        </motion.div>

        {/* Name */}
        <motion.h3
          initial={false}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="font-sans font-bold text-3xl md:text-4xl text-white tracking-tight mb-1 leading-tight"
        >{member.name}</motion.h3>

        <motion.p
          initial={false}
          animate={{ y: isActive ? 0 : 15, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-sans text-sm text-white/50 font-light mb-5"
        >{member.role}</motion.p>

        {/* Quote with typewriter feel */}
        <motion.p
          initial={false}
          animate={{ y: isActive ? 0 : 12, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="font-sans text-[13px] text-white/30 italic font-light mb-6 max-w-[340px] leading-relaxed"
        >&ldquo;{member.quote}&rdquo;</motion.p>

        {/* Stats with animated counters */}
        <motion.div
          initial={false}
          animate={{ y: isActive ? 0 : 10, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-6 mb-6"
        >
          {isActive && Object.entries(member.stats).map(([key, val]) => (
            <AnimatedStat key={key} value={val} label={key} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={false}
          animate={{ y: isActive ? 0 : 10, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          onClick={(e) => { e.stopPropagation(); onDossier(); }}
          className="w-fit flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-sans font-medium border transition-all duration-300 hover:gap-3"
          style={{ background: `${member.accent}10`, borderColor: `${member.accent}30`, color: member.accent }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `${member.accent}25`; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = `${member.accent}10`; }}
        >
          View Dossier
          <ChevronRight size={14} />
        </motion.button>
      </motion.div>

      {/* Accent lines */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ background: `linear-gradient(90deg, transparent, ${member.accent}, transparent)`, transformOrigin: "left" }}
      />
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-[2px]"
        animate={{ opacity: isActive ? 0 : 0.4 }}
        transition={{ duration: 0.3 }}
        style={{ background: `linear-gradient(to bottom, transparent, ${member.accent}60, transparent)` }}
      />
    </motion.div>
  );
}

/* ─── Main Export ──────────────────────────────────────────────────────────── */
export default function AboutTeam() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dossier, setDossier] = useState<Member | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (dossier) return;
      if (e.key === "ArrowRight") setActiveIndex((i) => Math.min(i + 1, TEAM.length - 1));
      if (e.key === "ArrowLeft") setActiveIndex((i) => Math.max(i - 1, 0));
      if (e.key === "Enter") setDossier(TEAM[activeIndex] ?? null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dossier, activeIndex]);

  return (
    <section id="team" className="relative w-full bg-transparent py-24 md:py-32 overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.025]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)" }} />

      {/* Ambient glow that follows active member accent */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        animate={{ background: `radial-gradient(circle, ${TEAM[activeIndex].accent}06 0%, transparent 65%)` }}
        transition={{ duration: 1.2 }}
      />

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.015] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
              <span className="font-mono text-[10px] text-white/40 tracking-[0.25em] uppercase">The Architects</span>
            </div>
            <h2 className="font-sans font-light text-4xl md:text-6xl text-white tracking-tight leading-[1.1]">
              Minds behind<br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30">the machine.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase mr-3">
              {String(activeIndex + 1).padStart(2, "0")} / {String(TEAM.length).padStart(2, "0")}
            </span>
            <button onClick={() => setActiveIndex((i) => Math.max(i - 1, 0))} disabled={activeIndex === 0}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-all disabled:opacity-20 disabled:cursor-not-allowed">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setActiveIndex((i) => Math.min(i + 1, TEAM.length - 1))} disabled={activeIndex === TEAM.length - 1}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-all disabled:opacity-20 disabled:cursor-not-allowed">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Film Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex gap-3 md:gap-4 w-full overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {TEAM.map((member, i) => (
            <MemberPanel
              key={member.id}
              member={member}
              index={i}
              activeIndex={activeIndex}
              onSelect={() => setActiveIndex(i)}
              onDossier={() => setDossier(member)}
            />
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.04]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#d4af37]" /><span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Founder</span></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00e5ff]" /><span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Core Team</span></div>
          </div>
          <span className="font-mono text-[9px] text-white/15 uppercase tracking-widest hidden md:block">Click panel for dossier · Arrow keys to navigate</span>
        </div>
      </div>

      <AnimatePresence>{dossier && <Dossier member={dossier} onClose={() => setDossier(null)} />}</AnimatePresence>

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </section>
  );
}