"use client";

import dynamic from "next/dynamic";

// Load the 3D Background dynamically to prevent hydration mismatch on server render
const GlobalBackground = dynamic(() => import("./GlobalBackground"), {
    ssr: false,
});

export function ClientBackground() {
    return <GlobalBackground />;
}
