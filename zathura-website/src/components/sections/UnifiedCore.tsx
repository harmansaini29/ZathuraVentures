"use client";

import { useRef, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { HeroGlobeScene } from "./HeroGlobe";

// Dynamically import client-side WebGL Light Cables shader
const LightCables = dynamic(() => import("@/components/ui/LightCables"), {
  ssr: false,
});

/* ─────────────────────────────────────────────────────────────────────────────
   Ascending Tech Stacks: Form from below, move up along the Light Cables,
   and vanish into the disk above.
───────────────────────────────────────────────────────────────────────────── */
const TECH_STACKS = [
  "Next.js 16",
  "React 19",
  "WebGL / 3D",
  "TypeScript",
  "Python / AI",
  "Solidity",
  "FastAPI",
  "AWS Cloud",
  "Supabase",
  "Docker",
  "Zero-Knowledge",
  "Tailwind CSS",
];

function AscendingTechBadges() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <style>{`
        @keyframes tech-rise {
          0% {
            transform: translateY(85vh) scale(0.65);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: translateY(68vh) scale(1);
          }
          85% {
            opacity: 1;
            transform: translateY(12vh) scale(1);
          }
          100% {
            transform: translateY(-2vh) scale(0.4);
            opacity: 0;
          }
        }
      `}</style>
      {TECH_STACKS.map((name, i) => {
        const isLeft = i % 2 === 0;
        const duration = 7.2 + (i % 4) * 0.7;
        const delay = i * 0.58;
        // Flank the central light cables stream symmetrically
        const horizontalPos = isLeft
          ? `${14 + ((i * 9) % 22)}%`
          : `${64 + ((i * 9) % 22)}%`;

        return (
          <div
            key={name}
            className="absolute top-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#020816]/92 border border-[#00e5ff]/40 shadow-[0_0_22px_rgba(0,229,255,0.3)] backdrop-blur-md whitespace-nowrap select-none"
            style={{
              left: horizontalPos,
              animation: `tech-rise ${duration}s cubic-bezier(0.25, 1, 0.5, 1) infinite ${delay}s`,
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] text-white tracking-wider font-semibold uppercase">
              {name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main UnifiedCore Export: Hero Globe + Light Cables Beam Till Circular Section
───────────────────────────────────────────────────────────────────────────── */
export default function UnifiedCore() {
  const [isExploded, setIsExploded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    if (isExploded) {
      setIsExploded(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    setIsExploded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsExploded(false), 4000);
  };

  return (
    <section id="unified-core" className="relative w-full bg-[#010612] overflow-hidden">
      {/* Anchor for #home navigation */}
      <div id="home" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />

      {/* ── 1. Hero Globe Section (Full Screen 3D Interactive Canvas) ── */}
      <div className="relative w-full h-[520px] sm:h-[580px] overflow-hidden">
        {/* ZV monogram spin keyframes */}
        <style>{`
          @keyframes zv-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes zv-spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        `}</style>

        <Canvas
          gl={{ antialias: false, powerPreference: "high-performance" }}
          dpr={[1, 1.2]}
          camera={{ position: [0, 0.8, 16.5], fov: 44 }}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <color attach="background" args={["#010612"]} />
          <ambientLight intensity={0.6} />

          <Suspense fallback={null}>
            <HeroGlobeScene isExploded={isExploded} handleClick={handleClick} />
          </Suspense>
        </Canvas>

        {/* Seamless bottom fade into the Light Cables beam */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#010612] via-[#010612]/50 to-transparent pointer-events-none z-10" />
      </div>

      {/* ── 2. Light Cables Beam: Attached directly below the Disk in the exact middle ── */}
      <div className="relative w-full min-h-[85vh] sm:min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#010612] -mt-24 sm:-mt-28 z-10">
        
        {/* Top Disk Receptor Pulse Node where Light Cables emerge directly below Globe */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
          <div className="w-28 h-8 rounded-full border border-[#00e5ff] shadow-[0_0_35px_#00e5ff] animate-ping opacity-75" />
          <div className="w-20 h-4 -mt-2 rounded-full bg-gradient-to-r from-[#0077ff] via-white to-[#0077ff] border border-[#00e5ff] shadow-[0_0_30px_#00e5ff] flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_20px_#ffffff,0_0_40px_#00e5ff] animate-pulse" />
          </div>
        </div>

        {/* Real-time WebGL Light Cables Canvas */}
        <div className="relative w-full h-[85vh] sm:h-[105vh] overflow-hidden flex items-center justify-center">
          <LightCables
            background="#010612"
            accentColor="#00e5ff"
            highlight="#ffffff"
            baseColor="#001833"
            speed={40}
            direction="ttb"
            positionX={0}
            positionY={0}
            style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}
          />

          {/* Ascending Tech Stacks rising upward along the Light Cables */}
          <AscendingTechBadges />
        </div>

        {/* Bottom Seam Connector meeting the Circular Section Receptor Collar */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30">
          <div className="w-24 h-6 rounded-full border border-[#00e5ff] shadow-[0_0_30px_#00e5ff] animate-pulse opacity-85" />
          <div className="w-16 h-3 -mt-1.5 rounded-full bg-gradient-to-r from-[#0077ff] via-white to-[#0077ff] shadow-[0_0_25px_#00e5ff]" />
        </div>

        {/* Soft edge blend masks */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#010612] to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#010612] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
