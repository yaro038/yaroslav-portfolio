"use client";

import { Center, Environment, Float, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { CanvasFrame } from "./CanvasFrame";

/** Skills — luminous monogram with orbital ring + glow */
function LuminousMonogram() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.4) * 0.4;
      group.current.position.y = Math.sin(t * 0.8) * 0.12;
    }
    if (ring.current) {
      ring.current.rotation.x = t * 0.5;
      ring.current.rotation.z = t * 0.25;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <spotLight position={[3, 5, 4]} intensity={2.4} angle={0.4} penumbra={0.8} color="#f2f6ff" />
      <pointLight position={[-2, 1, 2]} intensity={1.6} color="#00e8f0" />
      <pointLight position={[2, -1, -1]} intensity={0.9} color="#6a7bff" />
      <Environment preset="studio" environmentIntensity={0.55} />

      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.4}>
        <group ref={group}>
          <Center>
            <Text3D
              font="/fonts/helvetiker_bold.typeface.json"
              size={1.2}
              height={0.42}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.05}
              bevelSize={0.03}
              bevelSegments={4}
            >
              YD
              <meshPhysicalMaterial
                color="#f2f6ff"
                metalness={0.85}
                roughness={0.12}
                clearcoat={1}
                clearcoatRoughness={0.1}
                reflectivity={1}
                envMapIntensity={1.2}
              />
            </Text3D>
          </Center>

          <mesh ref={ring} scale={1.7}>
            <torusGeometry args={[1.15, 0.015, 20, 120]} />
            <meshPhysicalMaterial
              color="#00e8f0"
              emissive="#00e8f0"
              emissiveIntensity={0.7}
              metalness={0.5}
              roughness={0.2}
            />
          </mesh>

          <mesh position={[1.5, 0.7, 0.4]} scale={0.12}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial
              color="#6a7bff"
              emissive="#6a7bff"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      </Float>
    </>
  );
}

export function SkillsCrystalScene() {
  return (
    <CanvasFrame camera={{ position: [0, 0.15, 5], fov: 38 }}>
      <LuminousMonogram />
    </CanvasFrame>
  );
}
