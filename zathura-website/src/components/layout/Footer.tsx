"use client";

import { Mail, Phone } from "lucide-react";

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-transparent border-t border-white/5 relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-6 lg:gap-8">
          
          {/* Left: Brand */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#0088ff] flex items-center justify-center font-sans font-black text-black text-sm">
              ZV
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-white text-lg tracking-tight uppercase">Zathura Ventures</span>
              <span className="font-mono text-[9px] text-[#00e5ff] uppercase tracking-[0.2em]">Engineering Reality</span>
            </div>
          </div>

          {/* Center: Navigation */}
          <nav className="flex items-center gap-8 lg:gap-12">
            {[
              { label: "home", id: "unified-core" },
              { label: "services", id: "services" },
              { label: "team", id: "team" },
              { label: "contact", id: "contact" }
            ].map((nav) => (
              <a 
                key={nav.label}
                href={`/#${nav.id}`}
                className="font-mono text-xs text-white/50 hover:text-[#00e5ff] uppercase tracking-widest transition-colors"
              >
                {nav.label}
              </a>
            ))}
          </nav>

          {/* Right: Contact & Copyright */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a href="mailto:hello@zathuraventures.com" className="text-white/40 hover:text-[#00e5ff] transition-colors">
              <Mail size={18} />
            </a>
            <a href="tel:+1234567890" className="text-white/40 hover:text-[#00e5ff] transition-colors">
              <Phone size={18} />
            </a>
            <div className="hidden md:block w-[1px] h-4 bg-white/10" />
            <div className="flex flex-wrap justify-center items-center gap-3 font-mono text-[10px] text-white/30 uppercase tracking-widest text-center">
              <span>© {new Date().getFullYear()} Zathura. All rights reserved.</span>
              <a href="/privacy-policy" className="hover:text-[#00e5ff] transition-colors">Privacy Policy</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
