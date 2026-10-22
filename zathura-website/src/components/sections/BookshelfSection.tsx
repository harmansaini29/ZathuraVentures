"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Sparkles } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  BookOpen,
  ArrowRight,
  X,
  CheckCircle2,
  Code2,
  Sparkles as SparklesIcon,
  Layers,
  Activity,
  Maximize2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import * as THREE from "three";

export interface ProjectData {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  tagline: string;
  description: string;
  url: string;
  githubUrl: string;
  color: string;
  spineColor: string;
  coverColor: string;
  year: string;
  tech: string[];
  features: string[];
  metrics: {
    highlight: string;
    label: string;
  };
}

export const BOOK_PROJECTS: ProjectData[] = [
  {
    id: "umbrella",
    title: "Project UMBRELLA",
    shortTitle: "UMBRELLA",
    category: "Autonomous Multi-Agent AI",
    tagline: "Risk-Aware Multi-Agent Fault Detection & Recovery System",
    description:
      "A decentralized multi-agent system designed for automated anomaly identification, fault isolation, and consensus-driven mitigation pipelines across mission-critical networks.",
    url: "https://github.com/Harmansaini11/project-umbrella",
    githubUrl: "https://github.com/Harmansaini11/project-umbrella",
    color: "#06b6d4",
    spineColor: "#083344",
    coverColor: "#0e7490",
    year: "2026",
    tech: ["Python", "Multi-Agent", "LangGraph", "Fault Detection", "AsyncIO"],
    features: [
      "Decentralized Multi-Agent Consensus",
      "Real-Time Anomaly & Fault Telemetry",
      "Automated Recovery Orchestration",
    ],
    metrics: {
      highlight: "< 40ms",
      label: "Fault Mitigation",
    },
  },
  {
    id: "harriot-soa",
    title: "Harriot SOA",
    shortTitle: "HARRIOT",
    category: "Smart Occupancy Agent",
    tagline: "Autonomous Space Management & Intelligent Orchestration",
    description:
      "An enterprise occupancy and workflow platform leveraging LangGraph multi-agent planning, high-speed FastAPI endpoints, and intuitive real-time monitoring interfaces.",
    url: "https://github.com/Harmansaini11/harriot-soa",
    githubUrl: "https://github.com/Harmansaini11/harriot-soa",
    color: "#f59e0b",
    spineColor: "#451a03",
    coverColor: "#b45309",
    year: "2026",
    tech: ["LangGraph", "FastAPI", "React", "Python", "Tailwind CSS"],
    features: [
      "Agentic Space Allocation Logic",
      "Sub-Millisecond FastAPI Endpoints",
      "Predictive Facility Load Analytics",
    ],
    metrics: {
      highlight: "99.98%",
      label: "Uptime Reliability",
    },
  },
  {
    id: "aegis-ai",
    title: "Aegis.AI",
    shortTitle: "AEGIS.AI",
    category: "Cybersecurity & Defense",
    tagline: "Intelligent Real-Time Anti-Bot Detection & Defense Shield",
    description:
      "A proactive security shield identifying robotic scrapers, automated credential stuffers, and zero-day threat patterns with behavioral analysis algorithms.",
    url: "https://aegis-ai.vercel.app",
    githubUrl: "https://github.com/Harmansaini11/aegis-ai",
    color: "#ef4444",
    spineColor: "#450a0a",
    coverColor: "#b91c1c",
    year: "2026",
    tech: ["Next.js", "TypeScript", "Behavioral ML", "Vercel Edge", "Redis"],
    features: [
      "Zero-Latency Edge Fingerprinting",
      "Behavioral Anti-Scraping Algorithms",
      "Real-Time Threat Prevention Dashboard",
    ],
    metrics: {
      highlight: "99.4%",
      label: "Bot Detection Accuracy",
    },
  },
  {
    id: "connex-systems",
    title: "Connex Systems",
    shortTitle: "CONNEX",
    category: "Infrastructure Automation",
    tagline: "Railway Concession Automation & Multi-Station Workflow Engine",
    description:
      "A scalable governmental workflow engine automating railway pass verification, student concessions, and multi-tier approval pipelines, slashing manual paperwork by 60%.",
    url: "https://github.com/Harmansaini11/connex-railways",
    githubUrl: "https://github.com/Harmansaini11/connex-railways",
    color: "#10b981",
    spineColor: "#022c22",
    coverColor: "#047857",
    year: "2025",
    tech: ["Express", "PostgreSQL", "Node.js", "Tailwind CSS", "Prisma"],
    features: [
      "60% Reduction in Manual Processing",
      "Encrypted Multi-Tier Approval Chain",
      "Automated Barcode Verification",
    ],
    metrics: {
      highlight: "-60%",
      label: "Processing Time",
    },
  },
  {
    id: "nyaya-ai",
    title: "NyayaAI",
    shortTitle: "NYAYA.AI",
    category: "Legal Tech Copilot",
    tagline: "AI Legal Research, OCR Contract Synthesis & Vector Retrieval",
    description:
      "An intelligent legal copilot combining OCR document ingestion, named entity recognition (NER), and FAISS vector retrieval to summarize jurisprudence and detect risk clauses.",
    url: "https://github.com/Harmansaini11/nyaya-ai",
    githubUrl: "https://github.com/Harmansaini11/nyaya-ai",
    color: "#8b5cf6",
    spineColor: "#2e1065",
    coverColor: "#6d28d9",
    year: "2026",
    tech: ["Python", "FAISS Vector DB", "LangChain", "OCR", "FastAPI"],
    features: [
      "Dense Semantic Case-Law Search",
      "Automated Contract Risk Flagging",
      "Multi-Format OCR Document Pipeline",
    ],
    metrics: {
      highlight: "12x",
      label: "Research Speedup",
    },
  },
  {
    id: "pg-rental",
    title: "PG Rental CRM",
    shortTitle: "PG RENTAL",
    category: "PropTech Management",
    tagline: "End-to-End Property Management & Tenant Concierge Platform",
    description:
      "A complete property rental ecosystem serving 10,000+ active users with automated rent collection, digital lease management, and on-demand maintenance dispatches.",
    url: "https://github.com/Harmansaini11/pg-rental-crm",
    githubUrl: "https://github.com/Harmansaini11/pg-rental-crm",
    color: "#ec4899",
    spineColor: "#500724",
    coverColor: "#be185d",
    year: "2025",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS", "Stripe"],
    features: [
      "Serving 10,000+ Active Tenants",
      "Automated Invoicing & Rent Tracking",
      "Maintenance Ticket Dispatch Engine",
    ],
    metrics: {
      highlight: "10,000+",
      label: "Active Users",
    },
  },
  {
    id: "online-gyan",
    title: "OnlineGyan",
    shortTitle: "ONLINEGYAN",
    category: "EdTech Platform",
    tagline: "Live Interactive Cohort Learning & Real-Time Student Portals",
    description:
      "A full-spectrum digital educational platform delivering live interactive cohorts, adaptive learning recommendations, and granular student progress metrics.",
    url: "https://github.com/Harmansaini11/online-gyan",
    githubUrl: "https://github.com/Harmansaini11/online-gyan",
    color: "#3b82f6",
    spineColor: "#172554",
    coverColor: "#1d4ed8",
    year: "2025",
    tech: ["Full Stack", "WebSockets", "Node.js", "MongoDB", "Next.js"],
    features: [
      "Real-Time Interactive Whiteboard & Chat",
      "Adaptive Progress Diagnostic Engine",
      "Granular Assessment Analytics",
    ],
    metrics: {
      highlight: "50k+",
      label: "Learners Enrolled",
    },
  },
  {
    id: "smart-ai-umpire",
    title: "Smart AI Umpire",
    shortTitle: "AI UMPIRE",
    category: "3D Spatial Sports",
    tagline: "Real-Time 3D Trajectory Tracking & Instant Spatial Umpiring",
    description:
      "An innovative 3D computer vision and WebGL umpire system calculating ball trajectory, impact coordinates, and instant spatial playback decisions in real-time.",
    url: "https://harmansaini29.vercel.app/",
    githubUrl: "https://github.com/Harmansaini11",
    color: "#00d2ff",
    spineColor: "#0c4a6e",
    coverColor: "#0284c7",
    year: "2026",
    tech: ["Three.js", "React Three Fiber", "Socket.IO", "Computer Vision"],
    features: [
      "Sub-Millimeter 3D Ball Trajectory",
      "Instant Spatial WebGL Decision Replay",
      "Real-Time Multi-Camera Sync",
    ],
    metrics: {
      highlight: "60 FPS",
      label: "Spatial Precision",
    },
  },
];

/* ─── 3D Individual Interactive Book ─────────────────────────────────────── */
interface BookMeshProps {
  project: ProjectData;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
  onSelect: (project: ProjectData) => void;
}

function BookMesh({ project, index, hoveredIndex, setHoveredIndex, onSelect }: BookMeshProps) {
  const isHovered = hoveredIndex === index;
  const bookGroupRef = useRef<THREE.Group>(null);
  const coverHingeRef = useRef<THREE.Group>(null);

  // Book physical dimensions
  const bookWidth = 0.32; // Spine width / thickness
  const bookHeight = 2.4; // Height of book
  const bookDepth = 1.6; // Depth of book from spine to outer edge

  // Spacing along shelf
  const spacing = 1.15;
  const posX = (index - (BOOK_PROJECTS.length - 1) / 2) * spacing;

  useFrame((_, delta) => {
    if (!bookGroupRef.current || !coverHingeRef.current) return;

    // When hovered, the book pulls forward towards viewer, lifts slightly, and rotates to face camera
    const targetZ = isHovered ? 1.15 : 0;
    const targetY = isHovered ? 0.32 : 0;
    const targetRotY = isHovered ? -0.55 : 0; // Rotate book group towards the camera
    const targetRotX = isHovered ? 0.06 : 0;

    // Smooth physics dampening
    bookGroupRef.current.position.z = THREE.MathUtils.damp(
      bookGroupRef.current.position.z,
      targetZ,
      5,
      delta
    );
    bookGroupRef.current.position.y = THREE.MathUtils.damp(
      bookGroupRef.current.position.y,
      targetY,
      5,
      delta
    );
    bookGroupRef.current.rotation.y = THREE.MathUtils.damp(
      bookGroupRef.current.rotation.y,
      targetRotY,
      4.5,
      delta
    );
    bookGroupRef.current.rotation.x = THREE.MathUtils.damp(
      bookGroupRef.current.rotation.x,
      targetRotX,
      4.5,
      delta
    );

    // Front Cover Hinge Animation: When hovered, front cover opens smoothly ~125 degrees
    const targetCoverAngle = isHovered ? -Math.PI * 0.7 : 0;
    coverHingeRef.current.rotation.y = THREE.MathUtils.damp(
      coverHingeRef.current.rotation.y,
      targetCoverAngle,
      4.5,
      delta
    );
  });

  return (
    <group position={[posX, 0, 0]}>
      {/* ─── Stationary Invisible Hit Box (Guarantees zero mouse flicker) ─── */}
      <mesh
        position={[0, bookHeight / 2, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          setHoveredIndex(index);
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
          if (hoveredIndex === index) {
            setHoveredIndex(null);
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(project);
        }}
      >
        <boxGeometry args={[spacing * 0.95, bookHeight * 1.2, bookDepth * 1.4]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* ─── Dynamic Animating Book Group ──────────────────────────────────── */}
      <group ref={bookGroupRef}>
        
        {/* 1. Spine (Facing +Z towards the user) */}
        <mesh position={[0, bookHeight / 2, bookDepth / 2]}>
          <boxGeometry args={[bookWidth, bookHeight, 0.05]} />
          <meshStandardMaterial
            color={project.spineColor}
            metalness={0.3}
            roughness={0.35}
          />
        </mesh>

        {/* Spine Metallic Gold Foil Accents */}
        <mesh position={[0, bookHeight * 0.88, bookDepth / 2 + 0.026]}>
          <boxGeometry args={[bookWidth * 0.92, 0.06, 0.01]} />
          <meshStandardMaterial color="#fcd34d" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, bookHeight * 0.12, bookDepth / 2 + 0.026]}>
          <boxGeometry args={[bookWidth * 0.92, 0.06, 0.01]} />
          <meshStandardMaterial color="#fcd34d" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Spine Vertical Title */}
        <Text
          position={[0, bookHeight * 0.52, bookDepth / 2 + 0.027]}
          rotation={[0, 0, -Math.PI / 2]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
          maxWidth={bookHeight * 0.72}
        >
          {project.shortTitle}
        </Text>

        {/* 2. Back Cover (Static at -X side) */}
        <mesh position={[-bookWidth / 2, bookHeight / 2, 0]}>
          <boxGeometry args={[0.04, bookHeight, bookDepth]} />
          <meshStandardMaterial
            color={project.coverColor}
            metalness={0.25}
            roughness={0.35}
          />
        </mesh>

        {/* 3. Paper Pages Block (Inside Book) */}
        <group position={[0, bookHeight / 2, 0]}>
          <mesh position={[-0.01, 0, 0.02]}>
            <boxGeometry args={[bookWidth * 0.78, bookHeight * 0.94, bookDepth * 0.94]} />
            <meshStandardMaterial color="#fafaf9" roughness={0.8} metalness={0.05} />
          </mesh>

          {/* Gold page trim on outer edge */}
          <mesh position={[-0.01, 0, -bookDepth * 0.45]}>
            <boxGeometry args={[bookWidth * 0.8, bookHeight * 0.93, 0.02]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Open Inside Page Content (Facing camera when opened) */}
          {isHovered && (
            <group position={[bookWidth * 0.39, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <Text
                position={[0, 0.65, 0.01]}
                fontSize={0.13}
                color="#0f172a"
                anchorX="center"
                anchorY="middle"
                maxWidth={1.4}
              >
                {project.title}
              </Text>
              <Text
                position={[0, 0.42, 0.01]}
                fontSize={0.09}
                color={project.coverColor}
                anchorX="center"
                anchorY="middle"
                maxWidth={1.4}
              >
                {project.category}
              </Text>
              <Text
                position={[0, 0.05, 0.01]}
                fontSize={0.075}
                color="#334155"
                anchorX="center"
                anchorY="middle"
                maxWidth={1.35}
              >
                {project.tagline}
              </Text>
              <Text
                position={[0, -0.4, 0.01]}
                fontSize={0.08}
                color="#0284c7"
                anchorX="center"
                anchorY="middle"
              >
                Click to inspect details →
              </Text>
            </group>
          )}
        </group>

        {/* 4. Front Cover Hinge Group (Hinged at the front spine corner) */}
        <group
          ref={coverHingeRef}
          position={[bookWidth / 2, bookHeight / 2, bookDepth / 2]}
        >
          {/* Front Cover Hard Board Plate */}
          <mesh position={[-0.02, 0, -bookDepth / 2]}>
            <boxGeometry args={[0.04, bookHeight, bookDepth]} />
            <meshStandardMaterial
              color={project.coverColor}
              metalness={0.3}
              roughness={0.35}
            />
          </mesh>

          {/* Front Cover Inlaid Foil Accent */}
          <mesh position={[0.005, 0, -bookDepth / 2]}>
            <boxGeometry args={[0.005, bookHeight * 0.88, bookDepth * 0.85]} />
            <meshStandardMaterial
              color={project.color}
              metalness={0.65}
              roughness={0.25}
            />
          </mesh>

          {/* Front Cover Embossed Title */}
          <Text
            position={[0.015, 0.35, -bookDepth / 2]}
            rotation={[0, Math.PI / 2, 0]}
            fontSize={0.12}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={bookDepth * 0.8}
          >
            {project.title}
          </Text>

          <Text
            position={[0.015, -0.35, -bookDepth / 2]}
            rotation={[0, Math.PI / 2, 0]}
            fontSize={0.08}
            color="#fde047"
            anchorX="center"
            anchorY="middle"
          >
            {project.metrics.highlight} • {project.year}
          </Text>
        </group>

      </group>
    </group>
  );
}

/* ─── 3D Bookshelf Structure & Lighting ────────────────────────────────────── */
function BookshelfScene({
  hoveredIndex,
  setHoveredIndex,
  onSelect,
}: {
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
  onSelect: (project: ProjectData) => void;
}) {
  return (
    <>
      {/* Studio Lighting */}
      <ambientLight intensity={1.8} />
      <directionalLight position={[6, 9, 6]} intensity={2.4} color="#ffffff" />
      <directionalLight position={[-6, 5, 4]} intensity={1.4} color="#38bdf8" />
      <spotLight
        position={[0, 8, 4]}
        angle={0.85}
        intensity={3.0}
        color="#fffbeb"
        penumbra={0.8}
      />

      {/* Floating subtle ambient particles */}
      <Sparkles count={40} scale={12} size={1.2} speed={0.25} opacity={0.3} color="#38bdf8" />

      <group position={[0, -0.6, 0]}>
        {/* Books on the Shelf */}
        {BOOK_PROJECTS.map((proj, idx) => (
          <BookMesh
            key={proj.id}
            project={proj}
            index={idx}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            onSelect={onSelect}
          />
        ))}

        {/* ─── Bottom Shelf Plank (Books rest directly on this) ─────────────── */}
        <mesh position={[0, -0.1, 0.25]}>
          <boxGeometry args={[11.5, 0.2, 3.2]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>

        {/* Shelf Front Bevel Trim */}
        <mesh position={[0, -0.01, 1.84]}>
          <boxGeometry args={[11.5, 0.03, 0.02]} />
          <meshBasicMaterial color="#38bdf8" toneMapped={false} />
        </mesh>

        {/* Shelf Back Wall */}
        <mesh position={[0, 1.6, -1.35]}>
          <boxGeometry args={[11.8, 3.8, 0.1]} />
          <meshStandardMaterial
            color="#080e1a"
            metalness={0.8}
            roughness={0.4}
          />
        </mesh>

        {/* Top Shelf Roof */}
        <mesh position={[0, 3.5, 0.25]}>
          <boxGeometry args={[11.5, 0.2, 3.2]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </group>
    </>
  );
}

export default function BookshelfSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Active project for HUD: default to first project when none hovered
  const activeProject =
    hoveredIndex !== null ? BOOK_PROJECTS[hoveredIndex] : BOOK_PROJECTS[0];

  return (
    <section
      id="bookshelf"
      className="relative w-full py-24 sm:py-32 bg-[#02050e] overflow-hidden select-none z-10 border-t border-b border-white/10"
    >
      {/* Background Soft Ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-4 backdrop-blur-md">
              <BookOpen size={15} className="text-cyan-400" />
              <span className="font-sans text-xs uppercase tracking-widest text-cyan-300 font-bold">
                Interactive Three.js 3D Bookshelf
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Systems & Projects <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-cyan-400">
                Library on the Shelf.
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-neutral-200 text-sm sm:text-base font-normal leading-relaxed mb-3">
              Hover over any book to watch it slide out and open its cover in 3D while the remaining books stay closed on the shelf.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl w-fit">
              <SparklesIcon size={14} className="text-amber-400" />
              <span>Three.js Hinge Physics • Hover Any Book To Open</span>
            </div>
          </div>
        </div>

        {/* 3D Bookshelf Canvas Viewport */}
        <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] bg-gradient-to-b from-[#080f20] via-[#030712] to-[#01040a] rounded-3xl border border-white/20 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          
          {/* Top Canvas Status */}
          <div className="absolute top-5 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-bold uppercase tracking-wider">3D Shelf Engine Active</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-300">
              <span>{BOOK_PROJECTS.length} Systems Cataloged</span>
            </div>
          </div>

          {/* Three.js Canvas */}
          <Canvas
            camera={{ position: [0, 0.45, 5.8], fov: 42 }}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            dpr={[1, 1.5]}
          >
            <BookshelfScene
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              onSelect={(p) => setSelectedProject(p)}
            />
          </Canvas>

          {/* Bottom Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full bg-black/80 border border-white/20 backdrop-blur-md font-sans text-xs text-neutral-200 uppercase tracking-wider pointer-events-none flex items-center gap-2 whitespace-nowrap shadow-md">
            <BookOpen size={14} className="text-cyan-400" />
            <span>Hover book to open cover • Click to inspect details</span>
          </div>
        </div>

        {/* Quick Selection Buttons for Touch / Mobile Screens */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
          {BOOK_PROJECTS.map((proj, idx) => (
            <button
              suppressHydrationWarning
              key={proj.id}
              onClick={() => {
                setHoveredIndex(idx);
                setSelectedProject(proj);
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              className={`font-sans text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                hoveredIndex === idx
                  ? "bg-white text-neutral-950 font-black border-white shadow-lg scale-105"
                  : "bg-neutral-900/90 text-neutral-200 hover:text-white border-white/15 hover:border-white/30"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: proj.color }}
              />
              <span>{proj.title}</span>
            </button>
          ))}
        </div>

        {/* Real-Time Synchronized Project Details Card */}
        {activeProject && (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8 bg-neutral-900/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ backgroundColor: activeProject.color }}
            />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2.5">
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border"
                    style={{
                      color: activeProject.color,
                      borderColor: `${activeProject.color}40`,
                      backgroundColor: `${activeProject.color}15`,
                    }}
                  >
                    {activeProject.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-300">
                    <Activity size={13} className="text-cyan-400" />
                    <span>{activeProject.year} Production</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  {activeProject.title}
                </h3>

                <p className="text-neutral-200 text-sm sm:text-base font-normal leading-relaxed mb-4 max-w-3xl">
                  {activeProject.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs text-neutral-200 bg-white/10 border border-white/15 px-3 py-1 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row sm:flex-col gap-3 w-full lg:w-auto shrink-0">
                <button
                  suppressHydrationWarning
                  onClick={() => setSelectedProject(activeProject)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-neutral-950 font-sans text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-cyan-400 hover:text-neutral-950 transition-all duration-300 shadow-md cursor-pointer"
                >
                  <Maximize2 size={16} />
                  <span>Inspect System</span>
                </button>

                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/20 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  <span>Open Project</span>
                  <ExternalLink size={16} className="text-cyan-400" />
                </a>
              </div>

            </div>
          </motion.div>
        )}

      </div>

      {/* Comprehensive Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-[#090e1a] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: selectedProject.color }}
              />

              <button
                suppressHydrationWarning
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 border border-white/20 text-neutral-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border"
                  style={{
                    color: selectedProject.color,
                    borderColor: `${selectedProject.color}40`,
                    backgroundColor: `${selectedProject.color}15`,
                  }}
                >
                  {selectedProject.category}
                </span>
                <span className="font-mono text-xs text-neutral-300">• {selectedProject.year}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                {selectedProject.title}
              </h3>

              <p className="font-mono text-xs sm:text-sm text-cyan-300 mb-4 font-semibold">
                {selectedProject.tagline}
              </p>

              <p className="text-neutral-200 text-sm sm:text-base font-normal leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Architecture Highlights */}
              <div className="mb-6">
                <div className="font-sans text-xs text-neutral-300 uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                  <Layers size={15} className="text-cyan-400" />
                  <span>Key Architecture & Features</span>
                </div>
                <div className="space-y-2.5">
                  {selectedProject.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-100 font-medium">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: selectedProject.color }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <div className="font-sans text-xs text-neutral-300 uppercase tracking-wider font-bold mb-2.5 flex items-center gap-2">
                  <Code2 size={15} className="text-amber-400" />
                  <span>Engineering Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs text-neutral-100 bg-white/10 border border-white/20 px-3 py-1 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-mono text-xs text-neutral-200">
                  <span className="text-white font-black text-sm">{selectedProject.metrics.highlight}</span>
                  <span>{selectedProject.metrics.label}</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon size={18} />
                    </a>
                  )}

                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-neutral-950 font-sans text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-cyan-400 hover:text-neutral-950 transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <span>Open Live Project</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
