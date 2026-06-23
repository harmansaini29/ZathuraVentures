"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────────────────
   Data 
───────────────────────────────────────────────────────────────────────────── */
const TECH_STACKS = [
  "React", "Next.js", "WebGL", "AWS", "UI/UX Design",
  "Python", "Node.js", "TypeScript", "Three.js", "Framer",
  "Docker", "PostgreSQL", "Kubernetes", "AI / ML",
];

/* ─────────────────────────────────────────────────────────────────────────────
   Quantum Monolith — A hyper-professional, multi-billion dollar structure
───────────────────────────────────────────────────────────────────────────── */
function QuantumMonolith() {
  const monolithRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (monolithRef.current) {
      monolithRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={monolithRef} position={[0, -2, 0]}>
      {/* Outer Glass Casing - Hexagonal */}
      <mesh>
        <cylinderGeometry args={[4, 4, 16, 6]} />
        <meshStandardMaterial 
          color="#0066ff" 
          metalness={0.9} 
          roughness={0.1}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>


      {/* Inner Glowing Core - replaced dark wireframe with transparent additive glow */}
      <mesh>
        <cylinderGeometry args={[2.5, 2.5, 15.8, 6]} />
        <meshStandardMaterial 
          color="#0066ff" 
          emissive="#0044bb" 
          emissiveIntensity={1.5}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer Framework Rings */}
      {[-6, -3, 0, 3, 6].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[4.2, 0.05, 16, 6]} />
            <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[4.4, 0.02, 16, 64]} />
            <meshStandardMaterial color="#0088ff" emissive="#0088ff" emissiveIntensity={1} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Floating Holographic Data Panels */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 6 + Math.random() * 2;
        const yPos = -6 + Math.random() * 12;
        return (
          <mesh key={`panel-${i}`} position={[Math.cos(angle) * radius, yPos, Math.sin(angle) * radius]} rotation={[0, -angle + Math.PI / 2, 0]}>
            <planeGeometry args={[1.5, 2.5]} />
            <meshBasicMaterial 
              color="#00e5ff" 
              transparent 
              opacity={0.15 + Math.random() * 0.1} 
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
            {/* Panel border */}
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(1.5, 2.5)]} />
              <lineBasicMaterial color="#00e5ff" transparent opacity={0.4} />
            </lineSegments>
          </mesh>
        );
      })}
      
      {/* Massive Base Platform */}
      <mesh position={[0, -8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[8, 12, 1, 64]} />
        <meshStandardMaterial color="#01060e" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -7.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7.8, 8, 64]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Volumetric Energy Beam
───────────────────────────────────────────────────────────────────────────── */
function CentralBeam() {
  const outerRef = useRef<THREE.Mesh>(null);
  const coreRef  = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRef.current) {
      const m = outerRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.4 + Math.sin(t * 1.5) * 0.15;
    }
    if (coreRef.current) {
      const m = coreRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 2.0 + Math.sin(t * 2.5) * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={outerRef}>
        <cylinderGeometry args={[1.2, 1.2, 40, 32, 1, true]} />
        <meshStandardMaterial
          color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.4}
          transparent opacity={0.08} depthWrite={false}
          blending={THREE.AdditiveBlending} side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={coreRef}>
        <cylinderGeometry args={[0.2, 0.2, 40, 16]} />
        <meshStandardMaterial
          color="#ffffff" emissive="#ffffff" emissiveIntensity={2}
          transparent opacity={0.9} depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Beam Particles
───────────────────────────────────────────────────────────────────────────── */
function BeamParticles() {
  const N = 150;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = Math.random() * 0.4;
      const a = Math.random() * Math.PI * 2;
      arr[i * 3]     = Math.cos(a) * r;
      arr[i * 3 + 1] = Math.random() * 40 - 20;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr  = attr.array as Float32Array;
    for (let i = 0; i < N; i++) {
      arr[i * 3 + 1] += 0.05; // Elegant slow rise
      if (arr[i * 3 + 1] > 20) arr[i * 3 + 1] = -20;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#00e5ff" transparent opacity={0.8} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Rising Tech Rings — Perfectly synchronized slow crawl to match HeroGlobe
───────────────────────────────────────────────────────────────────────────── */
function FoundryTechRings() {
  const groupRef = useRef<THREE.Group>(null);
  const RING_COUNT = 8;

  const rings = useMemo(() =>
    Array.from({ length: RING_COUNT }, (_, i) => ({
      yOffset: -12 + i * 5,
      speed: 0.015 + Math.random() * 0.015, // Majestic slow crawl
      rotSpeed: (Math.random() > 0.5 ? 1 : -1) * (0.005 + Math.random() * 0.01),
      labels: [
        TECH_STACKS[Math.floor(Math.random() * TECH_STACKS.length)],
        TECH_STACKS[Math.floor(Math.random() * TECH_STACKS.length)],
      ],
    })), []
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((ringGroup, i) => {
      const d = rings[i];
      ringGroup.position.y += delta * d.speed * 60;
      ringGroup.rotation.y  += delta * d.rotSpeed * 60;

      // Fly all the way up to the globe (y=28 relative to foundry's -30)
      if (ringGroup.position.y > 28) ringGroup.position.y = -10;

      let alpha = 1.0;
      if (ringGroup.position.y < -6) alpha = (ringGroup.position.y + 10) / 4.0;
      else if (ringGroup.position.y > 24) alpha = 1.0 - ((ringGroup.position.y - 24) / 4.0);

      ringGroup.children.forEach((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (mat && mat.opacity !== undefined) {
            mat.opacity = Math.max(0, Math.min(1, alpha)) * ((mat as any)._baseOpacity ?? 0.4);
          }
        }
      });
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {rings.map((ring, i) => (
        <group key={i} position={[0, ring.yOffset, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} ref={(m) => { if (m) (m.material as any)._baseOpacity = 0.6; }}>
            <ringGeometry args={[3.2, 3.25, 64]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.6} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} ref={(m) => { if (m) (m.material as any)._baseOpacity = 0.2; }}>
            <ringGeometry args={[2.7, 3.0, 64]} />
            <meshBasicMaterial color="#0088ff" transparent opacity={0.2} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} ref={(m) => { if (m) (m.material as any)._baseOpacity = 0.8; }}>
            <torusGeometry args={[2.5, 0.022, 64, 100]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} toneMapped={false} />
          </mesh>

          <Html position={[3.25, 0.2, 0]} center style={{ pointerEvents: "none" }}>
            <div style={{
              background: "rgba(0, 136, 255, 0.15)", border: "1px solid rgba(0, 229, 255, 0.3)",
              padding: "6px 16px", borderRadius: "30px", color: "#fff", fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem", fontWeight: 600, textShadow: "0 0 10px rgba(0, 229, 255, 0.5)",
              backdropFilter: "blur(6px)", whiteSpace: "nowrap",
            }}>{ring.labels[0]}</div>
          </Html>
          <Html position={[-3.25, 0.2, 0]} center style={{ pointerEvents: "none" }}>
            <div style={{
              background: "rgba(0, 136, 255, 0.15)", border: "1px solid rgba(0, 229, 255, 0.3)",
              padding: "6px 16px", borderRadius: "30px", color: "#fff", fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem", fontWeight: 600, textShadow: "0 0 10px rgba(0, 229, 255, 0.5)",
              backdropFilter: "blur(6px)", whiteSpace: "nowrap",
            }}>{ring.labels[1]}</div>
          </Html>
        </group>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Ambient space dust
───────────────────────────────────────────────────────────────────────────── */
function AmbientDust() {
  const ref = useRef<THREE.Points>(null);
  const N = 500;
  const positions = useMemo(() => {
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 2] = Math.random() * -20 - 2;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#00aaff" transparent opacity={0.3} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Complete 3D Scene
───────────────────────────────────────────────────────────────────────────── */
export function FoundryScene() {
  return (
    <>
      {/* Vertical Holographic Text */}
      <Html position={[-8, 5, 0]} center transform style={{ pointerEvents: "none" }}>
        <div style={{
          writingMode: "vertical-rl",
          textOrientation: "upright",
          fontFamily: "'Inter', sans-serif",
          fontSize: "2rem",
          fontWeight: 900,
          color: "rgba(0, 229, 255, 0.15)",
          textShadow: "0 0 20px rgba(0, 229, 255, 0.4)",
          letterSpacing: "1rem",
          userSelect: "none"
        }}>
          ZATHURA VENTURES
        </div>
      </Html>
      <Html position={[8, -5, 0]} center transform style={{ pointerEvents: "none" }}>
        <div style={{
          writingMode: "vertical-rl",
          textOrientation: "upright",
          fontFamily: "'Inter', sans-serif",
          fontSize: "2rem",
          fontWeight: 900,
          color: "rgba(0, 229, 255, 0.15)",
          textShadow: "0 0 20px rgba(0, 229, 255, 0.4)",
          letterSpacing: "1rem",
          userSelect: "none"
        }}>
          QUANTUM CORE
        </div>
      </Html>

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 8, 5]} intensity={1.5} color="#00e5ff" distance={20} decay={2} />
      <pointLight position={[0, -8, 5]} intensity={1.5} color="#00e5ff" distance={20} decay={2} />
      
      {/* Edge rim lights */}
      <pointLight position={[-10, 0, -5]} intensity={2} color="#0033aa" distance={30} decay={2} />
      <pointLight position={[10, 0, -5]}  intensity={2} color="#0033aa" distance={30} decay={2} />

      <AmbientDust />
      <QuantumMonolith />
      <CentralBeam />
      <BeamParticles />
      <FoundryTechRings />

      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
      </EffectComposer>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Export
───────────────────────────────────────────────────────────────────────────── */
export default function IntelligenceFoundry() {
  return (
    <section id="foundry" style={{ position: "relative", width: "100vw", height: "100vh", background: "#020a14", overflow: "hidden" }}>
      
      {/* Sleek Minimal Overlay */}
      <div style={{ position: "absolute", top: "12%", left: "50%", transform: "translateX(-50%)", zIndex: 10, textAlign: "center", pointerEvents: "none", width: "100%" }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 300, color: "#fff", margin: "0 0 0.5rem", letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
          THE <span style={{ fontWeight: 800, color: "#00e5ff", textShadow: "0 0 20px rgba(0,229,255,0.4)" }}>QUANTUM</span> CORE
        </h2>
        <div style={{ width: "40px", height: "2px", background: "#00e5ff", margin: "1rem auto", boxShadow: "0 0 10px #00e5ff" }} />
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0, fontFamily: "'Inter', sans-serif" }}>
          Autonomous Infrastructure
        </p>
      </div>

      <Canvas
        camera={{ position: [0, 2, 16], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <Suspense fallback={null}>
          <FoundryScene />
        </Suspense>
      </Canvas>

      {/* Seamless transitions */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "15vh", background: "linear-gradient(to bottom, #020a14, transparent)", zIndex: 5, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "15vh", background: "linear-gradient(to top, #020a14, transparent)", zIndex: 5, pointerEvents: "none" }} />
    </section>
  );
}
