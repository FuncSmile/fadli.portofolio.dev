import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const { password } = await request.json();

    if (password === process.env.ADMIN_PASSWORD) {
        const cookieStore = await cookies();
        // Simpan session selama 1 hari
        cookieStore.set("admin_session", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        return NextResponse.json({ message: "Success" }, { status: 200 });
    }

    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}