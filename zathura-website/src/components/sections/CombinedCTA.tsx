"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, MapPin, Clock, Mail, Phone, Send, Globe, ChevronRight } from "lucide-react";

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
    { label: "Server", status: "online", x: "8%", y: "18%" },
    { label: "API", status: "online", x: "85%", y: "12%" },
    { label: "Queue", status: "online", x: "92%", y: "75%" },
    { label: "CDN", status: "online", x: "5%", y: "82%" },
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
          <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">{n.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Info Cards ──────────────────────────────────────────────────────────── */
const INFO_ITEMS = [
  { icon: MapPin, label: "Location", value: "India · Remote-First", accent: "#00e5ff" },
  { icon: Clock, label: "Response", value: "Within 24 hours", accent: "#d4af37" },
  { icon: Globe, label: "Availability", value: "Global Clients", accent: "#00e5ff" },
  { icon: Mail, label: "Direct", value: "hello@zathura.dev", accent: "#d4af37" },
];

/* ─── Main Contact Export ─────────────────────────────────────────────────── */
export default function CombinedCTA() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 overflow-hidden bg-transparent"
    >
      <GridBG />
      <StatusNodes />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.015] mb-6 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] text-white/40 tracking-[0.25em] uppercase">Accepting Projects</span>
          </div>
          <h2 className="font-sans font-light text-4xl md:text-6xl lg:text-7xl text-white tracking-tight mb-4">
            Start a <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#d4af37]">transmission.</span>
          </h2>
          <p className="text-white/35 font-light text-lg max-w-xl mx-auto">
            Every great partnership begins with a single message. Tell us your vision — we&apos;ll architect the rest.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Split layout: Form + Info */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

                {/* Left: Form (3 cols) */}
                <div className="lg:col-span-3">
                  <div className="p-8 md:p-10 rounded-3xl bg-white/[0.015] border border-white/[0.06] backdrop-blur-sm relative overflow-hidden">
                    {/* Corner accent */}
                    <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
                      <div className="absolute top-0 left-0 w-[1px] h-12 bg-gradient-to-b from-[#00e5ff]/40 to-transparent" />
                      <div className="absolute top-0 left-0 h-[1px] w-12 bg-gradient-to-r from-[#00e5ff]/40 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
                      <div className="absolute bottom-0 right-0 w-[1px] h-12 bg-gradient-to-t from-[#00e5ff]/40 to-transparent" />
                      <div className="absolute bottom-0 right-0 h-[1px] w-12 bg-gradient-to-l from-[#00e5ff]/40 to-transparent" />
                    </div>

                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-9 h-9 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/20 flex items-center justify-center">
                        <Send size={14} className="text-[#00e5ff]" />
                      </div>
                      <div>
                        <p className="font-sans text-sm font-medium text-white">New Transmission</p>
                        <p className="font-mono text-[9px] text-white/25 uppercase tracking-widest">Encrypted · Secure</p>
                      </div>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5" suppressHydrationWarning>
                      {/* Name + Email row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="relative">
                          <motion.label
                            animate={{ color: focused === "name" ? "rgba(0,229,255,0.7)" : "rgba(255,255,255,0.25)" }}
                            className="font-mono text-[9px] uppercase tracking-[0.2em] block mb-2"
                          >Full Name</motion.label>
                          <input
                            suppressHydrationWarning
                            type="text" required value={name} onChange={(e) => setName(e.target.value)}
                            onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                            placeholder="Your name"
                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm font-sans placeholder:text-white/15 outline-none focus:border-[#00e5ff]/30 focus:bg-white/[0.05] transition-all"
                          />
                        </div>
                        <div className="relative">
                          <motion.label
                            animate={{ color: focused === "email" ? "rgba(0,229,255,0.7)" : "rgba(255,255,255,0.25)" }}
                            className="font-mono text-[9px] uppercase tracking-[0.2em] block mb-2"
                          >Email</motion.label>
                          <input
                            suppressHydrationWarning
                            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                            placeholder="name@company.com"
                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm font-sans placeholder:text-white/15 outline-none focus:border-[#00e5ff]/30 focus:bg-white/[0.05] transition-all"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <motion.label
                          animate={{ color: focused === "subject" ? "rgba(0,229,255,0.7)" : "rgba(255,255,255,0.25)" }}
                          className="font-mono text-[9px] uppercase tracking-[0.2em] block mb-2"
                        >Subject</motion.label>
                        <input
                          suppressHydrationWarning
                          type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                          onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                          placeholder="Project inquiry, partnership, consultation..."
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm font-sans placeholder:text-white/15 outline-none focus:border-[#00e5ff]/30 focus:bg-white/[0.05] transition-all"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <motion.label
                          animate={{ color: focused === "message" ? "rgba(0,229,255,0.7)" : "rgba(255,255,255,0.25)" }}
                          className="font-mono text-[9px] uppercase tracking-[0.2em] block mb-2"
                        >Message</motion.label>
                        <textarea
                          suppressHydrationWarning
                          value={message} onChange={(e) => setMessage(e.target.value)}
                          onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                          rows={5}
                          placeholder="Describe your vision, timeline, and any specific requirements..."
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm font-sans placeholder:text-white/15 outline-none focus:border-[#00e5ff]/30 focus:bg-white/[0.05] transition-all resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="group w-full py-4 rounded-xl font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden"
                        style={{
                          background: "linear-gradient(135deg, #00e5ff 0%, #0088ff 100%)",
                          color: "#020a14",
                        }}
                      >
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <span className="relative z-10 flex items-center gap-2">
                          Transmit Message
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </motion.button>
                    </form>
                  </div>
                </div>

                {/* Right: Info Panel (2 cols) */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                  {/* Info cards */}
                  {INFO_ITEMS.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        className="group p-5 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.025] transition-all duration-300 flex items-center gap-4"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                          style={{ background: `${item.accent}10`, border: `1px solid ${item.accent}20` }}
                        >
                          <Icon size={16} style={{ color: item.accent }} />
                        </div>
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 mb-1">{item.label}</p>
                          <p className="font-sans text-sm text-white/70 font-medium">{item.value}</p>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Direct email CTA */}
                  <motion.a
                    href="mailto:hello@zathura.dev"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="group mt-auto p-6 rounded-2xl border border-[#00e5ff]/15 bg-[#00e5ff]/[0.03] hover:bg-[#00e5ff]/[0.06] hover:border-[#00e5ff]/25 transition-all duration-300 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-sans text-sm font-medium text-white mb-1">Prefer email?</p>
                      <p className="font-mono text-[10px] text-[#00e5ff]/60 tracking-wider">hello@zathura.dev</p>
                    </div>
                    <ChevronRight size={18} className="text-[#00e5ff]/40 group-hover:text-[#00e5ff] group-hover:translate-x-1 transition-all" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-lg mx-auto text-center py-16"
            >
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
                className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.15) 0%, rgba(0,136,255,0.1) 100%)", border: "1px solid rgba(0,229,255,0.25)" }}
              >
                <Check className="text-[#00e5ff]" size={32} strokeWidth={3} />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-sans font-bold text-4xl text-white mb-3"
              >
                Transmission received.
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-sans text-white/40 font-light text-lg mb-4"
              >
                Your message has been encrypted and delivered to our team.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-mono text-[10px] text-[#00e5ff]/50 uppercase tracking-widest mb-10"
              >
                Expected response: &lt; 24 hours
              </motion.p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={reset}
                className="font-sans text-sm text-white/25 hover:text-white/60 transition-colors"
              >
                Send another transmission →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
