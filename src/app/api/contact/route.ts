import { NextResponse } from "next/server";
import { turso } from "@/lib/turso";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please provide a valid email"),
  message: z.string().min(3, "Message is too short")
});



export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.errors[0]?.message ?? "Invalid request" },
        { status: 422 }
      );
    }

    const { name, email, message } = parsed.data;

    const result = await turso.execute({
      sql: "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
      args: [name, email, message],
    });

    console.info("Contact message stored", { id: Number(result.lastInsertRowid), name, email });

    return NextResponse.json({
      success: true,
      message: "Message stored",
      id: Number(result.lastInsertRowid),
    });
  } catch (error) {
    console.error("Contact API error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}
