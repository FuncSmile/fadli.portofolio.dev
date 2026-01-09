"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Galaxy() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 2.5 + 0.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 0.6;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial size={0.03} color="#22d3ee" transparent depthWrite={false} />
      </Points>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh rotation={[-0.1, 0.3, 0]}>
          <torusGeometry args={[1.6, 0.08, 32, 128]} />
          <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.3} roughness={0.3} />
        </mesh>
        <mesh rotation={[0.2, -0.5, 0.2]}>
          <torusGeometry args={[1, 0.05, 32, 128]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.25} roughness={0.3} />
        </mesh>
      </Float>
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh>
          <icosahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial color="#f8fafc" emissive="#22d3ee" emissiveIntensity={0.6} roughness={0.15} />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 55 }} className="h-full w-full">
      <color attach="background" args={["#05060a"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 3]} intensity={1.1} />
      <directionalLight position={[-5, -3, -2]} intensity={0.4} color="#22d3ee" />
      <Galaxy />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
