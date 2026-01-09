import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/sqlite";
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

    const data = parsed.data;
    const id = saveContactMessage(data);

    console.info("Contact request stored", { id, data });

    return NextResponse.json({ success: true, message: "Message stored", id });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}
