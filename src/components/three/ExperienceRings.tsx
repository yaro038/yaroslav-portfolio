"use client";

import { Environment, Float, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { CanvasFrame } from "./CanvasFrame";

/** Experience — floating soft architecture (Apple-like blocks) */
function SoftArchitecture() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.25) * 0.35;
      group.current.rotation.x = 0.25 + Math.sin(t * 0.2) * 0.08;
    }
  });

  const blocks = [
    { pos: [0, 0, 0] as const, size: [1.4, 0.35, 1.4] as const, color: "#12182a", delay: 0 },
    { pos: [0.35, 0.55, 0.2] as const, size: [0.9, 0.3, 0.9] as const, color: "#00e8f0", delay: 0.4 },
    { pos: [-0.45, 0.95, -0.15] as const, size: [0.7, 0.28, 0.7] as const, color: "#6a7bff", delay: 0.8 },
    { pos: [0.1, 1.35, 0.1] as const, size: [0.45, 0.45, 0.45] as const, color: "#f2f6ff", delay: 1.2 },
  ];

  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight position={[4, 7, 3]} intensity={2.2} angle={0.45} penumbra={0.85} />
      <pointLight position={[-3, 2, 2]} intensity={1.2} color="#00e8f0" />
      <Environment preset="warehouse" environmentIntensity={0.4} />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
        <group ref={group}>
          {blocks.map((b, i) => (
            <FloatingBlock key={i} {...b} />
          ))}
        </group>
      </Float>
    </>
  );
}

function FloatingBlock({
  pos,
  size,
  color,
  delay,
}: {
  pos: readonly [number, number, number];
  size: readonly [number, number, number];
  color: string;
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    if (ref.current) {
      ref.current.position.y = pos[1] + Math.sin(t * 1.1) * 0.1;
      ref.current.rotation.y = Math.sin(t * 0.4) * 0.08;
    }
  });

  return (
    <RoundedBox
      ref={ref}
      args={[...size]}
      radius={0.08}
      smoothness={4}
      position={[pos[0], pos[1], pos[2]]}
    >
      <meshPhysicalMaterial
        color={color}
        metalness={color === "#f2f6ff" ? 0.7 : 0.25}
        roughness={color === "#f2f6ff" ? 0.12 : 0.35}
        clearcoat={1}
        clearcoatRoughness={0.2}
        emissive={color === "#00e8f0" || color === "#6a7bff" ? color : "#000000"}
        emissiveIntensity={color === "#00e8f0" || color === "#6a7bff" ? 0.2 : 0}
      />
    </RoundedBox>
  );
}

export function ExperienceRingsScene() {
  return (
    <CanvasFrame camera={{ position: [2.2, 1.8, 3.8], fov: 40 }}>
      <SoftArchitecture />
    </CanvasFrame>
  );
}
