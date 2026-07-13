"use client";

import {
  ContactShadows,
  Environment,
  Float,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { CanvasFrame } from "./CanvasFrame";

/** Hero — glass torus-knot + fresnel satellites (premium product lighting) */
function GlassKnot() {
  const knot = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);

  const satellites = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        angle: (i / 5) * Math.PI * 2,
        radius: 1.85,
        speed: 0.35 + i * 0.05,
        size: 0.08 + (i % 2) * 0.04,
        color: i % 2 === 0 ? "#00e8f0" : "#6a7bff",
      })),
    [],
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (knot.current) {
      knot.current.rotation.x = t * 0.22;
      knot.current.rotation.y = t * 0.28;
    }
    if (group.current) {
      group.current.rotation.y = t * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <spotLight
        position={[5, 6, 4]}
        angle={0.4}
        penumbra={0.9}
        intensity={2.5}
        color="#e8f0ff"
      />
      <pointLight position={[-4, 2, 2]} intensity={1.8} color="#00e8f0" />
      <pointLight position={[2, -2, -3]} intensity={1} color="#6a7bff" />
      <Environment preset="city" environmentIntensity={0.85} />

      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.45}>
        <mesh ref={knot} scale={0.85}>
          <torusKnotGeometry args={[1, 0.32, 220, 36]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={384}
            thickness={1.1}
            roughness={0.05}
            chromaticAberration={0.06}
            anisotropy={0.25}
            distortion={0.2}
            distortionScale={0.35}
            temporalDistortion={0.12}
            ior={1.45}
            color="#c8f8ff"
          />
        </mesh>

        <group ref={group}>
          {satellites.map((s, i) => (
            <Satellite key={i} {...s} />
          ))}
        </group>
      </Float>

      <ContactShadows
        position={[0, -1.7, 0]}
        opacity={0.45}
        scale={12}
        blur={2.5}
        far={4}
        color="#020308"
      />
    </>
  );
}

function Satellite({
  angle,
  radius,
  speed,
  size,
  color,
}: {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + angle;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 1.4) * 0.45;
    }
  });

  return (
    <mesh ref={ref} scale={size}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.55}
        metalness={0.4}
        roughness={0.15}
        clearcoat={1}
      />
    </mesh>
  );
}

export function HeroOrbScene() {
  return (
    <CanvasFrame
      className="h-full w-full"
      camera={{ position: [0, 0.2, 4.6], fov: 38 }}
    >
      <GlassKnot />
    </CanvasFrame>
  );
}
