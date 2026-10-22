"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Server,
  Search,
  Headphones,
  Smartphone,
  ArrowRight,
  Check,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
  Sparkles as SparklesIcon,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import * as THREE from "three";

/* ─── Procedural 3D Interactive Rocket Mesh ───────────────────────────────── */
function RocketModel() {
  const rocketGroup = useRef<THREE.Group>(null);
  const flameMesh = useRef<THREE.Mesh>(null);
  const flameCoreMesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (rocketGroup.current) {
      // Natural banking and tracking based on mouse pointer
      const targetRotY = state.pointer.x * 0.55;
      const targetRotZ = -state.pointer.x * 0.28;
      const targetRotX = -state.pointer.y * 0.35 + 0.12;

      rocketGroup.current.rotation.y = THREE.MathUtils.damp(
        rocketGroup.current.rotation.y,
        targetRotY,
        3.5,
        delta
      );
      rocketGroup.current.rotation.z = THREE.MathUtils.damp(
        rocketGroup.current.rotation.z,
        targetRotZ,
        3.5,
        delta
      );
      rocketGroup.current.rotation.x = THREE.MathUtils.damp(
        rocketGroup.current.rotation.x,
        targetRotX,
        3.5,
        delta
      );

      // Subtle hovering buoyancy
      rocketGroup.current.position.y = Math.sin(t * 2.2) * 0.14;
    }

    // Dynamic Thruster Flame Flicker
    if (flameMesh.current && flameCoreMesh.current) {
      const flicker = 1 + Math.sin(t * 28) * 0.18 + Math.cos(t * 42) * 0.12;
      flameMesh.current.scale.set(1, flicker, 1);
      flameCoreMesh.current.scale.set(1, flicker * 1.12, 1);
    }
  });

  return (
    <group ref={rocketGroup} position={[0, -0.2, 0]} scale={1.2}>
      {/* ─── 1. Main Fuselage Body ────────────────────────────────────────── */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.55, 0.65, 2.1, 32]} />
        <meshStandardMaterial
          color="#f8fafc"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Aerodynamic Cockpit Window Ring */}
      <mesh position={[0, 0.85, 0.49]}>
        <circleGeometry args={[0.22, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Window Metallic Trim */}
      <mesh position={[0, 0.85, 0.5]}>
        <ringGeometry args={[0.22, 0.26, 32]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ─── 2. Nose Cone ─────────────────────────────────────────────────── */}
      <mesh position={[0, 2.05, 0]}>
        <coneGeometry args={[0.55, 1.1, 32]} />
        <meshStandardMaterial
          color="#0284c7"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Nose Cone Tip Accent */}
      <mesh position={[0, 2.65, 0]}>
        <coneGeometry args={[0.15, 0.35, 32]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Fuselage Mid Accent Bands */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.56, 0.56, 0.08, 32]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.66, 0.66, 0.08, 32]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ─── 3. Stabilizer Booster Fins (4 Symmetrical Swept Wings) ───────── */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
        <group key={idx} rotation={[0, angle, 0]}>
          <mesh position={[0.72, -0.28, 0]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.62, 0.92, 0.08]} />
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
          {/* Fin Edge Glow Trim */}
          <mesh position={[0.98, -0.28, 0]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.08, 0.9, 0.09]} />
            <meshStandardMaterial color="#06b6d4" metalness={0.5} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* ─── 4. Engine Exhaust Nozzle ─────────────────────────────────────── */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.42, 0.52, 0.45, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* ─── 5. Thruster Flame & Energy Plume ─────────────────────────────── */}
      {/* Outer Cyan Fire Plume */}
      <mesh ref={flameMesh} position={[0, -1.55, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.4, 1.25, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Inner White-Hot Thruster Core */}
      <mesh ref={flameCoreMesh} position={[0, -1.38, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.22, 0.88, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Golden Accent Flare Ring */}
      <mesh position={[0, -1.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.46, 32]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.65} />
      </mesh>

      {/* Thruster Engine Point Light */}
      <pointLight position={[0, -1.3, 0]} intensity={3.5} distance={5} color="#06b6d4" />
    </group>
  );
}

function RocketCanvasScene() {
  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 7, 5]} intensity={2.6} color="#ffffff" />
      <directionalLight position={[-5, 4, -3]} intensity={1.6} color="#06b6d4" />
      <spotLight position={[0, 6, 3]} angle={0.7} intensity={2.2} color="#f8fafc" penumbra={1} />

      <Sparkles
        count={55}
        scale={7}
        size={1.4}
        speed={0.4}
        opacity={0.35}
        color="#06b6d4"
        position={[0, -0.5, 0]}
      />

      <RocketModel />
    </>
  );
}

const PERKS = [
  {
    icon: Server,
    title: "1-Year Free Cloud Hosting",
    desc: "NVMe high-speed edge cloud servers, global CDN acceleration, and 99.9% uptime included.",
    color: "#06b6d4",
  },
  {
    icon: Search,
    title: "Core SEO & Fast Loading",
    desc: "Structured schema markup, Google Search Console indexing, and 95+ Lighthouse speed scores.",
    color: "#f59e0b",
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Support",
    desc: "Direct architectural assistance, fast issue resolution, and routine platform maintenance.",
    color: "#10b981",
  },
  {
    icon: Smartphone,
    title: "Bespoke Responsive UI/UX",
    desc: "Tailored high-converting design systems engineered specifically for mobile, tablet, and desktop.",
    color: "#8b5cf6",
  },
];

export default function ConnectRocket() {
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
    <section
      id="contact"
      className="relative w-full py-24 sm:py-32 lg:py-36 bg-[#02050c] overflow-hidden select-none z-10 border-t border-white/10"
    >
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* ─── SLOGAN & 3D THREE.JS ROCKET HERO BANNER ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 bg-gradient-to-r from-neutral-900/90 via-[#071024]/90 to-neutral-900/90 border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-white to-amber-400" />

          {/* Slogan & Message (Left Column) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-5 backdrop-blur-md w-fit">
              <Rocket size={15} className="text-cyan-400" />
              <span className="font-sans text-xs uppercase tracking-widest text-cyan-300 font-bold">
                Propel Your Venture Forward
              </span>
            </div>

            {/* Slogan in Massive, High-Contrast Typography */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none uppercase mb-5">
              Build Your Systems <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-amber-300">
                To Digitalise It.
              </span>
            </h2>

            <p className="text-neutral-100 text-base sm:text-xl font-normal leading-relaxed mb-6 max-w-xl">
              Turn manual workflows and complex operations into high-speed, automated digital software. Whether launching a new venture or modernizing infrastructure, we build systems that scale effortlessly.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-neutral-200">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-emerald-400" />
                <span>Zero Technical Debt</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-emerald-400" />
                <span>Production Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-emerald-400" />
                <span>High-Speed Performance</span>
              </div>
            </div>
          </div>

          {/* 3D Three.js Rocket (Right Column) */}
          <div className="lg:col-span-5 h-[380px] sm:h-[440px] w-full rounded-2xl overflow-hidden bg-black/50 border border-white/15 relative flex items-center justify-center">
            
            <div className="absolute top-4 left-5 right-5 z-10 flex items-center justify-between text-xs font-mono text-neutral-300 pointer-events-none">
              <span className="uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                Three.js 3D Rocket
              </span>
              <span className="text-neutral-400">INTERACTIVE</span>
            </div>

            <Canvas
              camera={{ position: [0, 0.4, 4.4], fov: 42 }}
              gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
              dpr={[1, 1.5]}
            >
              <Suspense fallback={null}>
                <RocketCanvasScene />
              </Suspense>
            </Canvas>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 font-sans text-xs text-neutral-300 pointer-events-none uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full border border-white/10">
              Move cursor to steer rocket
            </div>
          </div>

        </div>

        {/* ─── VALUE PERKS GRID ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PERKS.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-900/90 backdrop-blur-xl border border-white/15 hover:border-cyan-400/40 rounded-2xl p-6 transition-all duration-300 shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-400/30 mb-4 group-hover:scale-105 transition-transform"
                    style={{ color: perk.color }}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="text-white text-base sm:text-lg font-bold tracking-tight mb-2">
                    {perk.title}
                  </h3>

                  <p className="text-neutral-200 text-xs sm:text-sm font-normal leading-relaxed">
                    {perk.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  <Check size={14} className="text-emerald-400" />
                  <span>Guaranteed Deliverable</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── CREATIVE CONNECT & CONTACT US FORM ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Direct Uplink Card */}
          <div className="lg:col-span-5 bg-neutral-900/90 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="font-sans text-xs text-cyan-300 tracking-wider uppercase mb-4 flex items-center gap-2 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                Direct Communication Channel
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
                Let&apos;s Build Something Extraordinary.
              </h3>

              <p className="text-neutral-200 text-sm sm:text-base font-normal leading-relaxed mb-6">
                Ready to digitalise your operations, scale your software, or architect a brand-new digital ecosystem? Connect with lead architect Harman Saini directly.
              </p>

              <div className="space-y-3.5 text-xs sm:text-sm text-neutral-200">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Clock size={20} className="text-cyan-400 shrink-0" />
                  <span>Guaranteed response within 12–24 hours</span>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Mail size={20} className="text-amber-400 shrink-0" />
                  <a href="mailto:harmansinghsaini4134@gmail.com" className="hover:text-cyan-300 transition-colors font-medium">
                    harmansinghsaini4134@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Mail size={20} className="text-cyan-400 shrink-0" />
                  <a href="mailto:zathuraventures@gmail.com" className="hover:text-cyan-300 transition-colors font-medium">
                    zathuraventures@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/15 flex items-center justify-between">
              <div>
                <span className="font-sans text-xs text-neutral-400 uppercase tracking-wider block mb-0.5">
                  Lead Systems Architect
                </span>
                <span className="text-white font-black text-lg">Harman Saini</span>
              </div>
              
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/harmansaini29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/15 transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/harman-saini-d29/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/10 text-blue-400 hover:bg-white/20 border border-white/15 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-neutral-900/90 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 sm:p-10 shadow-xl">
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
                  <div className="border-b border-white/15 pb-4">
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Initiate Project Inquiry
                    </h3>
                    <p className="text-neutral-200 text-xs sm:text-sm font-normal mt-1">
                      Share your goals below and we will prepare a custom proposal and architecture roadmap.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-sans text-xs text-neutral-200 uppercase tracking-wider block mb-2 font-bold">
                        Your Name / Enterprise *
                      </label>
                      <input
                        suppressHydrationWarning
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe / Enterprise"
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-white text-sm font-normal focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="font-sans text-xs text-neutral-200 uppercase tracking-wider block mb-2 font-bold">
                        Work Email Address *
                      </label>
                      <input
                        suppressHydrationWarning
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-white text-sm font-normal focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-sans text-xs text-neutral-200 uppercase tracking-wider block mb-2 font-bold">
                      Required Service / System Solution
                    </label>
                    <select
                      suppressHydrationWarning
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#0b101d] border border-white/20 rounded-xl px-4 py-3.5 text-white text-sm font-normal focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="High-Performance Website Development">High-Performance Web Platform (Includes 1-Yr Hosting & SEO)</option>
                      <option value="Mobile App Development">iOS & Android Mobile App</option>
                      <option value="Full-Stack Custom Software">Enterprise Custom Software / SaaS Ecosystem</option>
                      <option value="AI Integration & Automation">AI Systems & Multi-Agent Workflows</option>
                      <option value="Brand Elevation">Complete Digital System Transformation</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-sans text-xs text-neutral-200 uppercase tracking-wider block mb-2 font-bold">
                      Project Scope & Goals
                    </label>
                    <textarea
                      suppressHydrationWarning
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what you want to build, target goals, and your preferred timeline..."
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-white text-sm font-normal focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    suppressHydrationWarning
                    type="submit"
                    className="w-full py-4 px-6 bg-white text-neutral-950 font-sans font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl flex items-center justify-between hover:bg-cyan-400 transition-all duration-300 shadow-md cursor-pointer mt-1"
                  >
                    <span>Connect & Digitalise Your System</span>
                    <ArrowRight size={18} />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-center font-sans text-xs text-neutral-300 pt-1 font-medium">
                    <span>✓ Free 1-Yr Hosting</span>
                    <span>•</span>
                    <span>✓ Core SEO Included</span>
                    <span>•</span>
                    <span>✓ 24/7 Dedicated Support</span>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 flex flex-col items-center justify-center min-h-[340px]"
                >
                  <div className="w-16 h-16 border border-cyan-400/50 bg-cyan-500/10 rounded-full flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                    <Check className="text-cyan-400" size={30} />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    Inquiry Transmitted Successfully.
                  </h3>

                  <p className="text-neutral-200 text-sm sm:text-base font-normal max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <span className="text-white font-bold">{formData.name}</span>! We have received your project details. Harman Saini will review and respond with an architectural roadmap within 12–24 hours.
                  </p>

                  <button
                    suppressHydrationWarning
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        service: "High-Performance Website Development",
                        message: "",
                      });
                    }}
                    className="font-sans text-xs text-cyan-300 uppercase tracking-widest font-bold hover:text-white transition-colors border-b border-cyan-400/40 hover:border-white pb-0.5 cursor-pointer"
                  >
                    Submit Another Inquiry
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
