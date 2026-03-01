"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedMesh({ color }: { color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <Icosahedron args={[1, 0]} ref={meshRef} scale={1.5}>
            <MeshDistortMaterial
                color={color}
                envMapIntensity={0.4}
                clearcoat={0.8}
                clearcoatRoughness={0}
                metalness={0.1}
                roughness={0.4}
                distort={0.4}
                speed={2}
            />
        </Icosahedron>
    );
}

export default function ProjectCard3DBackground({ techStack }: { techStack: string }) {
    // Determine a color based on the tech stack for visual variance
    const getColor = (stack: string) => {
        const s = stack.toLowerCase();
        if (s.includes("react") || s.includes("next")) return "#00d8ff";
        if (s.includes("node") || s.includes("express")) return "#8cc84b";
        if (s.includes("python") || s.includes("django")) return "#ffde57";
        if (s.includes("laravel") || s.includes("php")) return "#ff2d20";
        if (s.includes("vue") || s.includes("nuxt")) return "#41b883";
        return "#8b5cf6"; // Default purple
    };

    const targetColor = getColor(techStack);

    return (
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen overflow-hidden rounded-xl pointer-events-none">
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[-10, -10, -10]} color={targetColor} intensity={2} />
                <AnimatedMesh color={targetColor} />
            </Canvas>
        </div>
    );
}
