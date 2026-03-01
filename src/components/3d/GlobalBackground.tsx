"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import InteractiveSphere from "./InteractiveSphere";

export default function GlobalBackground() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <Environment preset="city" />
                <ambientLight intensity={0.5} />
                <InteractiveSphere />
            </Canvas>
        </div>
    );
}
