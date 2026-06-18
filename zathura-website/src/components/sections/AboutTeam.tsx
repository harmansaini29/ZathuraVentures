"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

const teamData = [
  { 
    id: "ceo", 
    name: "Harman Saini", 
    role: "CEO & Founder", 
    desc: "Architecting the multi-billion dollar digital infrastructure.", 
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800",
    stats: { commit: "99.9%", uptime: "100%", nodes: "8.4M" }
  },
  { 
    id: "manager1", 
    name: "Alex", 
    role: "Operations", 
    desc: "Scaling systems and optimizing deployment pipelines.", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800",
    stats: { efficiency: "98%", scaling: "Auto", load: "0.4s" }
  },
  { 
    id: "manager2", 
    name: "Sarah", 
    role: "Lead Dev", 
    desc: "Core engine architect and systems integration.", 
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=800",
    stats: { languages: "12+", branches: "430", commits: "12k+" }
  },
  { 
    id: "dev1", 
    name: "David", 
    role: "Frontend", 
    desc: "Crafting flawless, hardware-accelerated user interfaces.", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800",
    stats: { webgl: "Pro", framer: "Expert", paint: "0.1ms" }
  },
  { 
    id: "dev2", 
    name: "Elena", 
    role: "Backend", 
    desc: "Designing secure, high-throughput data microservices.", 
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600&h=800",
    stats: { reqs: "1M/s", latency: "2ms", db: "Graph" }
  },
  { 
    id: "dev3", 
    name: "Marcus", 
    role: "UI/UX", 
    desc: "Translating complex requirements into beautiful aesthetics.", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=800",
    stats: { figma: "God", proto: "High", css: "Pixel" }
  },
];

function TeamCard({ member, index }: { member: typeof teamData[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col w-full min-w-[280px] max-w-[350px] bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden hover:border-[#00e5ff]/40 transition-colors duration-500"
    >
      {/* Glow Behind */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00e5ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <div className="absolute inset-0 bg-[#00e5ff]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
        />
        {/* Terminal Line Decorator */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <Terminal size={14} className="text-[#00e5ff]" />
          <span className="font-mono text-[10px] text-[#00e5ff] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            ID: {member.id.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-20 bg-gradient-to-t from-[#020a14] via-[#020a14]/90 to-transparent">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="font-sans font-black text-2xl text-white m-0 tracking-tight group-hover:text-[#00e5ff] transition-colors duration-300">
              {member.name}
            </h3>
            <p className="font-mono text-xs text-[#d4af37] tracking-[0.2em] uppercase mt-1">
              {member.role}
            </p>
          </div>
          <ArrowRight className="text-white/20 group-hover:text-[#00e5ff] transition-colors duration-300 -rotate-45 group-hover:rotate-0" />
        </div>
        <p className="font-sans text-sm text-white/50 leading-relaxed font-light mb-6">
          {member.desc}
        </p>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
          {Object.entries(member.stats).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-1">
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">{key}</span>
              <span className="font-mono text-xs text-white/90 font-bold">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutTeam() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef}
      id="team" 
      className="relative w-full min-h-screen bg-transparent overflow-hidden py-32 border-t border-white/5"
    >
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#00e5ff]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <motion.div style={{ y: y1 }} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#00e5ff]" />
              <span className="font-mono text-xs text-[#00e5ff] tracking-[0.3em] uppercase font-bold">The Core Architects</span>
            </div>
            <h2 className="font-sans text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
              Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-300">Masterminds</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-lg text-white/50 max-w-sm font-light leading-relaxed"
          >
            A syndicate of world-class engineers, designers, and visionary architects building the infrastructure of tomorrow.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center md:place-items-start">
          {teamData.map((member, idx) => (
            <TeamCard key={member.id} member={member} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}