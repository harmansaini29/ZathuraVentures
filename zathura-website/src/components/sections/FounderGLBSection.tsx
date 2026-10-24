"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Shield, ArrowRight, ExternalLink, Cpu, Terminal, Sparkles } from "lucide-react";

/* ─── 3D Model Renderer for founder.glb ───────────────────────────────────── */
function FounderAvatarModel() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/founder.glb");
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]]?.reset().fadeIn(0.5).play();
    }
  }, [actions, names]);

  // Subtle continuous gentle breathing & rotation
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <group ref={group} dispose={null}>
      {/* Refined Proportional Sizing: Perfectly centered & borderless */}
      <primitive 
        object={scene} 
        position={[0, -0.75, 0]} 
        scale={0.72} 
      />

      {/* Subtle soft ambient foot glow (NO harsh rings or borders) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.80, 0]}>
        <circleGeometry args={[0.55, 32]} />
        <meshBasicMaterial 
          color="#00e5ff" 
          transparent 
          opacity={0.08} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>
    </group>
  );
}

/* Pre-load GLTF */
useGLTF.preload("/models/founder.glb");

/* ─── Main Founder GLB Section (Seamless Continuation & Final Laser Terminus) ─── */
export default function FounderGLBSection() {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <section
      id="founder-model"
      className="relative w-full min-h-screen py-16 md:py-24 bg-[#010612] overflow-hidden select-none flex flex-col items-center justify-center"
    >
      {/* ── Keyframes for loop & beam flow ── */}
      <style>{`
        @keyframes beam-flow-down {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes energy-rise {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          20% { opacity: 0.85; }
          80% { opacity: 0.85; }
          100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
        }
      `}</style>

      {/* ── Ascending Quantum Energy Loop (Circulating back up toward Section 2) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#00e5ff]"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              left: `${10 + ((i * 19) % 80)}%`,
              bottom: "-20px",
              boxShadow: "0 0 12px #00e5ff",
              opacity: 0.55,
              animation: `energy-rise ${5.5 + (i % 4)}s linear infinite ${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* ── 1. The Continuous Downward Laser Stream from Section 2 Entering Pod Terminus in Exact Center ── */}
      <div className="relative w-16 h-28 flex flex-col items-center justify-center overflow-hidden pointer-events-none z-20">
        {/* Core Laser Needle matching Sections 1 & 2 */}
        <div
          className="w-[7px] h-full bg-white"
          style={{
            boxShadow: "0 0 16px #ffffff, 0 0 35px #00e5ff, 0 0 70px #0077ff, 0 0 100px rgba(0, 229, 255, 0.8)",
          }}
        />
        {/* Volumetric Plasma Glow Tube */}
        <div className="absolute inset-0 w-20 -left-2 bg-gradient-to-b from-[#00e5ff]/50 via-[#0077ff]/30 to-transparent blur-md" />
        {/* Rapid Downward Surges */}
        <div
          className="absolute w-[8px] h-20 bg-white shadow-[0_0_25px_#ffffff]"
          style={{ animation: "beam-flow-down 0.85s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
        />
        <div
          className="absolute w-[7px] h-14 bg-[#00e5ff] shadow-[0_0_20px_#00e5ff]"
          style={{ animation: "beam-flow-down 1.25s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.35s" }}
        />
      </div>

      {/* Beam Entry Strike Collar directly in the Center */}
      <div className="flex flex-col items-center pointer-events-none -mt-3 z-30">
        <div className="w-24 h-6 rounded-full border border-[#00e5ff] shadow-[0_0_25px_#00e5ff] animate-ping opacity-70" />
        <div className="w-20 h-4 -mt-5 rounded-full bg-gradient-to-r from-[#0077ff] via-white to-[#0077ff] border-2 border-[#00e5ff] shadow-[0_0_35px_#00e5ff,0_0_60px_#0077ff] flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#ffffff,0_0_40px_#00e5ff] animate-pulse" />
        </div>
      </div>

      {/* Ambient Blueish Lightning Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] bg-[radial-gradient(circle,rgba(0,229,255,0.08)_0%,rgba(0,119,255,0.03)_50%,transparent_70%)] pointer-events-none" />

      {/* ── 2. Integrated Layout: Clean Left-Side About Me (NO BOXES/BORDERS) + Centered 3D GLB in Middle ── */}
      <div className="relative z-10 w-full max-w-[1440px] px-6 sm:px-10 lg:px-14 mt-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[540px]">
          
          {/* ── Left Side: Harman Saini Typography & Bio (Clean text, NO boxes, NO borders) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[420px] xl:w-[460px] flex flex-col space-y-5 text-left z-30 shrink-0"
          >
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] font-mono text-[10px] uppercase tracking-[0.25em] font-semibold w-fit shadow-[0_0_15px_rgba(0,229,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
              <span>Software & Gen AI Engineer</span>
            </div>

            {/* Name */}
            <div>
              <h2 className="font-sans font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
                Harman <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a5f3fc] to-[#00e5ff]">Saini</span>
              </h2>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#00e5ff] font-semibold mt-2.5">
                AI Full-Stack Engineer · Founder @ GrowSphere
              </p>
            </div>

            {/* Authentic Resume Bio */}
            <p className="text-[#8eaec9] text-sm sm:text-base font-light leading-relaxed">
              Software Engineer and Gen AI Engineer building scalable full-stack apps, websites, and self-healing, self-learning AI systems with Java, Python, TypeScript & cloud.
            </p>

            <p className="text-[#8eaec9]/80 text-xs sm:text-sm font-light leading-relaxed">
              Founder of <strong className="text-white font-medium">GrowSphere</strong> (1,600+ member developer community across Mumbai), leading technical workshops & ecosystem collaborations with NEAR AI, Devcon, and Apache Kafka. AWS on Campus Leader & Google Student Ambassador.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00e5ff] text-[#001221] font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] cursor-pointer group"
              >
                <span>Selected Works</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://www.linkedin.com/in/harman-saini-d29"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] text-white border border-white/15 font-sans text-xs font-medium uppercase tracking-wider hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all cursor-pointer"
              >
                <span>LinkedIn</span>
                <ExternalLink size={12} />
              </a>

              <a
                href="https://github.com/harmansaini29"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] text-white border border-white/15 font-sans text-xs font-medium uppercase tracking-wider hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all cursor-pointer"
              >
                <span>GitHub</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>

          {/* ── EXACT MIDDLE: 3D GLB Model Canvas (Centered in Screen, Borderless, Clean) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full max-w-[520px] h-[480px] sm:h-[520px] flex flex-col items-center justify-center relative z-20 mx-auto"
          >
            <div className="relative w-full h-full border-none outline-none bg-transparent">
              <Canvas
                camera={{ position: [0, 0.15, 2.6], fov: 32 }}
                gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
                style={{ width: "100%", height: "100%", background: "transparent", border: "none" }}
                onPointerDown={() => setIsInteracting(true)}
                onPointerUp={() => setIsInteracting(false)}
              >
                {/* Scene Lighting tuned for electric blue silhouette */}
                <ambientLight color="#0d284f" intensity={1.6} />
                <directionalLight position={[2.5, 3.5, 3]} intensity={3.0} color="#00e5ff" />
                <directionalLight position={[-2.5, 2, 2.5]} intensity={1.2} color="#ffffff" />
                <directionalLight position={[0, 3, -3]} intensity={4.5} color="#0077ff" />

                <Suspense fallback={null}>
                  <FounderAvatarModel />
                </Suspense>

                {/* Orbit Controls (Zoom disabled to preserve perfect framing) */}
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  maxPolarAngle={Math.PI / 2 + 0.15}
                  minPolarAngle={Math.PI / 3}
                  rotateSpeed={0.8}
                />
              </Canvas>

              {/* Minimal Interaction Hint */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none whitespace-nowrap">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#00e5ff]/70">
                  {isInteracting ? "Exploring Persona" : "Drag to Rotate 360°"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Right Side Balancing Column (Equal width to left side to keep GLB in absolute center) ── */}
          <div className="hidden lg:block w-[420px] xl:w-[460px] pointer-events-none" />

        </div>
      </div>

      {/* Laser beam terminates inside the pod above. Zero beam below Section 3 as requested. */}
    </section>
  );
}
