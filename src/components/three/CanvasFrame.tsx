"use client";

import { Canvas } from "@react-three/fiber";
import { ReactNode, Suspense, useEffect, useRef, useState } from "react";

type CanvasFrameProps = {
  children: ReactNode;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
};

export function CanvasFrame({
  children,
  className = "",
  camera = { position: [0, 0, 4.5], fov: 42 },
}: CanvasFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative h-full w-full ${className}`}>
      {visible ? (
        <Canvas
          dpr={[1, 1.75]}
          camera={camera}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ width: "100%", height: "100%", display: "block" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          frameloop="always"
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : (
        <div className="absolute inset-0 bg-transparent" />
      )}
    </div>
  );
}
