"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle, Zap, Users, Lightbulb, Rocket } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

// ─── Particle Component (rendered client only) ─────────────────────────────────
function FloatingParticle({ x, y, size, duration, delay }: Particle) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: "rgba(0, 229, 255, 0.6)",
      }}
      animate={{
        y: [0, -24, 0],
        opacity: [0.1, 0.4, 0.1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// ─── Contact Options ────────────────────────────────────────────────────────────
const CONTACT_OPTIONS = [
  { icon: Rocket, label: "Start a Project", desc: "Let's build something extraordinary together", color: "#00e5ff" },
  { icon: Users, label: "Partnership", desc: "Explore collaboration & co-creation opportunities", color: "#d4af37" },
  { icon: Lightbulb, label: "Expert Consultation", desc: "Strategic guidance with no fluff, just results", color: "#00e5ff" },
  { icon: Zap, label: "Join the Team", desc: "Become a core architect at Zathura Ventures", color: "#d4af37" },
];

// ─── Main Contact Export ────────────────────────────────────────────────────────
export default function CombinedCTA() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [step, setStep] = useState<"select" | "form" | "sent">("select");
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate particles purely on client to avoid hydration mismatch
  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 4,
    }));
    setParticles(generated);
  }, []);

  // Magnetic cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSelect = (label: string) => {
    setSelected(label);
    setTimeout(() => setStep("form"), 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStep("sent");
  };

  const selectedOption = CONTACT_OPTIONS.find(o => o.label === selected);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center py-24 overflow-hidden bg-transparent"
    >
      {/* Floating Particles — client-only, no hydration issue */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map(p => <FloatingParticle key={p.id} {...p} />)}
      </div>

      {/* Subtle radial spotlight following cursor */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: springX,
          y: springY,
          left: "calc(50% - 400px)",
          top: "calc(50% - 400px)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
            <span className="font-mono text-xs text-white/50 tracking-[0.2em] uppercase">Open a Channel</span>
          </div>
          <h2 className="font-sans font-light text-5xl md:text-7xl text-white tracking-tight mb-4">
            Build something <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-white to-[#d4af37]">
              legendary with us.
            </span>
          </h2>
          <p className="text-white/40 font-light text-lg max-w-lg mx-auto">
            Tell us what you need. We'll architect exactly that — no guesswork.
          </p>
        </motion.div>

        {/* Multi-Step Interface */}
        <AnimatePresence mode="wait">

          {/* Step 1 — What brings you here? */}
          {step === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {CONTACT_OPTIONS.map((opt, i) => {
                  const Icon = opt.icon;
                  return (
                    <motion.button
                      key={opt.label}
                      onClick={() => handleSelect(opt.label)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="group text-left p-7 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex items-start gap-5 cursor-pointer relative overflow-hidden"
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at 30% 50%, ${opt.color}08 0%, transparent 70%)` }}
                      />
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                        style={{ background: `${opt.color}12`, border: `1px solid ${opt.color}30` }}
                      >
                        <Icon size={22} style={{ color: opt.color }} />
                      </div>
                      <div className="relative z-10 pt-0.5">
                        <p className="font-sans font-semibold text-white text-lg mb-1 group-hover:text-[#00e5ff] transition-colors">{opt.label}</p>
                        <p className="font-sans text-white/45 text-sm font-light leading-relaxed">{opt.desc}</p>
                      </div>
                      <ArrowRight size={18} className="ml-auto text-white/15 group-hover:text-white/60 group-hover:translate-x-1 transition-all mt-1 flex-shrink-0 relative z-10" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2 — Collect details */}
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              {/* Back + Tag */}
              <div className="flex items-center gap-3 mb-8">
                <button onClick={() => setStep("select")} className="text-white/30 hover:text-white transition-colors text-sm font-sans">
                  ← Back
                </button>
                {selectedOption && (
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-medium"
                    style={{ background: `${selectedOption.color}10`, border: `1px solid ${selectedOption.color}30`, color: selectedOption.color }}
                  >
                    <selectedOption.icon size={11} />
                    {selectedOption.label}
                  </span>
                )}
              </div>

              <h3 className="font-sans text-2xl font-medium text-white mb-8">A few details to get started.</h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5" suppressHydrationWarning>
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-white/35 uppercase tracking-[0.2em]">Your Name</label>
                  <input
                    suppressHydrationWarning
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Harman Saini"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white font-sans placeholder:text-white/20 outline-none focus:border-[#00e5ff]/30 focus:bg-white/[0.05] transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-white/35 uppercase tracking-[0.2em]">Email Address</label>
                  <input
                    suppressHydrationWarning
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white font-sans placeholder:text-white/20 outline-none focus:border-[#00e5ff]/30 focus:bg-white/[0.05] transition-all"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-white/35 uppercase tracking-[0.2em]">Tell us about your vision</label>
                  <textarea
                    suppressHydrationWarning
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your project, goals, timeline, and any specific requirements..."
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white font-sans placeholder:text-white/20 outline-none focus:border-[#00e5ff]/30 focus:bg-white/[0.05] transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group w-full py-5 rounded-xl bg-white text-[#020a14] font-sans font-semibold text-base flex items-center justify-center gap-2 hover:bg-[#00e5ff] transition-all duration-400"
                >
                  Send Message
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* Step 3 — Confirmation */}
          {step === "sent" && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 280 }}
                className="w-20 h-20 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/25 flex items-center justify-center mb-8"
              >
                <CheckCircle className="text-[#00e5ff]" size={34} />
              </motion.div>
              <h3 className="font-sans font-semibold text-4xl text-white mb-3">Signal received.</h3>
              <p className="font-sans text-white/45 font-light text-lg max-w-md mb-10">
                We'll get back to you within 24 hours to start building your vision.
              </p>
              <button
                onClick={() => { setStep("select"); setName(""); setEmail(""); setMessage(""); setSelected(null); }}
                className="font-sans text-sm text-white/30 hover:text-white/70 transition-colors"
              >
                Send another message →
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
