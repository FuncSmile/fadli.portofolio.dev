"use server";

import { revalidatePath } from "next/cache";
import { turso } from "@/lib/turso";
import { projectSchema, certificateSchema, experienceSchema } from "@/lib/schema";

export async function createProject(formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    // Validasi input dengan Zod
    const parsed = projectSchema.safeParse(data);

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
    }

    const { title, description, image_url, deploy_url, tech_stack } = parsed.data;

    try {
        await turso.execute({
            sql: `INSERT INTO projects (title, description, image_url, deploy_url, tech_stack) VALUES (?, ?, ?, ?, ?)`,
            args: [title, description, image_url, deploy_url || null, tech_stack],
        });

        // Update data di landing page otomatis
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Error creating project:", error);
        return { error: "Failed to create project" };
    }
}

export async function getProjects() {
    try {
        const result = await turso.execute("SELECT * FROM projects");
        // Convert rows to plain objects to prevent Next.js serialization errors when passing to Client Components
        return result.rows.map(row => ({ ...row }));
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

export async function deleteProject(id: number) {
    try {
        await turso.execute({
            sql: "DELETE FROM projects WHERE id = ?",
            args: [id],
        });

        // Update data di landing page otomatis
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Error deleting project:", error);
        return { error: "Failed to delete project" };
    }
}

export async function createCertificate(formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    // Validasi input dengan Zod
    const parsed = certificateSchema.safeParse(data);

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
    }

    const { name, issuer, image_url, date } = parsed.data;

    try {
        await turso.execute({
            sql: `INSERT INTO certificates (name, issuer, image_url, date) VALUES (?, ?, ?, ?)`,
            args: [name, issuer, image_url, date],
        });

        // Update data di landing page otomatis
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Error creating certificate:", error);
        return { error: "Failed to create certificate" };
    }
}

export async function getCertificates() {
    try {
        const result = await turso.execute("SELECT * FROM certificates");
        // Convert rows to plain objects to prevent Next.js serialization errors when passing to Client Components
        return result.rows.map(row => ({ ...row }));
    } catch (error) {
        console.error("Error fetching certificates:", error);
        return [];
    }
}

export async function deleteCertificate(id: number) {
    try {
        await turso.execute({
            sql: "DELETE FROM certificates WHERE id = ?",
            args: [id],
        });

        // Update data di landing page otomatis
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Error deleting certificate:", error);
        return { error: "Failed to delete certificate" };
    }
}

// ==================== EXPERIENCE ACTIONS ====================

export async function createExperience(formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    const parsed = experienceSchema.safeParse(data);

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
    }

    const { company, role, location, type, start_date, end_date, description, skills } = parsed.data;

    try {
        await turso.execute({
            sql: `INSERT INTO experiences (company, role, location, type, start_date, end_date, description, skills) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [company, role, location || "", type, start_date, end_date || null, description || "[]", skills || ""],
        });

        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Error creating experience:", error);
        return { error: "Failed to create experience" };
    }
}

export async function getExperiences() {
    try {
        const result = await turso.execute("SELECT * FROM experiences ORDER BY start_date DESC");
        return result.rows.map(row => ({ ...row }));
    } catch (error) {
        console.error("Error fetching experiences:", error);
        return [];
    }
}

export async function deleteExperience(id: number) {
    try {
        await turso.execute({
            sql: "DELETE FROM experiences WHERE id = ?",
            args: [id],
        });

        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Error deleting experience:", error);
        return { error: "Failed to delete experience" };
    }
}
