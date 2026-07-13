"use client";

import { Environment, Float, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { CanvasFrame } from "./CanvasFrame";

const COUNT = 900;

/** Contact — spiral galaxy bloom */
function SpiralGalaxy() {
  const points = useRef<THREE.Points>(null);
  const core = useRef<THREE.Mesh>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const cMint = new THREE.Color("#00e8f0");
    const cBlue = new THREE.Color("#6a7bff");
    const cWhite = new THREE.Color("#f2f6ff");

    for (let i = 0; i < COUNT; i++) {
      const arm = i % 3;
      const t = i / COUNT;
      const angle = t * Math.PI * 8 + (arm * Math.PI * 2) / 3;
      const radius = t * 2.3;
      const spread = (Math.random() - 0.5) * 0.22 * (1 - t * 0.5);

      positions[i * 3] = Math.cos(angle) * radius + spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.35 * (1 - t);
      positions[i * 3 + 2] = Math.sin(angle) * radius + spread;

      const c = t < 0.25 ? cWhite : t < 0.6 ? cMint : cBlue;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = t * 0.18;
      points.current.rotation.z = Math.sin(t * 0.2) * 0.08;
    }
    if (core.current) {
      const s = 1 + Math.sin(t * 2) * 0.12;
      core.current.scale.setScalar(s * 0.22);
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 2]} intensity={1.5} color="#00e8f0" />
      <Environment preset="night" environmentIntensity={0.3} />

      <Sparkles
        count={50}
        scale={5}
        size={2}
        speed={0.4}
        opacity={0.55}
        color="#6a7bff"
      />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
        <points ref={points}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            vertexColors
            transparent
            opacity={0.95}
            depthWrite={false}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
          />
        </points>

        <mesh ref={core}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshPhysicalMaterial
            color="#00e8f0"
            emissive="#00e8f0"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.2}
            toneMapped={false}
          />
        </mesh>
      </Float>
    </>
  );
}

export function ContactMorphScene() {
  return (
    <CanvasFrame camera={{ position: [0, 1.2, 4.2], fov: 42 }}>
      <SpiralGalaxy />
    </CanvasFrame>
  );
}
