"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const STAR_COUNT = 8000;

const introVertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  
  attribute vec3 aTarget;
  attribute vec3 aScattered;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    // Smooth cubic easing (no bouncing or backlash)
    float t = clamp(uProgress, 0.0, 1.0);
    float ease = t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;

    // Mix from scattered space to target globe
    vec3 pos = mix(aScattered, aTarget, ease);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Attenuate point size
    gl_PointSize = (120.0 / -mvPosition.z);
    
    // Fade out slightly when scattered, full opacity when formed
    vAlpha = mix(0.3, 0.9, ease);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const introFragmentShader = /* glsl */ `
  uniform float uGlobalAlpha;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Circular point
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    
    float alpha = (0.5 - d) * 2.0;
    gl_FragColor = vec4(vColor, alpha * vAlpha * uGlobalAlpha);
  }
`;



function SpacePreloaderSequence({ onComplete }: { onComplete: () => void }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const [startTime] = useState(Date.now());

  const { targetPositions, scatteredPositions, colors } = useMemo(() => {
    const target = [];
    const scattered = [];
    const col = [];
    const colorObj = new THREE.Color();
    const palettes = ["#00e5ff", "#0088ff", "#c8102e", "#d4af37"]; // Mix of blue and wine

    const w = 0.9; // Narrower, sharper Z width
    const h = 1.4; // Z height
    const innerThickness = 0.05; // Extremely tight electrical core
    const outerThickness = 0.35; // Diffuse outer energy field

    for (let j = 0; j < STAR_COUNT; j++) {
      let x = 0, y = 0, z = 0;
      const segment = Math.random();
      
      // Form the Z shape (perfectly symmetrical)
      if (segment < 0.33) {
        // Top bar
        x = (Math.random() * 2 - 1) * w;
        y = h;
      } else if (segment < 0.66) {
        // Bottom bar
        x = (Math.random() * 2 - 1) * w;
        y = -h;
      } else {
        // Diagonal
        const t = Math.random();
        x = w - t * 2 * w;
        y = h - t * 2 * h;
      }

      // Dual-layered volume: 20% core, 80% outer field
      const isCore = Math.random() < 0.2;
      const spread = isCore ? innerThickness : outerThickness;

      x += (Math.random() - 0.5) * spread;
      y += (Math.random() - 0.5) * spread;
      z += (Math.random() - 0.5) * spread;

      target.push(x, y, z);

      // Scattered space positions (wide distribution)
      scattered.push(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      );

      if (isCore) {
        // Intense blinding core (pure white / super bright blue)
        colorObj.set(Math.random() > 0.5 ? "#ffffff" : "#00d2ff");
        colorObj.multiplyScalar(4.0);
      } else {
        // Outer energy field
        if (Math.random() > 0.8) {
          colorObj.set(palettes[Math.floor(Math.random() * 2) + 2]); // Wine/Gold
        } else {
          colorObj.set(palettes[Math.floor(Math.random() * 2)]); // Blues
        }
        colorObj.multiplyScalar(1.5); // Softer Glow
      }
      col.push(colorObj.r, colorObj.g, colorObj.b);
    }
    return {
      targetPositions: new Float32Array(target),
      scatteredPositions: new Float32Array(scattered),
      colors: new Float32Array(col),
    };
  }, []);

  useFrame((state) => {
    const elapsed = (Date.now() - startTime) / 1000;

    // Phase 1: Form Hologram (0s to 3s)
    let progress = Math.max(0, Math.min((elapsed - 0.5) / 3.0, 1.0));
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
      materialRef.current.uniforms.uProgress.value = progress;
    }

    // Phase 2: Zoom camera in (4s to 5.5s)
    if (elapsed > 4.0 && pointsRef.current) {
      const zoomProgress = Math.min((elapsed - 4.0) / 1.5, 1.0);
      // Smooth step zoom
      const zoomEase = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);
      
      // Optimize lag: Scale the mesh up instead of moving the camera
      const scale = 1.0 + zoomEase * 12.0;
      pointsRef.current.scale.set(scale, scale, scale);
      
      // Optimize lag: Fade out global alpha cleanly
      if (materialRef.current) {
        materialRef.current.uniforms.uGlobalAlpha.value = 1.0 - zoomEase;
      }
    } else if (pointsRef.current) {
      pointsRef.current.scale.set(1, 1, 1);
      if (materialRef.current) {
        materialRef.current.uniforms.uGlobalAlpha.value = 1.0;
      }
    }

    // Finish sequence at 6s
    if (elapsed > 6.0) {
      onComplete();
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[scatteredPositions, 3]} />
        <bufferAttribute attach="attributes-aTarget" args={[targetPositions, 3]} />
        <bufferAttribute attach="attributes-aScattered" args={[scatteredPositions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={introVertexShader}
        fragmentShader={introFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uGlobalAlpha: { value: 1.0 },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function LightningGlobeIntro({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(onComplete, 500);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#061423", // Deep space background
        transition: "opacity 0.5s ease",
      }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <SpacePreloaderSequence onComplete={handleComplete} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
