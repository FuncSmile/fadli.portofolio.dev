"use client";

import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function InteractiveSphere() {
    const sphereRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (sphereRef.current) {
            // Slower rotation for background effect
            sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
            sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;

            // Gentle, slow floating animation
            sphereRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
        }
    });

    return (
        <Sphere
            ref={sphereRef}
            args={[1, 128, 128]}
            scale={2.5} // Make background sphere larger
        >
            <MeshDistortMaterial
                color="#8b5cf6"
                attach="material"
                distort={0.2}
                speed={0.5} // Slower speed
                roughness={0.2}
                metalness={0.8}
                clearcoat={1}
                clearcoatRoughness={0.1}
            />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#00f0ff" />
        </Sphere>
    );
}
