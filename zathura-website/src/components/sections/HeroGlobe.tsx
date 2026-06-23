"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const RADIUS = 5.5;
const TOTAL_DOTS = 18000;

const globeVertexShader = `
  attribute vec3 color; // React Three Fiber maps 'colors' buffer to 'color' attribute
  varying vec3 vColor;
  varying vec3 vPosition;
  void main() {
    vColor = color;
    vPosition = position;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    // Dynamic point size scaling for depth
    gl_PointSize = 35.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const globeFragmentShader = `
  uniform sampler2D uMap;
  uniform float uOpacity;
  varying vec3 vColor;
  varying vec3 vPosition;
  
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    
    // Map 3D sphere to 2D equirectangular UV
    vec3 n = normalize(vPosition);
    float u = 0.5 + atan(n.z, n.x) / (2.0 * 3.14159265);
    float v = 0.5 + asin(n.y) / 3.14159265;
    
    vec4 mapColor = texture2D(uMap, vec2(u, v));
    
    // earth_specular_2048.jpg: Water is white (1.0), Land is black (0.0)
    if (mapColor.r > 0.5) discard;

    float alpha = (0.5 - d) * 2.0;
    gl_FragColor = vec4(vColor, alpha * uOpacity);
  }
`;

function SciFiGlobe({ isExploded, onClick }: { isExploded: boolean; onClick: () => void }) {
  const pointsRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; }
  }, [hovered]);

  const { originalPositions, targetPositions, colors, count } = useMemo(() => {
    const orig = [];
    const target = [];
    const col = [];

    const colorObj = new THREE.Color();
    // 10000 billion dollar website palette: Glowing Neon Blues and slight Cyan
    const palettes = ["#00e5ff", "#0088ff", "#0055ff"];

    for (let j = 0; j < TOTAL_DOTS; j++) {
      const phi = Math.acos(1 - 2 * (j + 0.5) / TOTAL_DOTS);
      const theta = Math.PI * (1 + Math.sqrt(5)) * j;

      const lat = 90 - (phi * 180) / Math.PI;
      const lon = (theta * 180) / Math.PI;

      // Let the shader handle the continent mapping! Keep 90% of dots.
      if (Math.random() > 0.9) continue;

      const x = RADIUS * Math.cos(theta) * Math.sin(phi);
      const y = RADIUS * Math.cos(phi);
      const z = RADIUS * Math.sin(theta) * Math.sin(phi);

      orig.push(x, y, z);

      // Target positions for explosion
      const dist = RADIUS + 4 + Math.random() * 8;
      target.push(
        (x / RADIUS) * dist + (Math.random() - 0.5) * 8,
        (y / RADIUS) * dist + (Math.random() - 0.5) * 8,
        (z / RADIUS) * dist + (Math.random() - 0.5) * 8
      );

      colorObj.set(palettes[Math.floor(Math.random() * palettes.length)]);
      colorObj.multiplyScalar(2.0); // Extreme bloom intensity
      col.push(colorObj.r, colorObj.g, colorObj.b);
    }

    return {
      originalPositions: new Float32Array(orig),
      targetPositions: new Float32Array(target),
      colors: new Float32Array(col),
      count: orig.length / 3
    };
  }, []);

  const currentPositions = useMemo(() => new Float32Array(originalPositions), [originalPositions]);

  const specularMap = useMemo(() => new THREE.TextureLoader().load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg"), []);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    if (!isExploded) {
      pointsRef.current.rotation.y += delta * 0.15; // Smooth rotation
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uOpacity.value,
        isExploded ? 0.3 : 1.0,
        delta * 5
      );
    }

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    let needsUpdate = false;
    for (let i = 0; i < count * 3; i++) {
      const target = isExploded ? targetPositions[i] : originalPositions[i];
      const diff = target - positions[i];
      if (Math.abs(diff) > 0.005) {
        // High end smooth spring lerp
        positions[i] += diff * Math.min(delta * (isExploded ? 6 : 4), 0.9);
        needsUpdate = true;
      } else {
        positions[i] = target;
      }
    }
    if (needsUpdate) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        visible={false}
      >
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <meshBasicMaterial />
      </mesh>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[currentPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={globeVertexShader}
          fragmentShader={globeFragmentShader}
          uniforms={{
            uMap: { value: specularMap },
            uOpacity: { value: 1.0 }
          }}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      {/* ── Holographic Zathura Ventures Brand Reveal (on click) ── */}
      <Html center style={{ pointerEvents: "none", opacity: isExploded ? 1 : 0, transition: "opacity 1s ease", zIndex: 50 }}>
        <div style={{
          transform: isExploded ? "scale(1) translateY(0)" : "scale(0.85) translateY(10px)",
          transition: "transform 1s cubic-bezier(0.16,1,0.3,1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.2rem",
          userSelect: "none",
        }}>
          {/* ZV Creative Monogram */}
          <div style={{
            position: "relative",
            width: "110px",
            height: "110px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Outer rotating ring */}
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1.5px solid rgba(0, 229, 255, 0.6)",
              boxShadow: "0 0 20px rgba(0,229,255,0.4), inset 0 0 20px rgba(0,136,255,0.1)",
              animation: "zv-spin 8s linear infinite",
            }} />
            {/* Inner gold ring */}
            <div style={{
              position: "absolute",
              inset: "10px",
              borderRadius: "50%",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              animation: "zv-spin-rev 12s linear infinite",
            }} />
            {/* ZV Letters */}
            <div style={{ position: "relative", display: "flex", alignItems: "baseline", gap: "2px" }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "3.2rem",
                fontWeight: 900,
                color: "#00e5ff",
                textShadow: "0 0 25px #00e5ff, 0 0 50px #0088ff",
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}>Z</span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "2rem",
                fontWeight: 700,
                color: "rgba(212,175,55,0.95)",
                textShadow: "0 0 15px rgba(212,175,55,0.8)",
                lineHeight: 1,
                marginBottom: "2px",
              }}>V</span>
            </div>
          </div>

          {/* Full Wordmark */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.3rem",
          }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "0.12em",
              color: "#ffffff",
              textShadow: "0 0 20px rgba(0,229,255,0.6), 0 0 40px rgba(0,136,255,0.3)",
              lineHeight: 1,
            }}>ZATHURA</div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.45em",
              color: "rgba(212,175,55,0.9)",
              textShadow: "0 0 10px rgba(212,175,55,0.5)",
              textTransform: "uppercase",
            }}>VENTURES</div>
          </div>

          {/* Glow divider */}
          <div style={{
            width: "120px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #00e5ff, rgba(212,175,55,0.8), transparent)",
            boxShadow: "0 0 10px #00e5ff",
          }} />
        </div>
      </Html>
    </group>
  );
}

/* ── Space orbital decorations around the globe ── */
function SpaceOrbitals() {
  const orb1 = useRef<THREE.Group>(null);
  const orb2 = useRef<THREE.Group>(null);
  const orb3 = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Points>(null);

  const starPositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < 400; i++) {
      const r = 7 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    return new Float32Array(pos);
  }, []);

  useFrame((_, delta) => {
    if (orb1.current) orb1.current.rotation.y += delta * 0.18;
    if (orb2.current) orb2.current.rotation.y -= delta * 0.12;
    if (orb3.current) {
      orb3.current.rotation.x += delta * 0.08;
      orb3.current.rotation.z += delta * 0.06;
    }
    if (starsRef.current) starsRef.current.rotation.y += delta * 0.01;
  });

  return (
    <group>
      {/* Background star field */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.03} transparent opacity={0.6} sizeAttenuation depthWrite={false} />
      </points>

      {/* Orbit ring 1 – thin blue equatorial */}
      <group ref={orb1} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[6.5, 0.012, 8, 128]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.35} toneMapped={false} />
        </mesh>
        {/* Orbiting dot (satellite) */}
        <mesh position={[6.5, 0, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color="#00e5ff" toneMapped={false} />
        </mesh>
      </group>

      {/* Orbit ring 2 – tilted gold */}
      <group ref={orb2} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[7.8, 0.01, 8, 128]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.25} toneMapped={false} />
        </mesh>
        <mesh position={[7.8, 0, 0]}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshBasicMaterial color="#d4af37" toneMapped={false} />
        </mesh>
      </group>

      {/* Orbit ring 3 – perpendicular faint */}
      <group ref={orb3} rotation={[0, Math.PI / 4, Math.PI / 2]}>
        <mesh>
          <torusGeometry args={[8.8, 0.008, 8, 128]} />
          <meshBasicMaterial color="#0088ff" transparent opacity={0.18} toneMapped={false} />
        </mesh>
        <mesh position={[8.8, 0, 0]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color="#00ccff" toneMapped={false} />
        </mesh>
      </group>

      {/* Small asteroid cluster */}
      {[-1.2, 0.5, 2.1, -0.8, 1.5].map((offset, i) => (
        <mesh key={i} position={[5.5 + offset * 0.3, 2 + offset * 0.4, 3 + offset * 0.2]}>
          <dodecahedronGeometry args={[0.04 + i * 0.01, 0]} />
          <meshBasicMaterial color="#aaaacc" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function RisingTechRings() {
  const ringsRef = useRef<THREE.Group>(null);
  const RINGS_COUNT = 5;
  const techStacks = ["React", "Next.js", "WebGL", "AWS", "UI/UX Design", "Python", "Node.js", "TypeScript", "Three.js", "Framer"];
  
  const ringsData = useMemo(() => {
    return Array.from({ length: RINGS_COUNT }, (_, i) => ({
      yOffset: -16 + (i * 1.8), // Spread further up so they are completely visible
      speed: 0.015 + Math.random() * 0.015, // Extremely smooth and slow
      rotationSpeed: (Math.random() > 0.5 ? 1 : -1) * (0.005 + Math.random() * 0.01), // Very slow rotation
      labels: [
        techStacks[Math.floor(Math.random() * techStacks.length)],
        techStacks[Math.floor(Math.random() * techStacks.length)]
      ]
    }));
  }, []);

  useFrame((_, delta) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ringGroup, i) => {
        const data = ringsData[i];
        
        ringGroup.position.y += delta * data.speed;
        ringGroup.rotation.y += delta * data.rotationSpeed;

        // Reset to bottom seamlessly when it reaches main platform (now the shield at -8.0)
        if (ringGroup.position.y > -7.8) {
          ringGroup.position.y = -16;
        }

        let alpha = 1.0;
        if (ringGroup.position.y < -14) alpha = (ringGroup.position.y - -16) / 2.0;
        else if (ringGroup.position.y > -9.0) alpha = Math.max(0, 1.0 - ((ringGroup.position.y - -9.0) / 1.2));
        
        ringGroup.children.forEach((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
            if (mat && mat.opacity !== undefined) {
              mat.opacity = Math.max(0, Math.min(1, alpha)) * ((mat as any)._baseOpacity || 0.4);
            }
          }
        });
      });
    }
  });

  return (
    <group ref={ringsRef}>
      {ringsData.map((data, i) => (
        <group key={i} position={[0, data.yOffset, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[3.2, 3.25, 64]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.6} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.7, 3.0, 64]} />
            <meshBasicMaterial color="#0088ff" transparent opacity={0.2} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
            <torusGeometry args={[2.5, 0.02, 64, 100]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} toneMapped={false} />
          </mesh>
          
          <Html position={[3.2, 0.2, 0]} center style={{ pointerEvents: "none" }}>
            <div style={{
              background: "rgba(0, 136, 255, 0.15)",
              border: "1px solid rgba(0, 229, 255, 0.5)",
              padding: "8px 20px",
              borderRadius: "30px",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              textShadow: "0 0 10px rgba(0, 229, 255, 0.8)",
              backdropFilter: "blur(6px)",
              whiteSpace: "nowrap",
              boxShadow: "0 0 20px rgba(0, 136, 255, 0.3)"
            }}>{data.labels[0]}</div>
          </Html>
          <Html position={[-3.2, 0.2, 0]} center style={{ pointerEvents: "none" }}>
             <div style={{
              background: "rgba(0, 136, 255, 0.15)",
              border: "1px solid rgba(0, 229, 255, 0.5)",
              padding: "8px 20px",
              borderRadius: "30px",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              textShadow: "0 0 10px rgba(0, 229, 255, 0.8)",
              backdropFilter: "blur(6px)",
              whiteSpace: "nowrap",
              boxShadow: "0 0 20px rgba(0, 136, 255, 0.3)"
            }}>{data.labels[1]}</div>
          </Html>
        </group>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Asgardian Energy Shield (Concave curve, beautiful glowing 3D geometry)
───────────────────────────────────────────────────────────────────────────── */
function AsgardianShield() {
  const shieldRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (shieldRef.current) {
      shieldRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group position={[0, -8.0, 0]} ref={shieldRef}>
      {/* Intense Core Concave Plate */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[6.0, 4.0, 1.0, 64]} />
        <meshStandardMaterial 
          color="#111" 
          emissive="#0044aa" 
          emissiveIntensity={1} 
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Golden Ring Base on top edge of dish */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[6.0, 0.15, 16, 100]} />
        <meshStandardMaterial color="#d4af37" emissive="#554400" roughness={0.2} metalness={0.9} />
      </mesh>
      
      {/* Inner Rotating Runes/Rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[5.0, 5.8, 64]} />
        <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.5} transparent opacity={0.6} side={THREE.DoubleSide} wireframe />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
        <ringGeometry args={[4.2, 4.5, 32]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      {/* The Core Energy Dome Receptor */}
      <mesh position={[0, -0.2, 0]}>
        <sphereGeometry args={[4.5, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color="#0088ff" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Center Impact Receptor */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[0, 0.0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
        <meshBasicMaterial color="#ffaa00" toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Exported Component
───────────────────────────────────────────────────────────────────────────── */
export function HeroGlobeScene({ isExploded, handleClick }: { isExploded: boolean, handleClick: () => void }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <SpaceOrbitals />
      
      <group position={[0, 0, 0]}>
        <group>
          <SciFiGlobe isExploded={isExploded} onClick={handleClick} />
          <AsgardianShield />
        </group>
      </group>
    </>
  );
}

export default function HeroGlobe() {
  const [isExploded, setIsExploded] = useState(false);

  const handleClick = () => {
    if (isExploded) return;
    setIsExploded(true);
    setTimeout(() => setIsExploded(false), 3500);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes zv-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes zv-spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>

      <Canvas
        camera={{ position: [0, -1.5, 13], fov: 48 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <HeroGlobeScene isExploded={isExploded} handleClick={handleClick} />
      </Canvas>
    </div>
  );
}