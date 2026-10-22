"use client";

import { motion } from "framer-motion";

export default function FreelancerIdentity() {
    return (
        // Changed bg-[#020202] to bg-transparent to let the global stars shine through
        <section className="py-24 bg-transparent overflow-hidden border-t border-white/5 relative z-10">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16 relative z-10">
                <h3 className="font-mono text-xs text-[#00e5ff] uppercase tracking-[0.4em] mb-6 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
                    [ The Independent Powerhouse ]
                </h3>
                <p className="text-2xl md:text-4xl font-light text-white/90 max-w-4xl leading-tight">
                    Beyond the agency, I operate as an elite independent developer, architecting high-performance MERN applications, automated trading systems, and corporate-grade digital infrastructure.
                </p>
            </div>

            {/* Infinite High-Speed Marquee with Frosted Glass Track */}
            <div className="relative w-full flex whitespace-nowrap overflow-hidden bg-white/[0.02] backdrop-blur-md border-y border-white/10 py-8 -skew-y-2 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <motion.div
                    className="flex gap-12 items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ ease: "linear", duration: 15, repeat: Infinity }}
                >
                    {Array(4).fill(0).map((_, i) => (
                        <div key={i} className="flex gap-12 items-center text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#666] tracking-tighter uppercase">
                            <span className="drop-shadow-2xl">Freelance Architect</span>
                            <span className="text-[#d4af37] text-4xl drop-shadow-[0_0_15px_#d4af37]">✦</span>
                            <span className="drop-shadow-2xl">Full-Stack Engineer</span>
                            <span className="text-[#d4af37] text-4xl drop-shadow-[0_0_15px_#d4af37]">✦</span>
                            <span className="drop-shadow-2xl">UI/UX Innovator</span>
                            <span className="text-[#d4af37] text-4xl drop-shadow-[0_0_15px_#d4af37]">✦</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}