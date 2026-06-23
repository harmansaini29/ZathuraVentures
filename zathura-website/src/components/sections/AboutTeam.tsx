"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, Mail, Link2, Code2, Briefcase, Star } from "lucide-react";

// ─── Team Data ──────────────────────────────────────────────────────────────────
const TEAM = [
  {
    id: "harman",
    name: "Harman Saini",
    role: "CEO & Founder",
    dept: "Executive",
    tier: "ceo",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=1000",
    bio: "Visionary entrepreneur obsessed with turning complex challenges into market-defining digital solutions. Harman leads Zathura with bold strategy, hands-on technical depth, and an uncompromising standard of excellence.",
    skills: ["Strategic Leadership", "Product Vision", "Enterprise Architecture", "Venture Building", "Team Culture"],
    quote: "Build with intent. Architect for infinity.",
    social: { email: "harman@zathuraventures.com", linkedin: "#", github: "#" },
    accentColor: "#d4af37",
  },
  {
    id: "alex",
    name: "Alex",
    role: "Head of Operations",
    dept: "Operations",
    tier: "lead",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=1000",
    bio: "Operations powerhouse who transforms organizational complexity into precision-engineered workflows. Alex ensures every deployment is flawless and every team is performing at its peak.",
    skills: ["Process Architecture", "Team Scaling", "Cloud Infrastructure", "Agile Leadership"],
    quote: "Execution is the only strategy that matters.",
    social: { email: "alex@zathuraventures.com", linkedin: "#", github: "#" },
    accentColor: "#00e5ff",
  },
  {
    id: "sarah",
    name: "Sarah",
    role: "Lead Architect",
    dept: "Engineering",
    tier: "lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800&h=1000",
    bio: "Systems architect who thinks in protocols and designs in patterns. Sarah lays the foundational blueprints that power every product we ship — scalable, secure, and built to last decades.",
    skills: ["System Design", "API Architecture", "Database Engineering", "TypeScript", "Microservices"],
    quote: "Great systems are invisible. You only notice them when they're gone.",
    social: { email: "sarah@zathuraventures.com", linkedin: "#", github: "#" },
    accentColor: "#00e5ff",
  },
  {
    id: "david",
    name: "David",
    role: "Frontend Engineer",
    dept: "Engineering",
    tier: "dev",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=1000",
    bio: "Pixel-perfectionist who lives at the intersection of design and engineering. David crafts hardware-accelerated interfaces that feel impossible — until you see them running.",
    skills: ["React / Next.js", "WebGL / Three.js", "Framer Motion", "CSS Architecture"],
    quote: "Interfaces that feel like magic are just physics done right.",
    social: { email: "david@zathuraventures.com", linkedin: "#", github: "#" },
    accentColor: "#00e5ff",
  },
  {
    id: "elena",
    name: "Elena",
    role: "Backend Engineer",
    dept: "Engineering",
    tier: "dev",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800&h=1000",
    bio: "Backend powerhouse who builds the invisible scaffolding that makes everything run. Elena architects high-throughput microservices with bulletproof security and sub-millisecond latency.",
    skills: ["Node.js / Python", "GraphQL", "PostgreSQL", "AWS", "Docker"],
    quote: "If it can't handle 10x load, it's not production-ready.",
    social: { email: "elena@zathuraventures.com", linkedin: "#", github: "#" },
    accentColor: "#00e5ff",
  },
  {
    id: "marcus",
    name: "Marcus",
    role: "Design Director",
    dept: "Design",
    tier: "dev",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800&h=1000",
    bio: "Visual architect who believes great design is felt before it's seen. Marcus turns complex functional requirements into award-worthy interfaces that convert, inspire, and endure.",
    skills: ["Figma / Principle", "Brand Identity", "Motion Design", "Design Systems"],
    quote: "Good design reduces cognitive load. Great design eliminates it.",
    social: { email: "marcus@zathuraventures.com", linkedin: "#", github: "#" },
    accentColor: "#00e5ff",
  },
];

type TeamMember = typeof TEAM[0];

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TeamCard3D({ member, index, onSelect }: { member: TeamMember; index: number; onSelect: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 250, damping: 25 });
  const smy = useSpring(my, { stiffness: 250, damping: 25 });
  const rx = useTransform(smy, [-0.5, 0.5], ["8deg", "-8deg"]);
  const ry = useTransform(smx, [-0.5, 0.5], ["-8deg", "8deg"]);

  const isCEO = member.tier === "ceo";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1000 }}
      className={`group cursor-pointer relative flex-shrink-0 ${isCEO ? "w-full md:w-[380px]" : "w-[280px]"}`}
    >
      {/* Card container */}
      <div
        className="relative rounded-2xl overflow-hidden border transition-all duration-500"
        style={{
          borderColor: `${member.accentColor}20`,
          background: "rgba(255,255,255,0.012)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${isCEO ? "aspect-[3/4]" : "aspect-[3/4]"}`}>
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
          />
          {/* Dark bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020a14] via-[#020a14]/40 to-transparent" />

          {/* CEO badge */}
          {isCEO && (
            <div
              className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest"
              style={{ background: `${member.accentColor}20`, border: `1px solid ${member.accentColor}40`, color: member.accentColor }}
            >
              <Star size={10} fill="currentColor" />
              Founder
            </div>
          )}

          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(circle at 50% 80%, ${member.accentColor}12 0%, transparent 70%)` }}
          />
        </div>

        {/* Info bar */}
        <div className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: member.accentColor }}>
            {member.dept}
          </p>
          <h3 className="font-sans font-semibold text-white text-lg leading-tight mb-0.5">{member.name}</h3>
          <p className="font-sans text-sm text-white/50 font-light">{member.role}</p>
        </div>

        {/* Click shimmer line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          style={{ background: `linear-gradient(90deg, transparent, ${member.accentColor}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function MemberModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#020a14]/80 backdrop-blur-2xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="relative z-10 w-full max-w-2xl bg-[#030e1a] border border-white/8 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Accent bar */}
        <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${member.accentColor}, transparent)` }} />

        <div className="flex flex-col md:flex-row">
          {/* Left — Image */}
          <div className="relative w-full md:w-64 flex-shrink-0 aspect-[3/4] md:aspect-auto md:h-auto overflow-hidden">
            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#030e1a] hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030e1a] to-transparent md:hidden" />
          </div>

          {/* Right — Content */}
          <div className="flex-1 p-7 md:p-8">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            >
              <X size={15} />
            </button>

            {/* Identity */}
            <div className="mb-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">{member.dept}</span>
              <h2 className="font-sans font-bold text-3xl text-white mt-1">{member.name}</h2>
              <p className="font-sans text-sm mt-1" style={{ color: member.accentColor }}>{member.role}</p>
            </div>

            {/* Quote */}
            <blockquote
              className="text-sm font-sans italic font-light mb-5 pl-3 border-l-2"
              style={{ color: "rgba(255,255,255,0.5)", borderColor: `${member.accentColor}50` }}
            >
              "{member.quote}"
            </blockquote>

            {/* Bio */}
            <p className="font-sans text-sm text-white/55 leading-relaxed font-light mb-6">{member.bio}</p>

            {/* Skills */}
            <div className="mb-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 flex items-center gap-2 mb-3">
                <Briefcase size={10} /> Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {member.skills.map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-sans text-xs text-white/60">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 pt-4 border-t border-white/5">
              <a href={`mailto:${member.social.email}`} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/8 text-white/50 hover:text-white text-sm font-sans transition-all hover:bg-white/[0.08]">
                <Mail size={13} /> Email
              </a>
              <a href={member.social.linkedin} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/8 text-white/50 text-sm font-sans transition-all hover:bg-white/[0.08] hover:text-[#00e5ff]">
                <Link2 size={13} /> LinkedIn
              </a>
              <a href={member.social.github} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/8 text-white/50 hover:text-white text-sm font-sans transition-all hover:bg-white/[0.08]">
                <Code2 size={13} /> GitHub
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function AboutTeam() {
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const ceo = TEAM.find(m => m.tier === "ceo")!;
  const rest = TEAM.filter(m => m.tier !== "ceo");

  return (
    <section id="team" className="relative w-full min-h-screen bg-transparent py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#00e5ff]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
            <span className="font-mono text-xs text-white/50 tracking-[0.2em] uppercase">Core Team</span>
          </div>
          <h2 className="font-sans font-light text-4xl md:text-6xl text-white tracking-tight">
            The minds behind <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">the machine.</span>
          </h2>
          <p className="text-white/35 font-light text-lg mt-4 max-w-md">Click any card to see professional details.</p>
        </motion.div>

        {/* ── CEO Row (featured, full-width feel) ── */}
        <div className="mb-16 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <TeamCard3D member={ceo} index={0} onSelect={() => setSelected(ceo)} />

          {/* CEO text blurb alongside the card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center max-w-md"
          >
            <div className="flex items-center gap-2 mb-4">
              <Star size={14} className="text-[#d4af37]" fill="currentColor" />
              <span className="font-mono text-xs text-[#d4af37] uppercase tracking-widest">Executive</span>
            </div>
            <h3 className="font-sans font-medium text-3xl text-white mb-4 tracking-tight">{ceo.name}</h3>
            <p className="font-sans text-white/50 font-light leading-relaxed mb-6 text-lg">{ceo.bio.slice(0, 160)}...</p>
            <button
              onClick={() => setSelected(ceo)}
              className="group w-fit flex items-center gap-2 text-sm font-sans text-[#d4af37] hover:gap-3 transition-all"
            >
              View full profile
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/5 mb-16" />

        {/* ── Team Cards (5 cards in a scroll row) ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 place-items-start">
          {rest.map((member, i) => (
            <TeamCard3D key={member.id} member={member} index={i + 1} onSelect={() => setSelected(member)} />
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-16 pt-8 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Founder</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00e5ff]" />
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Team</span>
          </div>
          <span className="font-mono text-[10px] text-white/20 ml-auto">Click any card for full profile</span>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <MemberModal member={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}