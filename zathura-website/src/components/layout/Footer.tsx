"use client";

import { Mail, Phone, MapPin, Code2, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#020a14] border-t border-white/5 relative z-10 pt-20 pb-8 mt-24">
      {/* Background Decorator */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,229,255,0.03)_0%,_transparent_50%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#0088ff] flex items-center justify-center font-sans font-black text-black text-sm">
                ZV
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-white text-xl tracking-tight uppercase">Zathura</span>
                <span className="font-mono text-[9px] text-[#00e5ff] uppercase tracking-[0.2em]">Ventures</span>
              </div>
            </div>
            <p className="text-white/50 text-sm font-light leading-relaxed pr-4">
              Architecting your multi-billion dollar digital infrastructure. Building the future of enterprise reality, one secure protocol at a time.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: "in", href: "#" },
                { label: "tw", href: "#" },
                { label: "ig", href: "#" },
                { label: "yt", href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#00e5ff] hover:border-[#00e5ff]/30 hover:bg-[#00e5ff]/10 transition-all font-mono text-[10px] font-bold uppercase tracking-widest"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6 lg:pl-8">
            <h3 className="font-sans text-lg text-white font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-4">
              {[
                { label: "Home", id: "unified-core" },
                { label: "Services", id: "services" },
                { label: "About Us", id: "team" },
                { label: "Portfolio", id: "projects" },
                { label: "Privacy Policy", id: "privacy-policy", path: "/privacy-policy" }
              ].map((link) => (
                <a 
                  key={link.label} 
                  href={link.path || `/#${link.id}`}
                  className="text-sm text-white/60 hover:text-[#00e5ff] transition-colors flex items-center gap-2 group w-fit"
                >
                  <span className="text-[#00e5ff] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300">→</span>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact Us */}
          <div className="flex flex-col gap-6">
            <h3 className="font-sans text-lg text-white font-semibold">System Uplink</h3>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-white/40 shrink-0 mt-0.5" />
                <span className="text-sm text-white/60 leading-relaxed">
                  Silicon Valley Central Node<br/>California, USA
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-white/40 shrink-0" />
                <a href="#" className="text-sm text-white/60 hover:text-[#00e5ff] transition-colors">--</a>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-white/40 shrink-0" />
                <a href="#" className="text-sm text-white/60 hover:text-[#00e5ff] transition-colors">hello@zathuraventures.com</a>
              </div>
            </div>
          </div>

          {/* Column 4: Follow Us */}
          <div className="flex flex-col gap-6">
            <h3 className="font-sans text-lg text-white font-semibold">Follow Us</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Stay connected with the team. We share updates, insights, and behind-the-scenes content.
            </p>
            <div className="flex flex-col gap-3 mt-2">
              {[
                { label: "LinkedIn", href: "#", icon: "in" },
                { label: "Twitter / X", href: "#", icon: "tw" },
                { label: "Instagram", href: "#", icon: "ig" },
                { label: "YouTube", href: "#", icon: "yt" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-[#00e5ff] transition-colors group"
                >
                  <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[10px] font-bold uppercase group-hover:border-[#00e5ff]/30 group-hover:bg-[#00e5ff]/10 transition-all">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00e5ff]">
              <Code2 size={18} />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-sm text-white font-medium">Developer Contact</span>
              <span className="text-xs text-white/50">Harman Saini</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <a href="#" className="text-xs text-white/60 hover:text-[#00e5ff] transition-colors flex items-center gap-2">
              <Mail size={14} /> --
            </a>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-white/60 hover:text-[#00e5ff] transition-colors flex items-center gap-2">
                <Globe size={14} /> LinkedIn
              </a>
              <a href="#" className="text-xs text-white/60 hover:text-[#00e5ff] transition-colors flex items-center gap-2">
                <Code2 size={14} /> GitHub
              </a>
            </div>
          </div>

        </div>
        
        {/* Copyright */}
        <div className="mt-8 text-center">
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
            © 2025 Zathura Ventures. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
