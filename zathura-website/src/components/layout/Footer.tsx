"use client";

import { Mail, Phone, MapPin, Code2, ArrowUp, Activity } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46V10.9M7.84 6.2a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#010612] relative z-10 pt-20 sm:pt-24 pb-28 sm:pb-36 mt-20 sm:mt-28 md:mt-36">
      {/* Top Luminous Glowing Rule Divider */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00e5ff]/30 to-transparent pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 sm:px-8 relative z-10">

        {/* Top Status Bar: Advanced Institutional Telemetry */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-12 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold">
              Institutional Core Active · 99.98% SLA Availability
            </span>
          </div>

          <div className="flex items-center gap-5 font-mono text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <Activity size={12} className="text-[#00e5ff]" />
              <span>Low-Latency Relay Node</span>
            </span>
            <span className="text-[#00e5ff] font-semibold">ZATHURA v2.6 PROD</span>
          </div>
        </div>

        {/* 4-Column Professional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">

          {/* Column 1: Brand Architecture */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#0088ff] flex items-center justify-center font-sans font-black text-black text-xs shadow-[0_0_20px_rgba(0,229,255,0.35)]">
                ZV
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-white text-lg tracking-tight uppercase">Zathura</span>
                <span className="font-mono text-[9px] text-[#00e5ff] uppercase tracking-[0.25em] font-semibold">Ventures</span>
              </div>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              Architecting scalable full-stack applications, autonomous AI engines, and institutional spatial platforms with zero-loss reliability.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://www.linkedin.com/in/harman-saini-d29"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-[#061226] border border-white/10 flex items-center justify-center text-[#8eaec9] hover:text-[#00e5ff] hover:border-[#00e5ff]/60 hover:bg-[#00e5ff]/15 transition-all shadow-md"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/harmansaini29"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-full bg-[#061226] border border-white/10 flex items-center justify-center text-[#8eaec9] hover:text-[#00e5ff] hover:border-[#00e5ff]/60 hover:bg-[#00e5ff]/15 transition-all shadow-md"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:zathuraventures@gmail.com"
                aria-label="Email"
                className="w-8 h-8 rounded-full bg-[#061226] border border-white/10 flex items-center justify-center text-[#8eaec9] hover:text-[#00e5ff] hover:border-[#00e5ff]/60 hover:bg-[#00e5ff]/15 transition-all shadow-md"
              >
                <Mail size={13} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-3.5 lg:pl-4">
            <h3 className="font-sans text-sm sm:text-base text-white font-semibold">Navigation</h3>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Home", id: "unified-core" },
                { label: "Craft Core", id: "spiral-core" },
                { label: "Founder & Architect", id: "founder-model" },
                { label: "Production Metrics", id: "metrics" },
                { label: "Ecosystem Partners", id: "clients" },
                { label: "Selected Projects", id: "projects" },
                { label: "Direct Uplink", id: "contact" },
                { label: "Privacy Policy", id: "privacy-policy", path: "/privacy-policy" }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.path || `/#${link.id}`}
                  className="text-xs sm:text-sm text-gray-300 hover:text-[#00e5ff] transition-colors flex items-center gap-1.5 group w-fit"
                >
                  <span className="text-[#00e5ff] opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-xs">→</span>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact & Direct Inquiries */}
          <div className="flex flex-col gap-3.5">
            <h3 className="font-sans text-sm sm:text-base text-white font-semibold">Direct Communication</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#00e5ff] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Mumbai & Maharashtra, India<br />Global Remote Engineering
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#00e5ff] shrink-0" />
                <a
                  href="tel:+917666222422"
                  className="text-xs sm:text-sm text-gray-300 hover:text-[#00e5ff] transition-colors font-mono"
                >
                  +91 76662 22422
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#00e5ff] shrink-0" />
                <a
                  href="mailto:zathuraventures@gmail.com"
                  className="text-xs sm:text-sm text-gray-300 hover:text-[#00e5ff] transition-colors font-mono"
                >
                  zathuraventures@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Leadership & Community */}
          <div className="flex flex-col gap-3.5">

            <div className="flex flex-col gap-2 mt-0.5">
              <br />
              <a
                href="https://www.linkedin.com/in/harman-saini-d29"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 hover:text-[#00e5ff] transition-colors group"
              >
                <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[9px] font-bold uppercase group-hover:border-[#00e5ff]/40 group-hover:bg-[#00e5ff]/10 transition-all">in</span>
                LinkedIn Profile
              </a>
              <a
                href="https://github.com/harmansaini29"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 hover:text-[#00e5ff] transition-colors group"
              >
                <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[9px] font-bold uppercase group-hover:border-[#00e5ff]/40 group-hover:bg-[#00e5ff]/10 transition-all">gh</span>
                GitHub Repositories
              </a>
              <a
                href="mailto:zathuraventures@gmail.com"
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 hover:text-[#00e5ff] transition-colors group"
              >
                <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[9px] font-bold uppercase group-hover:border-[#00e5ff]/40 group-hover:bg-[#00e5ff]/10 transition-all">@</span>
                Direct Email Dispatch
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Harman Saini OG Data, Verification, & Scroll to Top */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#00e5ff]">
              <Code2 size={15} />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-xs sm:text-sm text-white font-medium">Harman Saini</span>
              <span className="text-[11px] text-gray-400">Principal Systems Architect · Zathura Ventures</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="mailto:zathuraventures@gmail.com"
              className="text-xs text-gray-300 hover:text-[#00e5ff] transition-colors flex items-center gap-1.5 font-mono"
            >
              <Mail size={12} className="text-[#00e5ff]" /> zathuraventures@gmail.com
            </a>
            <button
              suppressHydrationWarning
              onClick={scrollToTop}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00e5ff]/40 text-xs text-gray-300 hover:text-[#00e5ff] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={11} />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center" suppressHydrationWarning>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest" suppressHydrationWarning>
            © {new Date().getFullYear()} Zathura Ventures. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
