"use client";

import { useRef, Suspense, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, useSpring } from "framer-motion";
import * as THREE from "three";
import { HeroGlobeScene } from "./HeroGlobe";
import { FoundryScene } from "./IntelligenceFoundry";

/* ─────────────────────────────────────────────────────────────────────────────
   ScrollCamera: Pans from Globe (y: -1.5) to Datacenter (y: -31.5)
───────────────────────────────────────────────────────────────────────────── */
function ScrollCamera({ scrollYProgress }: { scrollYProgress: any }) {
  const { camera } = useThree();
  
  useFrame(() => {
    // scrollYProgress.get() goes from 0 to 1
    const progress = scrollYProgress.get();
    
    // Implement Scroll Pause:
    // 0 to 0.65 -> Pan camera down to Datacenter
    // 0.65 to 1.0 -> Hold camera perfectly still (Pause)
    const effectiveProgress = Math.min(progress / 0.65, 1.0);
    
    // Start slightly higher to push globe completely into the center downwards
    const startY = 1.5;
    const endY = -31.5;
    const targetY = startY + (endY - startY) * effectiveProgress;
    
    // Smoothly interpolate Z position (Globe needs z:15 to fit massive size, Datacenter needs z:16)
    const startZ = 15;
    const endZ = 16;
    const targetZ = startZ + (endZ - startZ) * effectiveProgress;

    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.15);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.15);
  });

  return null;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Connecting Energy Beam: Lava Flow powering the Globe from the Datacenter
───────────────────────────────────────────────────────────────────────────── */
const beamVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const beamFragmentShader = `
  uniform float time;
  varying vec2 vUv;

  // Simple noise function
  float noise(vec2 p) {
    return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    // Scroll UV downwards
    vec2 st = vUv;
    st.y -= time * 0.5;

    // Create lava-like flow
    float n = noise(st * 10.0 + time * 0.2);
    
    // Core color: hot orange/yellow
    vec3 color = vec3(1.0, 0.4, 0.0);
    // Add intense bright spots
    color += vec3(1.0, 0.8, 0.2) * smoothstep(0.6, 1.0, n);

    // Soft edges
    float alpha = sin(vUv.x * 3.14159) * 0.8;

    gl_FragColor = vec4(color, alpha * (0.6 + n * 0.4));
  }
`;

function ConnectingBeam() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <group>
      <mesh position={[0, -19.75, 0]}>
        {/* Height 23.5, going from y=-31.5 to y=-8.0 (exactly at the shield) */}
        <cylinderGeometry args={[0.3, 0.3, 23.5, 32]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={beamVertexShader}
          fragmentShader={beamFragmentShader}
          uniforms={{ time: { value: 0 } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Outer Glow for the beam */}
      <mesh position={[0, -19.75, 0]}>
        <cylinderGeometry args={[1.0, 1.0, 23.5, 16]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent opacity={0.1} depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Beam Sparks: Fluid Cyan Lava Splash where beam hits the Globe Platform
───────────────────────────────────────────────────────────────────────────── */
function BeamSparks() {
  const count = 150;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  
  // Create an array of random lava colors
  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const colorObj = new THREE.Color();
    const palettes = ["#ff4400", "#ffaa00", "#ff0000", "#d4af37"];
    for (let i = 0; i < count; i++) {
      colorObj.set(palettes[Math.floor(Math.random() * palettes.length)]);
      arr[i * 3] = colorObj.r;
      arr[i * 3 + 1] = colorObj.g;
      arr[i * 3 + 2] = colorObj.b;
    }
    return arr;
  }, [count]);

  const particleData = useRef(
    Array.from({ length: count }, () => ({
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        Math.random() * 4 + 2, // High upward thrust (lava splash)
        (Math.random() - 0.5) * 3
      ),
      life: Math.random(),
      speed: 0.5 + Math.random() * 1.5
    }))
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    particleData.current.forEach((p, i) => {
      p.life += delta * p.speed;
      if (p.life > 1) {
        p.life = 0;
        p.velocity.set(
          (Math.random() - 0.5) * 3,
          Math.random() * 4 + 2,
          (Math.random() - 0.5) * 3
        );
      }
      const time = p.life;
      dummy.position.set(
        p.velocity.x * time,
        p.velocity.y * time - 5 * time * time, // Stronger gravity arc for lava droplets
        p.velocity.z * time
      );
      dummy.scale.setScalar((1 - time) * 1.5);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, -8.0, 0]}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial toneMapped={false} />
      <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
    </instancedMesh>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Export
───────────────────────────────────────────────────────────────────────────── */
export default function UnifiedCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExploded, setIsExploded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  // Extremely tight and smooth spring to prevent lag over the DOM scroll
  const smoothProgress = useSpring(scrollYProgress, { damping: 40, stiffness: 300 });

  const handleClick = () => {
    if (isExploded) return;
    setIsExploded(true);
    setTimeout(() => setIsExploded(false), 3500);
  };

  return (
    <section 
      ref={containerRef} 
      id="unified-core"
      style={{ 
        position: "relative", 
        width: "100vw", 
        height: "350vh", // Massive scroll space for pause effect
        background: "#020a14" 
      }}
    >
      
      {/* Datacenter Title (appears at the bottom) */}
      <div 
        style={{ 
          position: "absolute", bottom: "12vh", left: 0, width: "100%", zIndex: 10, textAlign: "center", pointerEvents: "none" 
        }}
      >
        <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 300, color: "#fff", margin: "0 0 0.5rem", letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
          THE <span style={{ fontWeight: 800, color: "#00e5ff", textShadow: "0 0 20px rgba(0,229,255,0.4)" }}>QUANTUM</span> CORE
        </h1>
        <div style={{ width: "40px", height: "2px", background: "#00e5ff", margin: "1rem auto", boxShadow: "0 0 10px #00e5ff" }} />
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0, fontFamily: "'Inter', sans-serif" }}>
          Autonomous Infrastructure
        </p>
      </div>

      {/* The Sticky WebGL Canvas */}
      <div style={{ position: "sticky", top: 0, width: "100%", height: "100vh", overflow: "hidden" }}>
        
        {/* ZV monogram spin keyframes */}
        <style>{`
          @keyframes zv-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes zv-spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        `}</style>

        <Canvas
          gl={{ antialias: false, powerPreference: "high-performance" }}
          dpr={[1, 1.2]}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          {/* Base Setup */}
          <color attach="background" args={["#020a14"]} />
          <fog attach="fog" args={["#020a14", 15, 45]} />
          
          <ScrollCamera scrollYProgress={smoothProgress} />

          <Suspense fallback={null}>
            {/* Top Section: Hero Globe */}
            <group position={[0, 0, 0]}>
              <HeroGlobeScene isExploded={isExploded} handleClick={handleClick} />
            </group>

            {/* Connecting Beam and Sparks */}
            <ConnectingBeam />
            <BeamSparks />

            {/* Bottom Section: Datacenter */}
            <group position={[0, -30, 0]}>
              {/* Note: FoundryScene contains its own background/fog, which is fine, but they might override the base ones. */}
              <FoundryScene />
            </group>
          </Suspense>
        </Canvas>

        {/* Seamless transition gradients at top/bottom of screen */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "10vh", background: "linear-gradient(to bottom, #020a14, transparent)", zIndex: 5, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "10vh", background: "linear-gradient(to top, #020a14, transparent)", zIndex: 5, pointerEvents: "none" }} />
      </div>

    </section>
  );
}
