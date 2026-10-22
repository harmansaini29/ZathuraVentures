"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Search,
  Headphones,
  Smartphone,
  ArrowRight,
  Check,
  Mail,
  Zap,
  Clock,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

const VALUE_PERKS = [
  {
    icon: Server,
    title: "1 Year Free Cloud Hosting",
    desc: "Fast NVMe cloud servers, global CDN edge caching, and 99.9% uptime guarantee included with your project.",
    color: "#00e5ff",
  },
  {
    icon: Search,
    title: "Full Technical & Core SEO",
    desc: "Complete on-page SEO, structured Schema markup, Google Search Console setup, and 95+ Lighthouse speed score.",
    color: "#d4af37",
  },
  {
    icon: Headphones,
    title: "24/7 Priority Support",
    desc: "Dedicated technical assistance, regular software updates, and rapid bug resolution whenever you need it.",
    color: "#0088ff",
  },
  {
    icon: Smartphone,
    title: "Bespoke Responsive UI/UX",
    desc: "Modern, high-converting interfaces crafted specifically for your brand — fluid across mobile, tablet, and desktop.",
    color: "#10b981",
  },
];

export default function ElevateContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "High-Performance Website Development",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full py-24 lg:py-32 bg-[#02050c] overflow-hidden select-none z-10">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
            <Zap size={12} className="text-[#00e5ff]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00e5ff] font-semibold">
              Connect & Elevate
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-tight mb-4">
            Elevate Your Business <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00e5ff] to-[#d4af37]">
              To The Next Level.
            </span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
            Ready to upgrade your digital presence, increase conversions, and command industry authority?
            Connect with us to build custom high-performance websites, mobile apps, and scalable software.
          </p>
        </motion.div>

        {/* Perks Grid: Clean, Elegant, Professional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14"
        >
          {VALUE_PERKS.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="bg-[#050a16]/75 backdrop-blur-xl border border-white/10 hover:border-white/25 rounded-2xl p-6 transition-all duration-300 hover:bg-[#070e20] shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-black/50 border border-white/10 mb-4 group-hover:scale-105 transition-transform"
                    style={{ color: perk.color }}
                  >
                    <Icon size={18} />
                  </div>

                  <h3 className="text-white text-base font-bold tracking-tight mb-2">
                    {perk.title}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-[13px] font-light leading-relaxed">
                    {perk.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-gray-500">
                  <Check size={12} className="text-[#00e5ff]" />
                  <span>100% Included With Build</span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Contact Form & Connection Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Uplink Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 bg-[#050a16]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="font-mono text-xs text-[#00e5ff] tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
                Direct Communication Channel
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                Let&apos;s Build Something Extraordinary.
              </h3>

              <p className="text-gray-300 text-sm font-light leading-relaxed mb-6">
                Whether you need a modern web application, cross-platform mobile solution, or custom enterprise software — our team is ready to deliver.
              </p>

              <div className="space-y-3 font-mono text-xs text-gray-300">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <Clock size={15} className="text-[#00e5ff]" />
                  <span>Guaranteed response within 12–24 hours</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <Mail size={15} className="text-[#d4af37]" />
                  <a href="mailto:zathuraventures@gmail.com" className="hover:text-white transition-colors">
                    zathuraventures@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block mb-0.5">
                  Lead Architect
                </span>
                <span className="text-white font-bold text-sm">Harman Saini</span>
              </div>
              <a
                href="https://harmansaini29.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00e5ff] hover:underline"
              >
                <span>harmansaini29.vercel.app</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 bg-[#050a16]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-xl"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Initiate Project Inquiry
                    </h3>
                    <p className="text-gray-400 text-xs font-light mt-1">
                      Share your goals below and we will prepare a custom proposal and architecture roadmap.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[11px] text-gray-400 uppercase tracking-wider block mb-1.5">
                        Your Name / Enterprise *
                      </label>
                      <input
                        suppressHydrationWarning
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe / Company"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-light focus:outline-none focus:border-[#00e5ff] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[11px] text-gray-400 uppercase tracking-wider block mb-1.5">
                        Work Email Address *
                      </label>
                      <input
                        suppressHydrationWarning
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-light focus:outline-none focus:border-[#00e5ff] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[11px] text-gray-400 uppercase tracking-wider block mb-1.5">
                      Required Service / Solution
                    </label>
                    <select
                      suppressHydrationWarning
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#03060f] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-light focus:outline-none focus:border-[#00e5ff] transition-colors"
                    >
                      <option value="High-Performance Website Development">High-Performance Website (Includes 1 Yr Hosting & SEO)</option>
                      <option value="Mobile App Development">iOS & Android Mobile App</option>
                      <option value="Full-Stack Custom Software">Enterprise Custom Software / SaaS Platform</option>
                      <option value="AI Integration & Automation">AI Systems & Intelligent Automation</option>
                      <option value="Brand Elevation">Complete Brand & Digital Elevation Package</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-[11px] text-gray-400 uppercase tracking-wider block mb-1.5">
                      Project Scope & Goals
                    </label>
                    <textarea
                      suppressHydrationWarning
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about what you want to build, key goals, target timeline, and any specific preferences..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-light focus:outline-none focus:border-[#00e5ff] transition-colors resize-none"
                    />
                  </div>

                  <button
                    suppressHydrationWarning
                    type="submit"
                    className="w-full py-4 px-6 bg-white text-black font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-xl flex items-center justify-between hover:bg-[#00e5ff] hover:text-white transition-all duration-300 shadow-md cursor-pointer mt-1"
                  >
                    <span>Connect & Elevate My Business</span>
                    <ArrowRight size={15} />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-center font-mono text-[10px] text-gray-500 pt-1">
                    <span>✓ Free Hosting Included</span>
                    <span>•</span>
                    <span>✓ SEO Guaranteed</span>
                    <span>•</span>
                    <span>✓ 24/7 Support</span>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 flex flex-col items-center justify-center min-h-[340px]"
                >
                  <div className="w-16 h-16 border border-[#00e5ff]/50 bg-[#00e5ff]/10 rounded-full flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(0,229,255,0.3)]">
                    <Check className="text-[#00e5ff]" size={28} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    Project Request Transmitted.
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm font-light max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <span className="text-white font-medium">{formData.name}</span>! We have received your parameters. Our team and lead architect Harman Saini will review and respond with a detailed roadmap within 12–24 hours.
                  </p>

                  <button
                    suppressHydrationWarning
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", service: "High-Performance Website Development", message: "" });
                    }}
                    className="font-mono text-xs text-[#00e5ff] uppercase tracking-widest hover:text-white transition-colors border-b border-[#00e5ff]/40 hover:border-white pb-0.5 cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
