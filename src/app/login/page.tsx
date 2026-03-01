"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Kita kirim password ke API internal untuk dicek
        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push("/admin" as any);
            router.refresh();
        } else {
            alert("Password Salah!");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-900">
            <form onSubmit={handleLogin} className="p-8 bg-gray-800 rounded-lg shadow-xl">
                <h1 className="text-white text-xl mb-4">Admin Access</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 mb-4"
                    placeholder="Masukkan Password"
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
}