"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const NODE_COUNT = 8;
const CONNECT_DISTANCE = 1.4;

type NodeData = {
  base: THREE.Vector3;
  amp: THREE.Vector3;
  speed: THREE.Vector3;
};

function NodeField() {
  const nodes = useMemo<NodeData[]>(() => {
    return new Array(NODE_COUNT).fill(0).map(() => {
      const base = new THREE.Vector3(
        (Math.random() - 0.5) * 2.2,
        (Math.random() - 0.5) * 1.6,
        (Math.random() - 0.5) * 1.8
      );
      const amp = new THREE.Vector3(Math.random() * 0.25 + 0.15, Math.random() * 0.2 + 0.15, Math.random() * 0.25 + 0.15);
      const speed = new THREE.Vector3(Math.random() * 0.4 + 0.25, Math.random() * 0.4 + 0.25, Math.random() * 0.4 + 0.25);
      return { base, amp, speed };
    });
  }, []);

  const nodePositions = useRef(nodes.map((n) => n.base.clone()));
  const linePositions = useMemo(() => new Float32Array(NODE_COUNT * NODE_COUNT * 6), []);
  const lineGeom = useRef<THREE.BufferGeometry>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pts = nodePositions.current;

    nodes.forEach((node, i) => {
      pts[i].set(
        node.base.x + Math.sin(t * node.speed.x + i) * node.amp.x,
        node.base.y + Math.cos(t * node.speed.y + i) * node.amp.y,
        node.base.z + Math.sin(t * node.speed.z + i) * node.amp.z
      );
    });

    let ptr = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = pts[i].distanceTo(pts[j]);
        if (dist < CONNECT_DISTANCE) {
          linePositions[ptr++] = pts[i].x;
          linePositions[ptr++] = pts[i].y;
          linePositions[ptr++] = pts[i].z;
          linePositions[ptr++] = pts[j].x;
          linePositions[ptr++] = pts[j].y;
          linePositions[ptr++] = pts[j].z;
        }
      }
    }

    if (lineGeom.current) {
      lineGeom.current.setDrawRange(0, ptr / 3);
      lineGeom.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {nodePositions.current.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial wireframe color="#7c3aed" emissive="#22d3ee" emissiveIntensity={0.5} />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry ref={lineGeom}>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} usage={THREE.DynamicDrawUsage} />
        </bufferGeometry>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

function Dust() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial size={0.015} color="#7c3aed" transparent depthWrite={false} opacity={0.5} />
    </Points>
  );
}

function FloatingCard() {
  return (
    <Float speed={0.8} floatIntensity={0.4} rotationIntensity={0.2}>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.6, 1, 0.06]} />
        <meshStandardMaterial color="#0b1220" emissive="#7c3aed" emissiveIntensity={0.25} metalness={0.35} roughness={0.7} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.6, 1, 0.06)]} />
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.5} />
      </lineSegments>
    </Float>
  );
}

export function AboutCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }} dpr={[1, 1.6]} className="h-full w-full">
      <color attach="background" args={["#05060a"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 5, 3]} intensity={0.8} color="#7c3aed" />
      <directionalLight position={[-3, -4, -2]} intensity={0.6} color="#22d3ee" />
      <Dust />
      <NodeField />
      <FloatingCard />
    </Canvas>
  );
}
