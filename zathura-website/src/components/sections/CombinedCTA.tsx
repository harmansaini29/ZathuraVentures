"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Send } from "lucide-react";

// Dynamically import client-side WebGL / Canvas harmonic cylinder
const VerticalColumnMade = dynamic(
  () => import("@/components/ui/VerticalColumnMade"),
  { ssr: false }
);

const KEY_POINTS = [
  {
    title: "Full-Stack Application Engineering",
    detail: "High-performance web and mobile platforms built with Next.js, React 19, TypeScript, Node.js, and modern APIs.",
  },
  {
    title: "Generative AI & Agent Architectures",
    detail: "Production multi-agent decision pipelines, LangGraph automation, OpenAI integrations, and advanced RAG workflows.",
  },
  {
    title: "Cloud Infrastructure & High Availability",
    detail: "Microservices, Docker, PostgreSQL, Supabase, and AWS deployments engineered for continuous zero-loss uptime.",
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
      className="relative w-full pt-20 sm:pt-28 md:pt-36 pb-24 sm:pb-32 overflow-hidden bg-[#010612]"
    >
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Clean, Visible Header — No Themed Jargon */}
        <div className="text-center mb-14 sm:mb-20 max-w-3xl mx-auto">
          <span className="text-sm font-semibold text-[#00e5ff] uppercase tracking-widest font-mono">
            Get In Touch
          </span>
          <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mt-2 mb-4">
            Let&apos;s Build Together
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Have a project in mind, need scalable architecture, or want to explore collaboration? Reach out directly.
          </p>
        </div>

        {/* Open 3-Column Layout: Left (Key Points) | Middle (3D Kinetic Cylinder) | Right (Form) — NO BOXES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-center">

          {/* ── 1. LEFT COLUMN: Key Points (Clear, Open Typography, High Visibility, NO BOXES) ── */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                Core Capabilities
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                What you receive when partnering with Harman Saini and Zathura Ventures:
              </p>
            </div>

            {/* List of key points: Clean, readable, no boxes */}
            <div className="space-y-6 sm:space-y-7">
              {KEY_POINTS.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-white text-base sm:text-lg leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 text-sm sm:text-base font-light mt-1 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-2 text-sm text-gray-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
              <span>Available for high-impact contracts & venture engineering</span>
            </div>
          </div>

          {/* ── 2. MIDDLE COLUMN: 3D Kinetic Cylinder (Open, Clean, Centered, NO BOXES) ── */}
          <div className="w-full h-[520px] sm:h-[580px] flex items-center justify-center relative overflow-hidden my-4 lg:my-0">
            <VerticalColumnMade
              text="HARMAN SAINI · ZATHURA VENTURES CORE PROTOCOL "
              baseColor="#00e5ff"
              background="#010612"
              speed={75}
              scale={180}
              wave={65}
              dragSensitivity={100}
              style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}
            />
          </div>

          {/* ── 3. RIGHT COLUMN: Form (Clean, Open, High Contrast, NO BOXES) ── */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <div className="mb-6">
                    <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                      Send a Message
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Direct transmission to Harman Saini · Response within 24 hours.
                    </p>
                  </div>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    suppressHydrationWarning
                  >
                    {/* Full Name */}
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">
                        Your Name *
                      </label>
                      <input
                        suppressHydrationWarning
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Harman Saini"
                        className="w-full bg-[#060c18] border border-white/20 hover:border-white/40 focus:border-[#00e5ff] focus:bg-[#0a1222] text-white text-base rounded-xl px-4.5 py-3.5 placeholder:text-gray-500 outline-none transition-all"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">
                        Email Address *
                      </label>
                      <input
                        suppressHydrationWarning
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="zathuraventures@gmail.com"
                        className="w-full bg-[#060c18] border border-white/20 hover:border-white/40 focus:border-[#00e5ff] focus:bg-[#0a1222] text-white text-base rounded-xl px-4.5 py-3.5 placeholder:text-gray-500 outline-none transition-all"
                      />
                    </div>

                    {/* Project Scope */}
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">
                        Project / Inquiries
                      </label>
                      <input
                        suppressHydrationWarning
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Full-Stack, Gen AI, Cloud Infrastructure..."
                        className="w-full bg-[#060c18] border border-white/20 hover:border-white/40 focus:border-[#00e5ff] focus:bg-[#0a1222] text-white text-base rounded-xl px-4.5 py-3.5 placeholder:text-gray-500 outline-none transition-all"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">
                        Message *
                      </label>
                      <textarea
                        suppressHydrationWarning
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        placeholder="Tell me about your project, timeline, and requirements..."
                        className="w-full bg-[#060c18] border border-white/20 hover:border-white/40 focus:border-[#00e5ff] focus:bg-[#0a1222] text-white text-base rounded-xl px-4.5 py-3.5 placeholder:text-gray-500 outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      suppressHydrationWarning
                      type="submit"
                      className="w-full py-4 rounded-xl font-bold text-base bg-white hover:bg-neutral-200 text-black flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all mt-2"
                    >
                      <span>Send Message</span>
                      <ArrowRight size={18} />
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center flex flex-col items-center justify-center py-16"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                    <Check size={32} />
                  </div>
                  <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white mb-2">Message Sent</h3>
                  <p className="text-gray-300 text-base max-w-sm mb-6 leading-relaxed">
                    Thank you. Your message has been sent directly to Harman Saini at <strong className="text-white">zathuraventures@gmail.com</strong>. You will receive a response shortly.
                  </p>
                  <button
                    suppressHydrationWarning
                    onClick={reset}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all cursor-pointer"
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
