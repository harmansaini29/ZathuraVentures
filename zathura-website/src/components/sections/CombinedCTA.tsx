"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";

// Dynamically import client-side WebGL / Canvas harmonic cylinder
const VerticalColumnMade = dynamic(
  () => import("@/components/ui/VerticalColumnMade"),
  { ssr: false }
);

const KEY_POINTS = [
  {
    title: "Full-Stack Application Engineering",
    detail: "High-performance web and mobile platforms built with Next.js, React 19, TypeScript, and modern APIs.",
  },
  {
    title: "Generative AI & Agent Architectures",
    detail: "Production multi-agent decision pipelines, LangGraph automation, OpenAI integrations, and RAG workflows.",
  },
  {
    title: "Cloud Infrastructure & High Availability",
    detail: "Microservices, Docker, PostgreSQL, Supabase, and AWS deployments engineered for zero-loss uptime.",
  },
  {
    title: "Algorithmic Backends & Automated Defense",
    detail: "Dynamic risk management systems, algorithmic processing, and real-time threat detection architectures.",
  },
  {
    title: "Direct Engineering & 100% On-Time Delivery",
    detail: "Direct access to Harman Saini and the core team. Institutional commitment with guaranteed milestone delivery.",
  },
];

export default function CombinedCTA() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !message) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to deliver message.");
      }

      setSent(true);
    } catch (err: any) {
      console.error("Transmission error:", err);
      setError(err.message || "Failed to dispatch email. Please try again or email directly.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setError(null);
    setSent(false);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-[85vh] py-28 sm:py-36 md:py-40 my-8 sm:my-12 md:my-16 overflow-hidden bg-[#010612] flex flex-col items-center justify-center select-none scroll-mt-28"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.04)_0%,rgba(0,119,255,0.01)_50%,transparent_75%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 flex flex-col items-center justify-center">

        {/* Clean, Visible Header — Ample Clearance From Fixed Navbar */}
        <div className="text-center mb-12 sm:mb-16 max-w-xl mx-auto flex flex-col items-center">
          <span className="text-xs font-semibold text-[#00e5ff] uppercase tracking-widest font-mono">
            Get In Touch
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mt-2 mb-3">
            Let&apos;s Build Together
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-md">
            Have a project in mind, need scalable architecture, or want to explore collaboration? Reach out directly.
          </p>
        </div>

        {/* Fully Responsive Centered 3-Column Split: Spacious & Proportional */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center justify-center w-full">

          {/* ── 1. LEFT: Key Capabilities (4 Cols) ── */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-4 order-2 lg:order-1">
            <div>
              <h3 className="font-sans font-bold text-lg sm:text-xl text-white tracking-tight mb-1">
                Core Capabilities
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                What you receive when partnering with Harman Saini:
              </p>
            </div>

            {/* List of key points: Clean, legible typography, no heavy clutter boxes */}
            <div className="space-y-3.5">
              {KEY_POINTS.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-white text-xs sm:text-sm leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-[11px] sm:text-xs font-light mt-0.5 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] sm:text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>Available for high-impact contracts & venture engineering</span>
            </div>
          </div>

          {/* ── 2. MIDDLE: 3D Kinetic Cylinder (4 Cols) — Perfectly Scaled & Centered ── */}
          <div className="lg:col-span-4 w-full h-[280px] sm:h-[320px] flex items-center justify-center relative overflow-hidden order-1 lg:order-2 my-4 lg:my-0 mx-auto max-w-[340px]">
            <VerticalColumnMade
              text="HARMAN SAINI · ZATHURA VENTURES CORE PROTOCOL "
              baseColor="#00e5ff"
              background="#010612"
              speed={60}
              scale={125}
              wave={50}
              dragSensitivity={100}
              style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}
            />
          </div>

          {/* ── 3. RIGHT: Form (4 Cols) — High Visibility, Ample Separation ── */}
          <div className="lg:col-span-4 flex flex-col justify-center order-3 w-full">
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <div className="mb-3">
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-white tracking-tight mb-0.5">
                      Send a Message
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Direct transmission to Harman Saini · Response within 24 hours.
                    </p>
                  </div>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2.5"
                    suppressHydrationWarning
                  >
                    {/* Full Name */}
                    <div>
                      <label className="text-[11px] font-semibold text-white mb-1 block">
                        Your Name *
                      </label>
                      <input
                        suppressHydrationWarning
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Harman Saini"
                        className="w-full bg-[#060c18] border border-white/20 hover:border-white/40 focus:border-[#00e5ff] focus:bg-[#0a1222] text-white text-xs sm:text-sm rounded-lg px-3.5 py-2 placeholder:text-gray-500 outline-none transition-all"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="text-[11px] font-semibold text-white mb-1 block">
                        Email Address *
                      </label>
                      <input
                        suppressHydrationWarning
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="zathuraventures@gmail.com"
                        className="w-full bg-[#060c18] border border-white/20 hover:border-white/40 focus:border-[#00e5ff] focus:bg-[#0a1222] text-white text-xs sm:text-sm rounded-lg px-3.5 py-2 placeholder:text-gray-500 outline-none transition-all"
                      />
                    </div>

                    {/* Project Scope */}
                    <div>
                      <label className="text-[11px] font-semibold text-white mb-1 block">
                        Project Scope / Inquiries
                      </label>
                      <input
                        suppressHydrationWarning
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Full-Stack, Gen AI, Cloud..."
                        className="w-full bg-[#060c18] border border-white/20 hover:border-white/40 focus:border-[#00e5ff] focus:bg-[#0a1222] text-white text-xs sm:text-sm rounded-lg px-3.5 py-2 placeholder:text-gray-500 outline-none transition-all"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-[11px] font-semibold text-white mb-1 block">
                        Message *
                      </label>
                      <textarea
                        suppressHydrationWarning
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={2}
                        placeholder="Tell me about your project, timeline, and requirements..."
                        className="w-full bg-[#060c18] border border-white/20 hover:border-white/40 focus:border-[#00e5ff] focus:bg-[#0a1222] text-white text-xs sm:text-sm rounded-lg px-3.5 py-2 placeholder:text-gray-500 outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Error Banner */}
                    {error && (
                      <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2 text-red-300 text-[11px] leading-tight">
                        <AlertCircle size={14} className="shrink-0 text-red-400 mt-0.5" />
                        <div>
                          <span>{error}</span>{" "}
                          <a
                            href={`mailto:zathuraventures@gmail.com?subject=${encodeURIComponent(subject || "Inquiry")}&body=${encodeURIComponent(message)}`}
                            className="underline text-white font-medium hover:text-[#00e5ff]"
                          >
                            Click to send via email client
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      suppressHydrationWarning
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 rounded-lg font-bold text-xs sm:text-sm bg-white hover:bg-neutral-200 disabled:bg-neutral-400 disabled:cursor-not-allowed text-black flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all mt-1"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={14} className="animate-spin text-black" />
                          <span>Transmitting to Harman Saini...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center flex flex-col items-center justify-center py-8"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2.5">
                    <Check size={20} />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white mb-1">Message Sent</h3>
                  <p className="text-gray-300 text-xs max-w-xs mb-3 leading-relaxed">
                    Thank you. Your message has been sent directly to Harman Saini at <strong className="text-white">zathuraventures@gmail.com</strong>.
                  </p>
                  <button
                    suppressHydrationWarning
                    onClick={reset}
                    className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
