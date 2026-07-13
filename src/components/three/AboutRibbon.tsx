"use client";

import { Environment, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { CanvasFrame } from "./CanvasFrame";

type Node = {
  base: THREE.Vector3;
  phase: number;
  size: number;
  accent: boolean;
};

/** About — living neural constellation */
function NeuralField() {
  const group = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const edgeRefs = useRef<(THREE.Mesh | null)[]>([]);

  const nodes = useMemo<Node[]>(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      const r = 0.75 + (i % 4) * 0.25;
      return {
        base: new THREE.Vector3(
          Math.cos(a) * r,
          Math.sin(a * 2) * 0.5,
          Math.sin(a) * r * 0.8,
        ),
        phase: i * 0.7,
        size: 0.08 + (i % 3) * 0.025,
        accent: i % 4 === 0,
      };
    });
  }, []);

  const edges = useMemo(() => {
    const list: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      list.push([i, (i + 1) % nodes.length]);
      if (i % 3 === 0) list.push([i, (i + 4) % nodes.length]);
    }
    return list;
  }, [nodes]);

  const positions = useMemo(
    () => nodes.map((n) => n.base.clone()),
    [nodes],
  );

  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const mid = useMemo(() => new THREE.Vector3(), []);
  const quat = useMemo(() => new THREE.Quaternion(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) group.current.rotation.y = t * 0.15;

    nodes.forEach((n, i) => {
      positions[i].set(
        n.base.x + Math.sin(t * 0.8 + n.phase) * 0.12,
        n.base.y + Math.cos(t * 0.9 + n.phase) * 0.14,
        n.base.z + Math.sin(t * 0.7 + n.phase) * 0.1,
      );
      const mesh = nodeRefs.current[i];
      if (mesh) mesh.position.copy(positions[i]);
    });

    edges.forEach(([a, b], i) => {
      const edge = edgeRefs.current[i];
      if (!edge) return;
      const pa = positions[a];
      const pb = positions[b];
      mid.addVectors(pa, pb).multiplyScalar(0.5);
      dir.subVectors(pb, pa);
      const len = dir.length();
      edge.position.copy(mid);
      edge.scale.set(1, len, 1);
      quat.setFromUnitVectors(up, dir.clone().normalize());
      edge.quaternion.copy(quat);
    });
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 2, 3]} intensity={1.4} color="#00e8f0" />
      <pointLight position={[-2, 1, -2]} intensity={1} color="#6a7bff" />
      <Environment preset="night" environmentIntensity={0.35} />

      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.3}>
        <group ref={group}>
          {edges.map((_, i) => (
            <mesh
              key={`e-${i}`}
              ref={(el) => {
                edgeRefs.current[i] = el;
              }}
            >
              <cylinderGeometry args={[0.008, 0.008, 1, 6]} />
              <meshBasicMaterial color="#6a7bff" transparent opacity={0.5} />
            </mesh>
          ))}
          {nodes.map((n, i) => (
            <mesh
              key={`n-${i}`}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              scale={n.size}
            >
              <sphereGeometry args={[1, 32, 32]} />
              <meshPhysicalMaterial
                color={n.accent ? "#00e8f0" : "#f2f6ff"}
                emissive={n.accent ? "#00e8f0" : "#6a7bff"}
                emissiveIntensity={n.accent ? 0.7 : 0.25}
                metalness={0.3}
                roughness={0.2}
                clearcoat={1}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </>
  );
}

export function AboutRibbonScene() {
  return (
    <CanvasFrame camera={{ position: [0, 0.2, 4.4], fov: 40 }}>
      <NeuralField />
    </CanvasFrame>
  );
}
