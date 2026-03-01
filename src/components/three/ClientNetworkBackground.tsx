"use client";

import dynamic from "next/dynamic";

const NetworkBackground = dynamic(
    () => import("@/components/three/NetworkBackground").then((mod) => mod.NetworkBackground),
    { ssr: false }
);

export function ClientNetworkBackground() {
    return <NetworkBackground />;
}
