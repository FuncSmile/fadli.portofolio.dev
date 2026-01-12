"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const PALETTE = ["#7ad0e6", "#5b5ce2", "#bfa76a"];
const SEGMENTS = 80;

type FlowLine = {
  geometry: THREE.BufferGeometry;
  base: Float32Array;
  positions: Float32Array;
  color: string;
  amplitude: number;
  speed: number;
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);
  return progress;
}

function makeCurve(depth: number) {
  const ctrlPoints = new Array(5).fill(0).map((_, idx) => {
    const t = idx / 4;
    return new THREE.Vector3(
      Math.sin(t * Math.PI * 2) * 1.2 + (Math.random() - 0.5) * 0.6,
      (Math.random() - 0.5) * 1.2,
      -depth / 2 + t * depth + (Math.random() - 0.5) * 0.8
    );
  });
  return new THREE.CatmullRomCurve3(ctrlPoints, false, "catmullrom", 0.25);
}

function FlowLines({ scroll, isMobile }: { scroll: number; isMobile: boolean }) {
  const lineCount = isMobile ? 6 : 10;
  const depth = isMobile ? 8 : 12;
  const lines = useMemo<FlowLine[]>(() => {
    return new Array(lineCount).fill(0).map((_, idx) => {
      const curve = makeCurve(depth);
      const pts = curve.getPoints(SEGMENTS);
      const base = new Float32Array((SEGMENTS + 1) * 3);
      pts.forEach((p, i) => {
        base[i * 3] = p.x;
        base[i * 3 + 1] = p.y;
        base[i * 3 + 2] = p.z;
      });
      const positions = base.slice();
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      return {
        geometry,
        base,
        positions,
        color: PALETTE[idx % PALETTE.length],
        amplitude: 0.28 + Math.random() * 0.12,
        speed: 0.25 + Math.random() * 0.18
      };
    });
  }, [depth, lineCount]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    lines.forEach((line, idx) => {
      for (let i = 0; i < line.positions.length; i += 3) {
        const baseX = line.base[i];
        const baseY = line.base[i + 1];
        const baseZ = line.base[i + 2];
        const phase = t * line.speed + i * 0.01 + idx;
        const flow = Math.sin(phase) * line.amplitude * (1 - scroll * 0.5);
        line.positions[i] = baseX + Math.sin(phase * 0.5) * 0.3;
        line.positions[i + 1] = baseY + flow;
        line.positions[i + 2] = baseZ;
      }
      const attr = line.geometry.getAttribute("position") as THREE.BufferAttribute;
      attr.array = line.positions;
      attr.needsUpdate = true;
    });
  });

  return (
    <group>
      {lines.map((line, idx) => (
        <lineSegments key={idx}>
          <primitive object={line.geometry} attach="geometry" />
          <lineBasicMaterial color={line.color} transparent opacity={0.5} linewidth={1} />
        </lineSegments>
      ))}
    </group>
  );
}

function Dust() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 160;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial size={0.015} color="#5b5ce2" transparent depthWrite={false} opacity={0.35} />
    </Points>
  );
}

function Stars({ scroll }: { scroll: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const baseCount = 420;

  const base = useMemo(() => {
    const pos = new Float32Array(baseCount * 3);
    for (let i = 0; i < baseCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, []);

  const working = useMemo(() => base.slice(), [base]);

  useFrame(({ pointer }) => {
    const offsetZ = THREE.MathUtils.lerp(0, -2.5, scroll);
    const offsetX = pointer.x * 0.4;
    const offsetY = pointer.y * 0.3;

    for (let i = 0; i < working.length; i += 3) {
      working[i] = base[i] + offsetX;
      working[i + 1] = base[i + 1] + offsetY;
      working[i + 2] = base[i + 2] + offsetZ;
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
      attr.array = working;
      attr.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={working} stride={3}>
      <PointMaterial size={0.012} color="#ffffff" transparent depthWrite={false} opacity={0.65} />
    </Points>
  );
}

function Core({ scroll }: { scroll: number }) {
  const coreRef = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!coreRef.current) return;
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 0.6) * 0.04 + scroll * 0.05;
    coreRef.current.scale.setScalar(pulse);
    coreRef.current.rotation.y += 0.004 + pointer.x * 0.002;
    coreRef.current.rotation.x = THREE.MathUtils.lerp(coreRef.current.rotation.x, pointer.y * 0.15, 0.05);
  });

  return (
    <group ref={coreRef}>
      <mesh>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#0f1626" transparent opacity={0.8} emissive="#7ad0e6" emissiveIntensity={0.6} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.78, 0]} />
        <meshStandardMaterial wireframe color="#5b5ce2" transparent opacity={0.5} emissiveIntensity={0.3} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.95, 24, 24]} />
        <meshStandardMaterial color="#0f1626" transparent opacity={0.12} emissive="#bfa76a" emissiveIntensity={0.12} />
      </mesh>
    </group>
  );
}

function CameraRig({ scroll }: { scroll: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ camera, pointer }) => {
    const depth = THREE.MathUtils.lerp(4.5, 6.2, scroll);
    camera.position.z = depth;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.1, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.9, 0.06);
    camera.lookAt(0, 0, 0);
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.12, 0.05);
    }
  });
  return <group ref={group} />;
}

export function NetworkBackground() {
  const scroll = useScrollProgress();
  const isMobile = useIsMobile();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 52 }} dpr={[1, 1.4]}>
        <color attach="background" args={["#05070d"]} />
        <ambientLight intensity={0.38} />
        <directionalLight position={[5, 6, 3]} intensity={0.65} color="#7ad0e6" />
        <directionalLight position={[-4, -3, -2]} intensity={0.55} color="#5b5ce2" />
        <directionalLight position={[0, 2, -3]} intensity={0.32} color="#bfa76a" />
        <CameraRig scroll={scroll} />
        <Core scroll={scroll} />
        <Stars scroll={scroll} />
        <Dust />
        <FlowLines scroll={scroll} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
