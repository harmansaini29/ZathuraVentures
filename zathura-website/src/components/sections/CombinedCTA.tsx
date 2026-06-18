"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Send, Cpu, Network, ShieldCheck } from "lucide-react";

export default function CombinedCTA() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail("");
    }, 4000);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-transparent flex flex-col items-center justify-center py-24 overflow-hidden border-t border-[#00e5ff]/10">
      
      {/* Background Decorators */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,229,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/5 backdrop-blur-md mb-6">
            <Cpu size={14} className="text-[#00e5ff]" />
            <span className="font-mono text-xs text-[#00e5ff] tracking-[0.2em] uppercase">System Uplink</span>
          </div>
          <h2 className="font-sans font-black text-5xl md:text-7xl text-white tracking-tighter uppercase mb-4">
            Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0088ff]">Protocol</span>
          </h2>
          <p className="font-sans text-lg text-white/50 font-light max-w-2xl mx-auto">
            Ready to integrate with Zathura Ventures? Open a secure channel below to begin architecting your multi-billion dollar digital infrastructure.
          </p>
        </div>

        {/* Console Terminal UI */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-[#01060e] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,136,255,0.1)] overflow-hidden relative backdrop-blur-xl"
        >
          {/* Terminal Header */}
          <div className="w-full h-12 bg-white/5 border-b border-white/10 flex items-center justify-between px-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase flex items-center gap-2">
              <ShieldCheck size={12} className="text-[#00e5ff]" />
              Secure Channel: ZV-CORE-9
            </div>
          </div>

          <div className="p-8 md:p-12 relative">
            {/* Terminal Output Text */}
            <div className="font-mono text-sm text-[#00e5ff] mb-8 space-y-2 opacity-80">
              <p>{'>'} SYSTEM_READY: Awaiting client configuration...</p>
              <p>{'>'} ESTABLISHING_HANDSHAKE: [OK]</p>
              <p className="text-white/50">{'>'} Enter your secure comms address to proceed.</p>
            </div>

            {/* Interactive Form */}
            <form onSubmit={handleSubmit} className="relative mt-8">
              <div className={`relative flex items-center border-b-2 transition-colors duration-300 ${focused ? 'border-[#00e5ff]' : 'border-white/20'}`}>
                <Terminal size={20} className={`absolute left-0 transition-colors duration-300 ${focused ? 'text-[#00e5ff]' : 'text-white/40'}`} />
                <input
                  type="email"
                  required
                  placeholder="name@enterprise.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="w-full bg-transparent border-none outline-none text-white font-mono text-lg md:text-xl py-4 pl-10 pr-16 placeholder:text-white/20 placeholder:font-sans"
                />
                
                <button 
                  type="submit"
                  disabled={sent}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-300 ${
                    sent ? 'bg-green-500/20 text-green-400' : 'bg-[#00e5ff]/10 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black'
                  }`}
                >
                  {sent ? <ShieldCheck size={20} /> : <Send size={20} />}
                </button>
              </div>

              {/* Status Message */}
              {sent && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-0 font-mono text-xs text-green-400 uppercase tracking-widest"
                >
                  {'>'} SIGNAL TRANSMITTED. We will contact you shortly.
                </motion.p>
              )}
            </form>

            <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Uptime", val: "99.999%" },
                { label: "Latency", val: "0.2ms" },
                { label: "Bandwidth", val: "Unlimited" },
                { label: "Encryption", val: "Quantum" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">{stat.label}</span>
                  <span className="font-mono text-sm text-[#00e5ff] font-bold">{stat.val}</span>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
